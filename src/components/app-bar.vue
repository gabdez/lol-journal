<template>
  <div>
    <v-app-bar color="blue darken-4" dark>
      <v-toolbar-title>{{ app_name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      {{ "gabdez" }}
    </v-app-bar>
  </div>
</template>

<script>
import { APPNAME } from "../js/constants.js";
export default {
  data: function() {
    return {
      app_name: APPNAME
    };
  }
};
</script>

<style></style>
