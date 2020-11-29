<template>
  <v-app id="inspire">

    <v-system-bar app color="green accent-9" dark  style="-webkit-app-region: drag">
      <v-spacer></v-spacer>
      <v-btn icon v-on:click="min" style="-webkit-app-region: no-drag">
        <v-icon>mdi-window-minimize</v-icon>
      </v-btn>
      <v-btn icon v-on:click="max" style="-webkit-app-region: no-drag">
        <v-icon>mdi-window-maximize</v-icon>
      </v-btn>
      <v-btn icon v-on:click="close" style="-webkit-app-region: no-drag">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-system-bar>
    <v-app-bar app color="green accent-4" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Valkerri Agent</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
    <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Valkerri Agent
          </v-list-item-title>
          <v-list-item-subtitle>
            
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    <v-list dense nav>
      <v-list-item link  to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
     
      <v-list-item link to="/tickets" v-if="user">
        <v-list-item-icon>
          <v-icon>mdi-ticket</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Tickets</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link to="/computer" v-if="user">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Computer</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
      <v-list-item link to="/profile" v-if="user">
        <v-list-item-icon>
          <v-icon>mdi-account-details</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
    </v-list>

    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <router-view v-if="user"></router-view>
      <v-form v-else>
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-text-field
                v-model="username"
                
                :rules="[rules.required]"

                name="username-10-1"
                label="Username"
                hint="email address"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                name="password-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>

            
          </v-row>
        </v-container>
            <v-btn
            
            color="success"
            class="mr-4"
            @click="login"
          >
            Login
          </v-btn>
      </v-form>
      
    </v-main>
  </v-app>
</template>

<script>

  export default {
    name:"App",
    data: () => ({
      user: null,
      drawer: null,
      show1: false,
      username:"",
      password:"",
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }),
   methods: {
      min () {
          window.ipcRenderer.invoke('min')
      },
      max () {
          window.ipcRenderer.invoke('max')
      },
      close () {
          window.ipcRenderer.invoke('close')
      },
      login () {
        //console.log("username:"+this.username)
        //console.log("password:"+this.password)
        window.ipcRenderer.invoke('login', this.username,this.password)
        .then(() => {          
          window.ipcRenderer.invoke('get-profile').then((result) => {
            console.log(result)
            this.user = result
         }); 
       });  
        
      },
    },
    mounted() { 
          window.ipcRenderer.invoke('getStoreValue', 'token.user').then((result) => {
            //console.log(result)
            this.user = result
         });  
    }
  }


</script>