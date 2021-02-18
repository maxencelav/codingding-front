<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">CodingDing</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/achievements">Achievements</b-nav-item>
          <b-nav-item to="/planning" disabled>Agenda</b-nav-item>
          <b-nav-item to="/scrum" disabled>Scrum</b-nav-item>
          <b-nav-item to="/users">Annuaire</b-nav-item>
          <b-nav-item to="/wishlist" disabled>Wishlist</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-button pill variant="primary">
              <b-icon-google></b-icon-google>
            </b-button>
          </b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar></b-avatar>
            </template>
            <b-dropdown-item href="#">Profil</b-dropdown-item>
            <b-dropdown-item href="#">Se déconnecter</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style >
</style>
