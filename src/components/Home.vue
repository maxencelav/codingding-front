<template>
  <div>
    <b-jumbotron
      header="CodingDing"
      lead="L'outil par la Coding pour la Coding"
    >
    </b-jumbotron>
    <h2>Welcome {{user.firstName}}</h2>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    getUserDetails() {
      // get token from localstorage
      let token = localStorage.getItem("user");
      try {
        //decode token here and attach to the user object
        let decoded = jwt_decode(token);
        this.user = decoded;
        console.log(this.user)

      } catch (error) {
        console.log(error, 'error from decoding token @ Home.vue')
      }
    },
    logUserOut() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  },
  created() {
    this.getUserDetails();
  }
};
</script>

<style >
</style>
