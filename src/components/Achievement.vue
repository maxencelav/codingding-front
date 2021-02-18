<template>
  <div>
    <b-card>
      <b-card-title>{{ achievement.name }}</b-card-title>
      <blockquote class="blockquote mb-0">
        <p>{{ achievement.message }}</p>
        <footer class="d-flex">
          <div class="blockquote-footer">
            {{ achievement._id }}
          </div>
          <b-button class="ml-auto">
            <b-icon-hand-thumbs-up></b-icon-hand-thumbs-up>
          </b-button>     
          <b-button variant="danger">Supprimer</b-button>
        </footer>
      </blockquote>
    </b-card>
  </div>
</template>

<script>
import AchievementsDataService from '../services/AchievementsDataService';

export default {
  name: "NavBar",
  props: ["achievement"],
  methods: {
    deleteAchievement(id) {
        AchievementsDataService.delete(id)
          .then(response => {
            console.log("In delete..." + response);
          }).catch(e => {
            console.log(e);
          })
    }
  }
};
</script>

<style >
</style>
