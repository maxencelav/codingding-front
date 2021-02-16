<template>
  <div>
    <h1>ACHIEVEMENTS</h1>
    <Achievement></Achievement>
  </div>
</template>

<script>
import Achievement from "./Achievement.vue";

export default {
  name: 'Achievements',
  components: {
    Achievement
    
  },
  data() {
    return {
      achievement: {
        
      }
    }
  }
}
</script>


<style>

</style>
