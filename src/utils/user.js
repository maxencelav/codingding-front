import jwt_decode from "jwt-decode";

export default 
 { 
  install(Vue) {
    Vue.getCurrentUser = function() {
      console.log("bite");
      var cookies = this.$cookies.get("token");
      var decoded = jwt_decode(cookies);

      return decoded;
  }
}};

