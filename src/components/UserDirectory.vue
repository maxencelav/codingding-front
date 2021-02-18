<template>
  <div>
    <b-container>
      <h1 class="display-1">Annuaire</h1>
      <p class="lead">Retrouvez ici tous les étudiants de la Coding Factory.</p>
      <b-table striped hover :items="users" :fields="userFields"></b-table>
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
          key: "firstName",
          label: "Prénom",
          sortable: false,
        },
        {
          key: "lastName",
          label: "Nom",
          sortable: false,
        },
      ],
      users: [
        {
          firstName: "FirstName",
          lastName: "LastName",
          email: "email@mail.com",
          profilePic: "https://picsum.photos/200",
          classYear: 1,
          classStatus: "TP",
          classLocation: "Cergy",
          gitHubLinks: ["maxencelav", "ninjamuffin99"],
        },
        {
          firstName: "FirstName",
          lastName: "LastName",
          email: "email@mail.com",
          profilePic: "https://picsum.photos/200",
          classYear: 1,
          classStatus: "TP",
          classLocation: "Cergy",
          gitHubLinks: ["maxencelav", "ninjamuffin99"],
        },
        {
          firstName: "FirstName",
          lastName: "LastName",
          email: "email@mail.com",
          profilePic: "https://picsum.photos/200",
          classYear: 1,
          classStatus: "TP",
          classLocation: "Cergy",
          gitHubLinks: ["maxencelav", "ninjamuffin99"],
        },
      ],
    };
  },
};
</script>


<style>
</style>
