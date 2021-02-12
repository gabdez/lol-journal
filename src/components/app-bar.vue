<template>
  <div>
    <v-app-bar color="secondary" dark>
      <v-toolbar-title class="primary--text">{{ app_name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="user != null">
        <v-menu center bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon x-large v-bind="attrs" v-on="on">
              <v-avatar>
                <v-icon>mdi-power</v-icon>
              </v-avatar>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import mixin from "../components/mixins/assets.js";
import { APPNAME } from "../js/constants.js";
export default {
  mixins: [mixin],
  data: function() {
    return {
      app_name: APPNAME
    };
  },
  computed: {
    ...mapState("user", ["user"])
  },
  methods: {
    ...mapMutations("user", ["setUser"]),
    logout() {
      localStorage.removeItem("userRegistered");
      this.setUser(null);
      this.$router.replace("/");
    }
  }
};
</script>

<style></style>
