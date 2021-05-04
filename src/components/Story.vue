<template>
  <div>
    <b-container>
      <b-row>
        <b-col fluid="sm">
          <h1 class="display-3 text-left">
            {{ story.name }}
          </h1>
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

