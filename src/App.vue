<template>
  <v-app id="app">
    <app-bar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import appBar from "./components/app-bar.vue";
export default {
  components: { appBar }
};
</script>

<style></style>
