'use strict'

import { app, protocol, BrowserWindow, Tray, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import fs from 'fs'
import path from 'path'
import Qs from 'qs';
import { autoUpdater } from "electron-updater"
const isDevelopment = process.env.NODE_ENV !== 'production'

console.log(process.env.NODE_ENV);

const Store = require('electron-store');
const axios = require ('axios');
const store = new Store();

console.log(app.getPath('userData'));
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.get('token.access_token');

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])


let mainWindow;
let tray = null;
async function createWindow() {
  // Create the browser mainWindow.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame:false,
    resizable:true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule:true,
    },
    icon: path.join(__static, 'icon.png')
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
    autoUpdater.checkForUpdatesAndNotify()
  }
}

function clear_user(){
  console.log("clear_user()");
  store.set('token.user',null)
  store.set('token.token_type',null);
  store.set('token.access_token', null);
  delete axios.defaults.headers.common["Authorization"];
}

// Quit when all windows are closed.
app.on('mainWindow-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a mainWindow in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  tray=new Tray(path.join(__static, 'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', type: 'normal' ,click(){mainWindow.destroy();app.quit();}}
  ])
  tray.setToolTip('JinxIT Valkerri.')
  tray.setContextMenu(contextMenu)

  tray.on('click',(event, bounds)=>{

    //click event 
    const { x, y }=bounds;
    //window size
    const { height, width}=mainWindow.getBounds();
    
    if(mainWindow.isVisible()){
      mainWindow.hide();
    }
    else{
      const xPosition = process.platform === 'darwin' ? x - width / 2 : parseInt(x - (width/2));
      const yPosition = process.platform === 'darwin' ? y : parseInt(y - height);
      
      mainWindow.setBounds({
        x: xPosition,
        y: yPosition,
        height,
        width
      });
      mainWindow.show();
    }
    
  })
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.handle('getStoreValue', (event, key) => {
  console.log('getStoreValue:',key)
	return store.get(key);
});

ipcMain.handle('min', (event) => {
  console.log('min')
	mainWindow.minimize()
});

ipcMain.handle('max', (event) => {
  console.log('max')
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();

});

ipcMain.handle('close', (event) => {
  console.log('close')
  //mainWindow.destroy();
  mainWindow.hide();
});

ipcMain.handle('login', (event,username,password) => {
  //console.log("username:"+username)
  //console.log("password:"+password)
  delete axios.defaults.headers.common["Authorization"];
  var postData = {
    email: username,
    password: password
  }
 
  

  let login_post=axios.post('auth/login', postData)
  .then(function (response) {
    store.set('token.token_type',response.data.token_type);
    store.set('token.access_token', response.data.access_token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
    console.log(response.data);
    return response.data;
  })
  .catch(function (error) {
    console.log("get profile error");
    console.log(error);
    console.log(error.response.data.message);
    if(error.response.data.message==='Unauthorized'){
      console.log('Unauthorized')
      clear_user()
    }
    return error.response.data;
  })
  
  return login_post;
});


ipcMain.handle('get-profile', (event) => {

  console.log(store.get('token.access_token'));

  console.log("get profile");
  const users_get=axios.get('v1/auth/user')
  .then(function (response) {  

    console.log("get profile success");
    store.set('token.user',response.data)
    return response.data;
  })
  .catch(function (error) {

    console.log("get profile error");
    console.log(error.response.data.message);
    if(error.response.data.message==='Unauthenticated.'){
      console.log('Unauthenticated')
      clear_user()
    }
    return error.response.data;
  });

  return users_get;
});

ipcMain.handle('get-tickets', (event,args) => {
  console.log("get tickets");
 // console.log("get tickets args:",args);

  let length=10;
  let start=(args.page -1);
  let dir="asc";
  
  if(args.sortDesc[0]){
     dir="desc";
  }
  if(!args.sortDesc[0]){
    dir="asc";
  }
  
  let params={      
    columns: [
      { data: "id" },
      { data: "customers_name", 
        name:"customers.name",
        search:{
          value:"",
          regex:"false"
        } 
      },
      { data: "requestor" },
      { data: "subject" },
      { data: "type" },
      { data: "way" },
      { data: "description" },
      { data: "impact" },
      { data: "urgency" },
      { data: "priority" },
      { data: "category" },
      { data: "group" },
      { data: "agent" },
      { data: "status" },
      { data: "logs" },
      { data: "uploads" },
      { data: "created_at" },
      { data: "updated_at" }
    ],
    order:[{
      column:"0",
      dir: dir
    }],
    search:{
      value:""
    },
    start: start,      
    length: length
  };

  var results = "0";
  var searchField = "data";
  var searchVal = args.sortBy[0];

  for (var i=0 ; i < params.columns.length ; i++)
  {
      if (params.columns[i][searchField] == searchVal) {
          results=i;
      }
  }
  console.log(results);
  params.order[0].column=results;

  const tickets_get=axios.get('v1/Tickets/datatables',
  {
    
    params:params,
    paramsSerializer: function (params) {
      return Qs.stringify(params)
    },
})
  .then(function (response) {  

    console.log("get tickets success");
    //console.log(response.request.path);
    store.set('tickets',response.data)
    return response.data;
  })
  .catch(function (error) {
    console.log("get tickets error");
    //console.log(error);
    console.log(error.response.data.message);
    if(error.response.data.message==='Unauthenticated.'){
      console.log('Unauthenticated')
      clear_user()
    }
    return error.response.data;
  });

  return tickets_get;
});