import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Router from "vue-router";
import Home from "@/components/Home.vue";
import Achievements from "@/components/Achievements.vue";
import Profile from "@/components/Profile.vue";
import UserDirectory from "@/components/UserDirectory.vue";
import Scrumboard from "@/components/Scrumboard.vue";
import Scrumboards from "@/components/Scrumboards.vue";
import Story from "@/components/Story.vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

export default new Router({
  routes: [
    { path: "/", name: "Home", component: Home },
    {
      path: "/achievements",
      name: "Achievements",
      component: Achievements,
      beforeEnter: (to, from, next) => {
        var isLogged = Vue.$cookies.get("token");
        if (isLogged) {
          next();
        }
        else {
          this.$router.push("/")
        }
      },
    },
    {
      path: "/users",
      name: "UserDirectory",
      component: UserDirectory,
      beforeEnter: (to, from, next) => {
        var isLogged = Vue.$cookies.get("token");
        if (isLogged) {
          next();
        }
      },
    },
    {
      path: "/profile/:id",
      name: "Profile",
      component: Profile,
      beforeEnter: (to, from, next) => {
        var isLogged = Vue.$cookies.get("token");
        if (isLogged) {
          next();
        }
      },
    },
    {
      path: "/profile/:id/edit",
      name: "Profile",
      component: Profile,
      beforeEnter: (to, from, next) => {
        var isLogged = Vue.$cookies.get("token");
        if (isLogged) {
          next();
        }
      },
    },
    {
      path: "/scrumboards",
      name: "Scrumboards",
      component: Scrumboards,
      beforeEnter: (to, from, next) => {
        var isLogged = Vue.$cookies.get("token");
        if (isLogged) {
          next();
        }
      },
    },
    {
      path: "/scrumboard/:id",
      name: "Scrumboard",
      component: Scrumboard,
      beforeEnter: (to, from, next) => {
        var isLogged = Vue.$cookies.get("token");
        if (isLogged) {
          next();
        }
      },
    },
    {
      path: "/story/:id",
      name: "Story",
      component: Story,
      beforeEnter: (to, from, next) => {
        var isLogged = Vue.$cookies.get("token");
        if (isLogged) {
          next();
        }
      },
    },
  ],
});

Vue.use(Router);
