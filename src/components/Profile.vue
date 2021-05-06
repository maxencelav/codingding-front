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
            >
              <b-icon-github></b-icon-github> <a :href="'https://github.com/' + profile.gitHubLink" target="_blank">{{ profile.gitHubLink }}</a>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col md="9" class="text-center">
           <b-button id="show-btn" @click="isHidden = !isHidden"><b-icon-pencil></b-icon-pencil> Modifier </b-button>
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
              label="Compte GitHub :">
              <b-form-input
                v-model="editForm.githubLink"
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
export default {
  name: "Profile",
  data() {
    return {
      profile: {},
      isHidden: false,
      editForm: {
        profilePic: "",
        classYear: "",
        classStatus: "",
        classLocation: "",
        githubLink: ""
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
        gitHubLink: this.editForm.githubLink,
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
  mounted() {
    UsersDataService.get(this.$route.params.id)
      .then((response) => {
        this.profile = response.data;

        this.editForm.profilePic = this.profile.profilePic
        this.editForm.classYear = this.profile.classYear
        this.editForm.classStatus = this.profile.classStatus
        this.editForm.classLocation = this.profile.classLocation
        this.editForm.githubLink= this.profile.gitHubLink
      }).catch(e => console.log(e));
  }
};
</script>

<style >
</style>
