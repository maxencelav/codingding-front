<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">CodingDing</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/achievements"> <b-icon icon="award-fill"></b-icon> Achievements</b-nav-item>
          <b-nav-item to="/planning" disabled> <b-icon icon="clock-fill"></b-icon> Agenda</b-nav-item>
          <b-nav-item to="/scrumboards"> <b-icon icon="sticky-fill"></b-icon> Scrum</b-nav-item>
          <b-nav-item to="/users"> <b-icon icon="journal"></b-icon> Annuaire</b-nav-item>
          <b-nav-item to="/wishlist" disabled>  <b-icon icon="clipboard"></b-icon> Wishlist</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar :src="user.profilePic"></b-avatar>
            </template>
            <div v-if="!user">
            <b-dropdown-item
              href="http://localhost:4000/auth/google"
              target="_blank"
              >Se connecter</b-dropdown-item
            >
            </div>
            <div v-else>
            <b-dropdown-item
              :router-tag="profile"
              >Mon profil</b-dropdown-item
            >
            <b-dropdown-item
              href="http://localhost:4000/auth/logout"
              target="_blank"
              >Se déconnecter</b-dropdown-item
            >
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: "NavBar",
  data() {
    return {
      user: ""
    }
  },
  created() {
    this.user = Vue.getCurrentUser();
  }
};
</script>

<style >
</style>
