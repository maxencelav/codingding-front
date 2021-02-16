<template>
  <div>
    <b-container>
      <header>
        <b-card-title>{{ achievement.name }}</b-card-title>
      </header>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      profile: [
        {
          firstName: "FirstName",
          lastName: "LastName",
          email: "email@mail.com",
          profilePic: "https://picsum.photos/200",
          classYear: 1,
          classStatus: "TP",
          gitHubLinks: ["maxencelav","ninjamuffin99"],
        },
      ],
    };
  },
};
</script>

<style >
</style>
