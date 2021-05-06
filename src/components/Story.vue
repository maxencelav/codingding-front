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
  </div>
</template>

<script>
import StoriesDataService from '../services/StoriesDataServices';
export default {
  name: "Story",
  data() {
    return {
      story: {}
    };
  },
   mounted() {
    StoriesDataService.get(this.$route.params.id)
      .then((response) => {
        this.story = response.data;
        console.log(response.data);
      }).catch(e => console.log(e));
  }
};
</script>

<style >
</style>

