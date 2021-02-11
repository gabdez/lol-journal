<template>
  <div>
    <v-app-bar color="secondary" dark>
      <v-toolbar-title class="primary--text">{{ app_name }}</v-toolbar-title>

      <v-spacer></v-spacer>
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
