import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Achievements from '@/components/Achievements.vue'
import Profile from '@/components/Profile.vue'
import UserDirectory from '@/components/UserDirectory.vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

export default new Router({
    routes: [
        { path: '/', name: 'Home', component: Home},
        { path: '/achievements', name: 'Achievements', component: Achievements },
        { path: '/users', name: 'UserDirectory', component: UserDirectory },
        { path: '/profile/:id', name: 'Profile', component: Profile },
        { path: '/profile/:id/edit', name: 'Profile', component: Profile }
    ]
})



Vue.use(Router)
