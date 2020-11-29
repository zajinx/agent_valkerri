import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
console.log(process.env.VUE_APP_MY_APP)
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
