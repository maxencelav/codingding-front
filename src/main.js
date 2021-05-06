import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.$cookies.config('7d')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

