<template>
  <div>
    <b-container>
      <h1 class="display-1">Achievements</h1>
      <p class="lead">
        Retrouvez ici tous les derniers accomplissements des étudiants de la
        Coding Factory.
      </p>
      <b-card-group columns>
        <Achievement
          v-for="achievement in achievements"
          v-bind:key="achievement.id"
          v-bind:achievement="achievement"
        ></Achievement>
      </b-card-group>
    </b-container>

     <b-container>
        <h2>Crée ton accomplissement ! </h2>
        <b-form @submit="submitAchievement">
           <b-form-group id="input-group-1" label="Ton accomplissement :" label-for="input-1">
              <b-form-input v-model="form.title" required></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-2" label="Ton message :" label-for="input-2">
              <b-form-input v-model="form.message" required></b-form-input>
           </b-form-group>

            <b-button type="submit" variant="primary">Envoyer</b-button>
        </b-form>

     </b-container>
  </div>
</template>

<script>
import Achievement from "./Achievement.vue";
import AchievementsDataService from "../services/AchievementsDataService";
import axios from 'axios';

export default {
  name: "Achievements",
  components: {
    Achievement
  },
  data() {
    return {
      achievements: [],
      form: {
        title: '',
        message: ''
      }
    };
  },
  methods: {
    submitAchievement() {
      const data = {
        title: this.form.title,
        message: this.form.message
      };

      console.log('In Submit Achievement...');

      axios.post("http://localhost:4000/achievements", data)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "achievements" });
        })
        .catch(e => {
          console.log(e);
        })
    }
  },
  mounted() {
    AchievementsDataService.getAll()
      .then((response) => {
        this.achievements = response.data;
        console.log(response.data);
      });
  }
};
</script>


<style>
</style>
