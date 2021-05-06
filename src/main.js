import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueCookies from "vue-cookies";
import jwt_decode from "jwt-decode";

Vue.use(VueCookies);
const UserPlugin = {
  install(Vue) {
    Vue.getCurrentUser = function() {
      var cookies = this.$cookies.get("token");
      var decoded = jwt_decode(cookies);
      return decoded.user;
    };
  },
};
Vue.use(UserPlugin);
Vue.$cookies.config("7d");

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
