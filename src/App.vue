<template>
  <v-app id="app">
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import appBar from "./components/app-bar.vue";
export default {
  components: { appBar },
  mounted() {}
};
</script>

<style></style>
