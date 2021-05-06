import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/scss/custom.scss'

Vue.use(VueCookies)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use('vue-moment')
Vue.$cookies.config('7d')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

