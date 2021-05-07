<template>
  <div>
    <b-container>
      <h1 class="display-1 font-weight-bold">Annuaire</h1>
      <p class="lead">Retrouvez ici tous les étudiants de la Coding Factory.</p>
      <b-table striped hover :items="usersAPI" :fields="userFields">
        <template #cell(profilePic)="data">
          <b-avatar :src="data.value"></b-avatar>
        </template>
        <template #cell(_id)="data">
            <b-link :to="/profile/+data.value">Profil</b-link>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import UsersDataService from '../services/UsersDataService';

export default {
  name: "UserDirectory",
  components: {},
  data() {
    return {
      userFields: [
        {
          key: "profilePic",
          label: "Photo de profil",
          sortable: false,
        },
        {
          key: "firstName",
          label: "Prénom",
          sortable: true,
        },
        {
          key: "lastName",
          label: "Nom",
          sortable: true,
        },
        {
          key: "classYear",
          label: "Année",
          sortable: true,
        },
        {
          key: "classStatus",
          label: "Statut",
          sortable: true,
        },
        {
          key: "classLocation",
          label: "Campus",
          sortable: true,
        },
        {
          key: "_id",
          label: "Profil",
          sortable: false,
        },
      ],
      usersAPI:[]
    };
  },
  mounted() {
    UsersDataService.getAll()
      .then((response) => {
        this.usersAPI = response.data;
        console.log(response.data);
      }).catch(e => console.log(e));
  }
};
</script>


<style>
</style>