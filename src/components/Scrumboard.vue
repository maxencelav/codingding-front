<template>
  <div class="container mt-5">
    <h2> {{scrumboards.name}}</h2>
    <div class="row">
      <div class="col form-inline">
        <b-form-input
          id="input-2"
          v-model="newTask"
          required
          placeholder="Enter Task"
          @keyup.enter="add"
        ></b-form-input>
        <b-button @click="add" variant="primary" class="ml-3">Add</b-button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-3">
        <div class="p-2 alert alert-secondary">
          <h3>User Stories</h3>
          <!-- Backlog draggable component. Pass arrBackLog to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="backlogAPI"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="element in backlogAPI"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-primary">
          <h3>In Progress</h3>
          <!-- In Progress draggable component. Pass arrInProgress to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrInProgress"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="element in arrInProgress"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-warning">
          <h3>Doing</h3>
          <!-- Testing draggable component. Pass arrTested to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrTested"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="element in arrTested"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <!-- Done draggable component. Pass arrDone to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrDone"
            group="tasks"
          >
            <div
              class="list-group-item"
              v-for="element in arrDone"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import draggable
import draggable from "vuedraggable";
import ScrumboardDataService from "../services/ScrumboardDataService";
import StoriesDataService from "../services/StoriesDataServices"
//import axios from 'axios';

export default {
  name: "Scrumboard",
  components: {
    //import draggable as a component
    draggable
  },
  data() {
    return {
      scrumboards: [],
      backlogAPI: [],
      // for new tasks
      newTask: "",
      // 4 arrays to keep track of our 4 statuses
      arrBackLog: [
        { name: "Code Sign Up Page" },
        { name: "Test Dashboard" },
        { name: "Style Registration" },
        { name: "Help with Designs" }
      ],
      arrInProgress: [],
      arrTested: [],
      arrDone: []
    };
  },
  methods: {
    //add new tasks method
    add: function() {
      if (this.newTask) {
        this.arrBackLog.push({ name: this.newTask });
        this.newTask = "";
      }
    }
  },
  mounted() {
    console.log("route param:" + this.$route.params.id)
    ScrumboardDataService.get(this.$route.params.id)
      .then((response) => {
        this.scrumboards = response.data;
        console.log("scrum" + response.data);
      }).catch(e => console.log(e));
    StoriesDataService.getAllFromScrum(this.$route.params.id)
          .then((response2) => {
            this.backlogAPI = response2.data
            console.log("stories" + JSON.stringify(this.backlogAPI))
      }).catch(e => console.log(e));
  }
};
</script>

<style>
/* light stylings for the kanban columns */
.kanban-column {
  min-height: 500px;
}
</style>