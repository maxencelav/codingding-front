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
          <slot></slot>
          </b-button-group>  
        </footer>
      </blockquote>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: ["achievement"]
};
</script>

<style >
</style>
