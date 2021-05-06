<template>
  <div class="container mt-5">
    <h2>{{ scrumboards.name }}</h2>
    <p class="lead">{{ scrumboards.key }} - {{ scrumboards.type }}</p>
    <div class="row">
      <div class="col form-inline">
            <b-button-group size="lg">
        <b-button variant="primary" id="show-btn" @click="showModal"><b-icon-plus-circle-fill></b-icon-plus-circle-fill> Ajouter</b-button>
        <b-button id="show-btn" @click="showEditModal"><b-icon-pencil></b-icon-pencil> Modifier</b-button>
            </b-button-group>
        <!-- BEGIN MODAL -->
        <b-modal ref="my-modal" hide-footer title="Ajouter une story/tâche">
          <div class="d-block">
            <b-form @submit="add">
              <b-form-group label="Nom :">
                <b-form-input
                  v-model="form.storyTitle"
                  required
                  placeholder="Nom de la story/tâche"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Description :">
                <b-form-textarea
                  id="textarea-no-resize"
                  v-model="form.storyDesc"
                  placeholder="Description de la story/tâche"
                  rows="3"
                  no-resize
                ></b-form-textarea>
              </b-form-group>
              <b-form-group label="Type :">
                <b-form-select v-model="form.storyType" :options="options">
                </b-form-select>
              </b-form-group>
              <b-form-group label="Story Points :">
                <b-form-input
                  v-model="form.storyPts"
                  required
                  placeholder="Valeur de la story"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Priorité :">
                <b-form-select
                  v-model="form.storyPriority"
                  :options="priorityOptions"
                >
                </b-form-select>
              </b-form-group>
              <b-button type="submit" variant="primary" class="ml-3"
                >Ajouter</b-button
              >
            </b-form>
          </div>
        </b-modal>
        <!-- END MODAL -->

        <b-modal ref="my-modal-edit" hide-footer title="Modifier le scrumboard">
          <div class="d-block">
            <b-form @submit="saveEdit">
              <b-form-group label="Nom :">
                <b-form-input
                  v-model="editForm.scrumTitle"
                  required
                  placeholder="Nom du scrumboard"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Type :">
                <b-form-select
                  v-model="editForm.scrumType"
                  :options="scrumboardTypeOptions"
                >
                </b-form-select>
              </b-form-group>
              <b-form-group label="Description :">
                <b-form-textarea
                  id="textarea-no-resize"
                  v-model="editForm.scrumDesc"
                  placeholder="Description du scrumboard"
                  rows="3"
                  no-resize
                ></b-form-textarea>
              </b-form-group>
              <b-form-group label="Clé :">
                <b-form-input
                  v-model="editForm.scrumKey"
                  required
                  placeholder="Clé"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary" class="ml-3"
                >Modifier</b-button
              >
            </b-form>
          </div>
        </b-modal>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-3">
        <div class="p-2 alert alert-secondary">
          <h3>User Stories</h3>
          <!-- Backlog draggable component. Pass arrBackLog to list prop -->
          <draggable
            id="userstories-col"
            class="list-group kanban-column"
            :list="arrUserStories"
            group="tasks"
            :move="storyMove"
          >
            <div
              class="list-group-item"
              v-for="(element) in arrUserStories"
              :key="element.name"
            >
              <b-row align-h="between">
                <b-col cols="7" class="text-break">
                  {{ element.name }}
                </b-col>
                <b-col cols="5" class="text-align-right">
                  <b-button-group size="sm">
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
            id="todo-col"
            class="list-group kanban-column"
            :list="arrToDo"
            group="tasks"
            :move="storyMove"
          >
            <div
              class="list-group-item"
              v-for="(element) in arrToDo"
              :key="element.name"
            >
              <b-row align-h="between">
                <b-col cols="7" class="text-break">
                  {{ element.name }}
                </b-col>
                <b-col cols="5" class="text-align-right">
                  <b-button-group size="sm">
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
        <div class="p-2 alert alert-warning">
          <h3>In Progress</h3>
          <!-- Testing draggable component. Pass arrToDo to list prop -->
          <draggable
            id="inprogress-col"
            class="list-group kanban-column"
            :list="arrInProgress"
            group="tasks"
            :move="storyMove"
          >
            <div
              class="list-group-item"
              v-for="(element) in arrInProgress"
              :key="element.name"
            >
              <b-row align-h="between">
                <b-col cols="7" class="text-break">
                  {{ element.name }}
                </b-col>
                <b-col cols="5" class="text-align-right">
                  <b-button-group size="sm">
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
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <!-- Done draggable component. Pass arrDone to list prop -->
          <draggable
            id="done-col"
            class="list-group kanban-column"
            :list="arrDone"
            group="tasks"
            :move="storyMove"
          >
            <div
              class="list-group-item"
              v-for="(element) in arrDone"
              :key="element.name"
            >
              <b-row align-h="between">
                <b-col cols="7" class="text-break">
                  {{ element.name }}
                </b-col>
                <b-col cols="5" class="text-align-right">
                  <b-button-group size="sm">
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
        { value: "User Story", text: "User Story" },
        { value: "Epic", text: "Epic" },
        { value: "Tâche", text: "Tâche" },
      ],
      priorityOptions: [
        { value: "Basse", text: "Basse" },
        { value: "Moyenne", text: "Moyenne" },
        { value: "Haute", text: "Haute" },
      ],
      scrumboardTypeOptions: [
        { value: null, text: "Type de projet", disabled: true },
        { value: "TP", text: "TP" },
        { value: "Projet personnel", text: "Projet personnel" },
      ],
      // for new tasks
      form: {
        storyTitle: "",
        storyDesc: "",
        storyType: "",
        storyPts: "",
        storyPriority: "",
      },
      editForm: {
        scrumId: "",
        scrumTitle: "",
        scrumKey: "",
        scrumType: "",
        scrumDesc: "",
      },
      // 4 arrays to keep track of our 4 statuses
      arrUserStories: [],
      arrToDo: [],
      arrInProgress: [],
      arrDone: [],
    };
  },
  methods: {
    // for modal
    showModal() {
      this.$refs["my-modal"].show();
    },
    showEditModal() {
      this.$refs["my-modal-edit"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    hideEditModal() {
      this.$refs["my-modal-edit"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    toggleEditModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal-edit"].toggle("#toggle-btn");
    },
    generateKey: function () {
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

      StoriesDataService.create(data)
        .then((response) => {
          this.arrUserStories.push(response.data);
        })
        .catch((e) => {
          this.errMessage = "Erreur : " + e ;
        });
    },
    saveEdit: function () {
      const data = {
        name: this.editForm.scrumTitle,
        key: this.editForm.scrumKey,
        type: this.editForm.scrumType,
        description: this.editForm.scrumDesc,
      };
      ScrumboardDataService.update(this.scrumboards._id, data)
        .then((response) => {
          console.log("updated data: " + JSON.stringify(response.data));
          location.reload();
        })
        .catch((e) => {
          console.log(e);
          this.errMessage = "Erreur";
        });
    },
    // TO DO
    storyMove: function (evt, movement) {
      console.log(evt.draggedContext.element);
      let storyId = evt.draggedContext.element._id;
      let pageColId = movement.rootEl["id"];
      let apiColId = 0;

      switch (pageColId) {
        case "userstories-col":
          apiColId = 0;
          break;
        case "todo-col":
          apiColId = 1;
          break;
        case "inprogress-col":
          apiColId = 2;
          break;
        case "done-col":
          apiColId = 3;
          break;
        default:
          apiColId = 0;
          break;
      }

      const data = {
        name: evt.draggedContext.element.name,
        key: evt.draggedContext.element.key,
        type: evt.draggedContext.element.type,
        storyPts: evt.draggedContext.element.storyPts,
        description: evt.draggedContext.element.description,
        priority: evt.draggedContext.element.priority,
        boardId: evt.draggedContext.element.boardId,
        status: apiColId,
      };

      StoriesDataService.update(storyId, data)
        .then((response) => {
          console.log("updated data dnd: " + JSON.stringify(response.data));
        })
        .catch((e) => {
          console.log(e);
          this.errMessage = "Erreur";
        });
      return true;
    },
    updateScrumboard: function() {
       ScrumboardDataService.get(this.$route.params.id)
      .then((response) => {
        this.scrumboards = response.data;

        this.editForm.scrumTitle = this.scrumboards.name;
        this.editForm.scrumDesc = this.scrumboards.description;
        this.editForm.scrumKey = this.scrumboards.key;
        this.editForm.scrumType = this.scrumboards.type;
      })
      .catch((e) => console.log(e));
    },
    updateStories: function() {
      StoriesDataService.getAllFromScrum(this.$route.params.id)
      .then((response2) => {
        this.backlogAPI = response2.data;
        this.arrUserStories = []
        this.arrToDo = []
        this.arrInProgress = []
        this.arrDone = []
        this.backlogAPI.forEach((story) => {
          switch (story.status) {
            case "0":
              this.arrUserStories.push(story);
              break;
            case "1":
              this.arrToDo.push(story);
              break;
            case "2":
              this.arrInProgress.push(story);
              break;
            case "3":
              this.arrDone.push(story);
              break;
            default:
              this.arrUserStories.push(story);
              break;
          }
        });
      })
      .catch((e) => console.log(e));
    }
  },
  mounted() {
    console.log("route param:" + this.$route.params.id);
    this.updateScrumboard();
    this.updateStories();
  },
};
</script>

<style>
/* light stylings for the kanban columns */
.kanban-column {
  min-height: 500px;
}
</style>
