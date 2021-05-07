<template>
  <div>
    <b-container>
      <b-row><b-link :to="'/scrumboard/'+ story.boardId"><b-icon-arrow-bar-left></b-icon-arrow-bar-left> Retourner au ScrumBoard</b-link></b-row>
      <b-row>
        <b-col fluid="sm">
          <h1 class="display-3 text-left">
            {{ story.name }}
          </h1>
          <p class="lead">
            {{ story.key }} - {{ story.type }} <b-badge>{{ story.storyPts }}</b-badge><br>
            Priorité : 
            <b-badge v-if="story.priority == 'Basse'" variant="primary">Basse</b-badge>
            <b-badge v-else-if="story.priority == 'Moyenne'" variant="success">Moyenne</b-badge>
            <b-badge v-else-if="story.priority == 'Haute'" variant="danger">Haute</b-badge>
            <b-badge v-else variant="secondary">Inconnue</b-badge>
          </p>
        <b-button id="show-btn" @click="showEditModal"><b-icon-pencil></b-icon-pencil> Modifier</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col fluid="sm">
          <h2>Description</h2>
          <p>
            {{ story.description }}
          </p>
        </b-col>
      </b-row>
    </b-container>

    <b-modal ref="my-modal-edit" hide-footer title="Modifier cette story/tâche">
          <div class="d-block">
            <b-form @submit="saveEdit">
              <b-form-group label="Nom :">
                <b-form-input
                  v-model="editForm.storyTitle"
                  required
                  placeholder="Nom de la story/tâche"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Description :">
                <b-form-textarea
                  id="textarea-no-resize"
                  v-model="editForm.storyDesc"
                  placeholder="Description de la story/tâche"
                  rows="3"
                  no-resize
                ></b-form-textarea>
              </b-form-group>
              <b-form-group label="Type :">
                <b-form-select v-model="editForm.storyType" :options="options">
                </b-form-select>
              </b-form-group>
              <b-form-group label="Story Points :">
                <b-form-input
                  v-model="editForm.storyPts"
                  required
                  placeholder="Valeur de la story"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Priorité :">
                <b-form-select
                  v-model="editForm.storyPriority"
                  :options="priorityOptions"
                >
                </b-form-select>
              </b-form-group>
              <b-button-group>
              <b-button type="submit" variant="primary" class="ml-3"
                >Modifier</b-button
              >
              <b-button variant="danger" v-on:click="deleteStory">
                Supprimer
              </b-button>
              </b-button-group>
            </b-form>
          </div>
        </b-modal>
  </div>
</template>

<script>
import StoriesDataService from '../services/StoriesDataServices';
import Vue from 'vue';

export default {
  name: "Story",
  data() {
    return {
      story: {}, 
      currentUser: "",
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
      editForm: {
        storyTitle: "",
        storyDesc: "",
        storyType: "",
        storyPts: "",
        storyPriority: "",
      }
    };
  },
  methods: {
    showEditModal() {
      this.$refs["my-modal-edit"].show();
    },
    hideEditModal() {
      this.$refs["my-modal-edit"].hide();
    },
    toggleEditModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal-edit"].toggle("#toggle-btn");
    }, 
    saveEdit: function () {
      const data = {
        name: this.editForm.storyTitle,
        type: this.editForm.storyType,
        description: this.editForm.storyDesc,
        storyPts: this.editForm.storyPts,
        key: this.story.key,
        priority: this.editForm.storyPriority,
        boardId: this.story.boardId,
        creatorId: this.currentUser._id,
        status: this.story.status
      };
      StoriesDataService.update(this.story._id, data)
        .then((response) => {
          console.log("updated data: " + JSON.stringify(response.data));
          location.reload();
        })
        .catch((e) => {
          console.log(e);
          this.errMessage = "Erreur";
        });
    }, 
    deleteStory: function () {
      StoriesDataService.delete(this.story._id)
        .then(() => {
          this.$router.push('/scrumboard/' + this.story.boardId);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
    StoriesDataService.get(this.$route.params.id)
      .then((response) => {
        this.story = response.data;

       this.editForm.storyTitle = this.story.name
       this.editForm.storyType = this.story.type
       this.editForm.storyDesc = this.story.description
       this.editForm.storyPts = this.story.storyPts
       this.editForm.storyPriority = this.story.priority
      
      console.log(response.data);
      }).catch(e => console.log(e));
  },
  created() {
    this.currentUser = Vue.getCurrentUser();
  }
};
</script>

<style >
</style>

