<template>
  <v-container fluid class="fill-height pa-0" id="home">
    <v-img
      :src="$_getChampSplashAsset('TwistedFate')"
      gradient="rgba(22,13,51,0.8), rgba(22,13,51,0.8)"
      :height="'calc(100vh - 64px)'"
    >
      <v-container
        fluid
        color="transparent"
        class="overflow-y-auto fill-height"
      >
        <v-col align-self="start">
          <v-row justify="start">
            <v-col cols="4">
              <card-player />
            </v-col>
            <v-col cols="8">
              <key-points />
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-img>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixin from "../components/mixins/assets.js";
import cardPlayer from "../components/card-player.vue";
import keyPoints from "../components/key-points.vue";
export default {
  name: "Home",
  components: { cardPlayer, keyPoints },
  mixins: [mixin],
  data: function() {
    return {
      ready: true
    };
  },
  computed: {
    ...mapState("user", ["user"])
  },
  async mounted() {
    if (this.user == null) {
      let username = await localStorage.getItem("userRegistered");
      console.log(username);
      await this.getUser(username);
    }
  },
  methods: {
    ...mapActions({
      saveUser: "user/saveUser",
      deleteUser: "user/deleteUser",
      getUser: "user/getUser"
    }),
    addUser() {
      this.saveUser({ name: "gabriel", age: 22 });
    }
  }
};
</script>

<style scoped>
.filter-bg-img {
  filter: blur(0.2px) grayscale(0.87) brightness(0.5);
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
