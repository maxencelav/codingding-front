<template>
  <div>
    <b-jumbotron
      header="CodingDing"
      lead="L'outil par la Coding pour la Coding"
    >
    </b-jumbotron>
    <div class="text-center ">
    <h2 v-if="user">Bienvenue {{user.firstName}} !</h2>
    <h2 v-else>Connectez-vous pour accéder aux fonctionnalités du site !</h2>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: "Home",
  created() {
    this.user = Vue.getCurrentUser();
  }
};
</script>

