<template>
  <div>
    <b-card>
      <b-card-title>{{ achievement.name }}</b-card-title>
      <blockquote class="blockquote mb-0">
        <p>{{ achievement.message }}</p>
        <footer class="d-flex">
          <div class="blockquote-footer">
            {{ achievement.creatorId }}
          </div>
          <b-button-group>
          <b-button class="ml-auto">
            <b-icon-hand-thumbs-up>{{getCreatorName(achievement.creatorId)}}</b-icon-hand-thumbs-up>
          </b-button>   
          <slot></slot>
          </b-button-group>  
        </footer>
      </blockquote>
    </b-card>
  </div>
</template>

<script>
import UsersDataService from '../services/UsersDataService'
export default {
  name: "NavBar",
  props: ["achievement"],
  methods: {
    getCreatorName(id) {
      UsersDataService.get(id)
      .then(() => {
      })
    }
  }
};
</script>

<style >
</style>
