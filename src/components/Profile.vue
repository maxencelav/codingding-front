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
            <b-avatar :src="profile.profilePic" size="15em">
            </b-avatar>
            <b-button pill id="show-btn" variant='primary' @click="isHidden = !isHidden" v-if="currentUser._id == profile._id" class="mx-0 my-1"><b-icon-pencil></b-icon-pencil> Modifier </b-button>
            <div class="my-3 d-flex justify-content-around">
              <b-badge pill>
                <b-icon-person-fill></b-icon-person-fill>
                {{ profile.classYear }}
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
              <b-icon-envelope-fill></b-icon-envelope-fill> <a :href="'mailto:' + profile.email">{{ profile.email }}</a> 
            </b-list-group-item>
            <b-list-group-item
              button
              v-for="account in profile.gitHubLinks"
              v-bind:key="account"
            >
              <b-icon-github></b-icon-github> <a :href="'https://github.com/' + account" target="_blank">{{ account }}</a>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col md="9">
           <b-form v-if="isHidden" @submit="saveEdit">
              <b-form-group
              label="Modifier la photo de profil :">
              <b-form-input
                v-model="editForm.profilePic"
                required
                placeholder=""
              ></b-form-input>
              </b-form-group>
              <b-form-group
              label="Année :">
             <b-form-select
                v-model="editForm.classYear"
                :options="classOptions"
              >
              </b-form-select>
              </b-form-group>
               <b-form-group
              label="Statut :">
              <b-form-select
                v-model="editForm.classStatus"
                :options="classStatusOptions"
              >
              </b-form-select>
              </b-form-group>
               <b-form-group
              label="Lieu :">
              <b-form-select
                v-model="editForm.classLocation"
                :options="classLocationOptions"
              >
              </b-form-select>
              </b-form-group>
              <b-form-group
              label="Compte GitHub :"
              description="Veuillez entrer vos noms de compte GitHub séparés par une virgule (sans espace)">
              <b-form-input
                v-model="editForm.gitHubLinks"
                required
                placeholder=""
              ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary" class="ml-3">Modifier</b-button>
           </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UsersDataService from '../services/UsersDataService';
import Vue from 'vue';

export default {
  name: "Profile",
  currentUser:"",
  data() {
    return {
      profile: {},
      currentUser:"",
      isHidden: false,
      editForm: {
        profilePic: "",
        classYear: "",
        classStatus: "",
        classLocation: "",
        gitHubLinks: ""
      },
      classOptions: [
        { text: 'L1', value: 'L1' },
        { text: 'L2', value: 'L2' },
        { text: 'L3', value: 'L3' },
        { text: 'M1', value: 'M1' },
        { text: 'M2', value: 'M2' }
      ],
      classStatusOptions: [
        { value: "Temps plein", text: "Temps plein" },
        { value: "Alternance", text: "Alternance" },
        { value: "Reconversion", text: "Reconversion" },
      ],
      classLocationOptions: [
        { value: "Cergy", text: "Cergy" },
        { value: "Paris", text: "Paris" }
      ]
    };
  },
  methods: {
    saveEdit: function () {
      const data = {
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        email: this.profile.email,
        profilePic: this.editForm.profilePic,
        classYear: this.editForm.classYear,
        classStatus: this.editForm.classStatus,
        classLocation: this.editForm.classLocation,
        gitHubLinks: this.editForm.gitHubLinks.split(","),
        googleId: this.profile.googleId 
      };
      UsersDataService.update(this.profile._id, data)
        .then((response) => {
          console.log("updated data: " + JSON.stringify(response.data));
          location.reload();
        })
        .catch((e) => {
          console.log(e);
          this.errMessage = "Erreur";
        });
    },
  },
  created() {
    this.currentUser = Vue.getCurrentUser();
  },
  mounted() {
    UsersDataService.get(this.$route.params.id)
      .then((response) => {
        this.profile = response.data;

        this.editForm.profilePic = this.profile.profilePic
        this.editForm.classYear = this.profile.classYear
        this.editForm.classStatus = this.profile.classStatus
        this.editForm.classLocation = this.profile.classLocation
        this.editForm.gitHubLinks= this.profile.gitHubLinks.join(",")
      }).catch(e => console.log(e));
  }
};
</script>

<style >
</style>
