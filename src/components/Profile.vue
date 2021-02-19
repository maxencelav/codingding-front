#https://bootsnipp.com/snippets/4Mm5R

<template>
  <div>
    <b-container>
      <b-row>
        <b-col fluid="sm">
          <h1 class="display-3 text-left">
            {{ profile.firstName }} {{ profile.lastName }}
          </h1>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="3">
          <div class="text-center">
            <b-avatar :src="profile.profilePic" size="100%"></b-avatar>
            <div class="my-3 d-flex justify-content-around">
              <b-badge pill>
                <b-icon-person-fill></b-icon-person-fill>
                L{{ profile.classYear }}
              </b-badge>
              <b-badge pill>
                <b-icon-briefcase-fill></b-icon-briefcase-fill>
                {{ profile.classStatus }}
              </b-badge>
              <b-badge pill>
                <b-icon-geo-alt-fill></b-icon-geo-alt-fill>
                {{ profile.classLocation }}
              </b-badge>
            </div>
          </div>

          <b-list-group>
            <b-list-group-item button>
              <b-icon-envelope-fill></b-icon-envelope-fill> {{ profile.email }}
            </b-list-group-item>
            <b-list-group-item
              button
              v-for="link in profile.gitHubLinks"
              v-bind:key="link"
            >
              <b-icon-github></b-icon-github> {{ link }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col md="9"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UsersDataService from '../services/UsersDataService';
export default {
  name: "Profile",
  data() {
    return {
      profile: {}
    };
  },
   mounted() {
    UsersDataService.get(this.$route.params.id)
      .then((response) => {
        this.profile = response.data;
        console.log(response.data);
      }).catch(e => console.log(e));
  }
};
</script>

<style >
</style>
