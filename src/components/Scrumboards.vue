<template>
  <div>
    <b-container>
      <h1 class="display-1">Scrumboards</h1>
      <p class="lead">Retrouvez ici la liste de vos scrumboards.</p>
      <b-table striped hover :items="scrumAPI" :fields="scrumFields">
        <template #cell(_id)="data">
            <b-link :to="/scrumboards/+data.value">Accéder au scrum</b-link>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import ScrumboardDataService from '../services/ScrumboardDataService';
export default {
  name: "UserDirectory",
  components: {},
  data() {
    return {
    scrumAPI:[],
      scrumFields: [
        {
          key: "name",
          label: "Nom",
          sortable: true,
        },
        {
          key: "type",
          label: "Type",
          sortable: true,
        },
        {
          key: "_id",
          label: "Accès",
          sortable: false,
        },
      ]
    };
  },
  mounted() {
    ScrumboardDataService.getAll()
      .then((response) => {
        this.scrumAPI = response.data;
        console.log(response.data);
      }).catch(e => console.log(e));
  }
};
</script>

<style >
</style>