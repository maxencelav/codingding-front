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
  </div>
</template>

<script>
import Achievement from "./Achievement.vue";

export default {
  name: "Achievements",
  components: {
    Achievement,
  },
  data() {
    return {
      achievements: [
        {
          id: 0,
          name: "Gagné au babyfoot !",
          message:
            "Et minim enim amet occaecat. Magna aute laboris aliquip anim sit ullamco mollit non nostrud in pariatur esse. Elit esse cillum ex veniam voluptate consequat culpa eu.",
          cheers: [0, 1, 2, 3],
          //on récupère l'ID ou le createur complet ? ça serait bcp + pratique de récupérer le créateur complet
          creatorId: "0",
        },
        {
          id: 1,
          name: "Consectetur nulla esse sunt dolor proident Lorem ex.",
          message:
            "Amet proident laborum reprehenderit amet velit nostrud eiusmod aliquip.",
          cheers: [0, 1, 2, 3],
          creatorId: "3",
        },
        {
          id: 2,
          name:
            "Labore aliquip aliquip laborum aliquip id quis ut magna eiusmod reprehenderit eu duis ipsum.",
          message: "Consectetur consequat aliqua aute qui nisi.",
          cheers: [0, 1, 2, 3],
          creatorId: "5",
        },
        {
          id: 3,
          name:
            "Amet consectetur consectetur non eiusmod laborum esse duis excepteur.",
          message: "Duis ipsum irure id esse ut et et excepteur cillum.",
          cheers: [0, 1, 2, 3],
          creatorId: "4",
        },
        {
          id: 4,
          name: "Sunt esse sint ad eiusmod non sint mollit.",
          message:
            "Incididunt aute incididunt et eiusmod dolore duis pariatur et dolor ipsum ipsum.",
          cheers: [0, 1, 2, 3],
          creatorId: "3",
        },
        {
          id: 5,
          name: "Laborum eiusmod proident nostrud dolor ex et.",
          message: "Reprehenderit ex est non consequat consequat.",
          cheers: [0, 1, 2, 3],
          creatorId: "8",
        },
      ],
    };
  },
};
</script>


<style>
</style>
