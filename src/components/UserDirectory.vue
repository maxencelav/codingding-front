<template>
  <div>
    <b-container>
      <h1 class="display-1">Annuaire</h1>
      <p class="lead">Retrouvez ici tous les étudiants de la Coding Factory.</p>
      <b-table striped hover :items="users" :fields="userFields">
        <template #cell(profilePic)="data">
          <b-avatar :src="data.value"></b-avatar>
        </template>
        <template #cell(_id)="data">
            <b-link to="/profil/{{data.value}}">Profil</b-link>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
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
      users: [
        {
          _id:"AYOAO",
          firstName: "Alan",
          lastName: "Lelia",
          profilePic: "https://picsum.photos/200?random=1",
          classYear: 3,
          classStatus: "TP",
          classLocation: "Cergy",
        },
        {
          _id:"WUXEO",
          firstName: "Mason",
          lastName: "Bess",
          profilePic: "https://picsum.photos/200?random=2",
          classYear: 1,
          classStatus: "TP",
          classLocation: "Cergy",
        },
        {
          _id:"EBBDS",
          firstName: "Vera",
          lastName: "Leona",
          profilePic: "https://picsum.photos/200?random=3",
          classYear: 2,
          classStatus: "TP",
          classLocation: "Paris",
        },
      ],
    };
  },
};
</script>


<style>
</style>
