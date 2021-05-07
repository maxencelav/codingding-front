<template>
  <div class="container mt-5">
    <h2>{{ scrumboards.name }}</h2>
     <p class="lead">{{scrumboards.key}} - {{scrumboards.type}}</p>
    <div class="row">
      <div class="col form-inline">
        <b-button id="show-btn" variant="dark" class="dark shadow border rounded-0 outline-dark" @click="showModal">Ajouter</b-button>
        <!-- BEGIN MODAL -->
        <b-modal ref="my-modal" hide-footer title="Ajouter une story/tâche">
          <div class="d-block">
            <b-form @submit="add">
              <b-form-group
              label="Nom :">
              <b-form-input
                v-model="form.storyTitle"
                required
                placeholder="Nom de la story/tâche"
              ></b-form-input>
              </b-form-group>
              <b-form-group
              label="Description :">
               <b-form-textarea
                id="textarea-no-resize"
                v-model="form.storyDesc"
                placeholder="Description de la story/tâche"
                rows="3"
                no-resize
              ></b-form-textarea>
              </b-form-group>
              <b-form-group
              label="Type :">
              <b-form-select 
              v-model="form.storyType" 
              :options="options">
              </b-form-select>
              </b-form-group>
              <b-form-group
              label="Story Points :">
              <b-form-input
                v-model="form.storyPts"
                required
                placeholder="Valeur de la story"
              ></b-form-input>
              </b-form-group>
              <b-form-group
              label="Priorité :">
             <b-form-select 
              v-model="form.storyPriority" 
              :options="priorityOptions">
              </b-form-select>
              </b-form-group>
                <b-button type="submit" variant="dark" class="ml-3 dark shadow border rounded-0 outline-dark"
                >Ajouter</b-button
              >
            </b-form>
          </div>
        </b-modal>
        <!-- END MODAL -->
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
              class="list-group-item shadow border rounded-0"
              v-for="(element, index) in backlogAPI"
              :key="element.name"
            >
              <b-row align-h="between">
                <b-col cols="7" class="text-break">
                  {{ element.name }}
                </b-col>
                <b-col cols="5" class="text-align-right">
                  <b-button-group size="sm">
                    <b-button
                      variant="danger"
                      v-on:click="deleteStory(`${element._id}`, index)"
                      ><b-icon-x></b-icon-x
                    ></b-button>
                    <b-button variant="primary" :to="'/story/' + element._id"
                      ><b-icon-card-heading></b-icon-card-heading
                    ></b-button>
                  </b-button-group>
                </b-col>
              </b-row>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-primary">
          <h3>To Do</h3>
          <!-- In Progress draggable component. Pass arrInProgress to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrInProgress"
            group="tasks"
          >
            <div
              class="list-group-item shadow"
              v-for="(element, index) in arrInProgress"
              :key="element.name"
            >
              {{ element.name }}
              <b-button
                variant="danger"
                class="ml-3"
                v-on:click="deleteStory(`${element._id}`, index)"
                ><b-icon-x></b-icon-x
              ></b-button>
              <b-button
                variant="danger"
                class="ml-3"
                v-on:click="deleteStory(`${element._id}`, index)"
                ><b-icon-card-heading></b-icon-card-heading
              ></b-button>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-warning">
          <h3>In Progress</h3>
          <!-- Testing draggable component. Pass arrTested to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrTested"
            group="tasks"
          >
            <div
              class="list-group-item shadow"
              v-for="(element, index) in arrTested"
              :key="element.name"
            >
              {{ element.name }}
              <b-button
                variant="danger"
                class="ml-3"
                v-on:click="deleteStory(`${element._id}`, index)"
                ><b-icon-x></b-icon-x
              ></b-button>
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
              class="list-group-item shadow"
              v-for="(element, index) in arrDone"
              :key="element.name"
            >
              {{ element.name }}
              <b-button
                variant="danger"
                class="ml-3"
                v-on:click="deleteStory(`${element._id}`, index)"
                ><b-icon-x></b-icon-x
              ></b-button>
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
import StoriesDataService from "../services/StoriesDataServices";
// import axios from 'axios';

export default {
  name: "Scrumboard",
  components: {
    //import draggable as a component
    draggable,
  },
  data() {
    return {
      scrumboards: [],
      backlogAPI: [],
      options: [
      { value: 'US', text: 'User Story'},
      { value: 'Epic', text: 'Epic'},
      { value: 'Task', text: 'Tâche'},
    ],
    priorityOptions: [
      { value: 'Basse', text: 'Basse'},
      { value: 'Moyenne', text: 'Moyenne'},
      { value: 'Haute', text: 'Haute'},
    ],
      // for new tasks
      form: {
        storyTitle: "",
        storyDesc: "",
        storyType: "",
        storyPts: "",
        storyPriority: "",
      },
      // 4 arrays to keep track of our 4 statuses
      arrBackLog: [
        { name: "Code Sign Up Page" },
        { name: "Test Dashboard" },
        { name: "Style Registration" },
        { name: "Help with Designs" },
      ],
      arrInProgress: [],
      arrTested: [],
      arrDone: [],
    };
  },
  methods: {
    // for modal
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    generateKey: function() {
        const key = this.scrumboards.key;
        const number = this.backlogAPI.length + 1;
        const strKey = key + number;
        return strKey;
    },
    //add new tasks method
    add: function () {
      const data = {
        name: this.form.storyTitle,
        key: this.generateKey(),
        type: this.form.storyType,
        storyPts: this.form.storyPts,
        description: this.form.storyDesc,
        priority: this.form.storyPriority,
        boardId: this.$route.params.id,
      };
      console.log("task data:" + data);
      StoriesDataService.create(data)
        .then((response) => {
          console.log(response.data);
          this.backlogAPI.push(response.data);
          this.form.newTask = "";
        })
        .catch((e) => {
          console.log(e);
          this.errMessage = "Erreur";
        });
    },
    deleteStory: function (id, index) {
      StoriesDataService.delete(id)
        .then((response) => {
          console.log("In delete..." + response);
          this.backlogAPI.splice(index, 1).push(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // TODO
    update: function (id) {
      const data = {
        status: this.status,
      };
      StoriesDataService.update(id, data)
        .then((response) => {
          console.log("Updating...." + response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    console.log("route param:" + this.$route.params.id);
    ScrumboardDataService.get(this.$route.params.id)
      .then((response) => {
        this.scrumboards = response.data;
        console.log("scrum" + response.data);
      })
      .catch((e) => console.log(e));
    StoriesDataService.getAllFromScrum(this.$route.params.id)
      .then((response2) => {
        this.backlogAPI = response2.data;
        console.log("stories" + JSON.stringify(this.backlogAPI));
      })
      .catch((e) => console.log(e));


  },
};
</script>

<style>
/* light stylings for the kanban columns */
.kanban-column {
  min-height: 500px;
}
</style>