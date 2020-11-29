import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'


Vue.use(VueRouter)
Vue.config.productionTip = false
import home from './components/home';
import tickets from './components/tickets';
import computer from './components/computer';
import profile from './components/profile';
import login from './components/login';
import logout from './components/logout';

console.log(process.env.VUE_APP_MY_APP)

const routes = [
  { path: '/', name: 'home', component: home },
  { path: '/tickets', name: 'tickets', component: tickets },
  { path: '/computer', name: 'computer', component: computer },
  { path: '/profile', name: 'profile', component: profile },
  { path: '/login', name: 'login', component: login },
  { path: '/logout', name: 'logout', component: logout },
]
const router = new VueRouter({
  routes // short for `routes: routes`
})
new Vue({
  vuetify,router,
  render: h => h(App)
}).$mount('#app')
