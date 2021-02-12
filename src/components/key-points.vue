<template>
  <lol-card :height="'100%'">
    <v-card-title class="white--text">Key focus</v-card-title>
    <v-card-subtitle class="grey--text">
      Key points to focus to improve your game.
    </v-card-subtitle>
  </lol-card>
</template>

<script>
import lolCard from "./basics/lol-card.vue";
export default {
  components: { lolCard }
};
</script>

<style scoped></style>
