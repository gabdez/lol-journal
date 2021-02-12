<template>
  <lol-card v-if="user">
    <v-row justify="center" align="center">
      <v-badge
        bordered
        bottom
        color="primary"
        :content="user.summonerLevel"
        offset-x="60%"
        offset-y="10"
      >
        <v-avatar height="150px" width="150px" class="mt-5">
          <v-img
            :src="$_getSummonerIcon(user.profileIconId)"
            :alt="user.name"
          />
        </v-avatar>
      </v-badge>
    </v-row>
    <v-card-title class="justify-center white--text mt-5">
      {{ user.name }} <span class="grey--text"> #EUW</span>
    </v-card-title>
    <v-row class="px-2">
      <v-col cols="3">
        <v-img
          class="mt-0 pt-0"
          :src="
            require('@/assets/emblems/Emblem_' + user.leagueInfo.tier + '.png')
          "
        />
      </v-col>
      <v-col cols="9" align-self="center">
        <div class="white--text">
          {{ user.leagueInfo.tier }} {{ user.leagueInfo.rank }}
          <span class="grey--text caption">
            {{ user.leagueInfo.leaguePoints }} lp
          </span>
        </div>
        <div class="grey--text">
          {{ user.leagueInfo.wins }} W {{ user.leagueInfo.losses }} L -
          <span
            :class="{
              'red--text': winPourcentage < 50,
              'green--text': winPourcentage > 50
            }"
            >{{ winPourcentage }} %
          </span>
        </div>
        <v-progress-linear
          class="progress-win mt-2"
          height="5px"
          background-color="red accent-1"
          color="green accent-3"
          :value="winPourcentage"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </lol-card>
</template>

<script>
import lolCard from "./basics/lol-card.vue";
import { mapState } from "vuex";
import mixin from "../components/mixins/assets.js";
export default {
  mixins: [mixin],
  components: { lolCard },
  data: function() {
    return {};
  },
  computed: {
    ...mapState("user", ["user"]),
    winPourcentage() {
      return (
        Math.round(
          (this.user.leagueInfo.wins /
            (this.user.leagueInfo.wins + this.user.leagueInfo.losses)) *
            100 *
            10
        ) / 10
      );
    }
  },
  methods: {}
};
</script>

<style scoped>
.progress-win {
  width: 80% !important;
}
</style>
