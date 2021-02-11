<template>
  <v-container fluid class="fill-height" id="login">
    <v-row justify="center">
      <v-col lg="3" sm="4">
        <v-card rounded="lg">
          <v-text-field
            v-model="username"
            class="text-field-custo pt-3 ma-3 mb-0"
            hide-details
            label="Username"
            filled
          />
          <span v-if="errorMessage" class="red--text pl-4 caption">{{
            errorMessage
          }}</span>
          <v-select
            v-model="region"
            :items="['EUW']"
            filled
            hide-details
            class="ma-3 text-field-custo"
            label="Region"
            :menu-props="{ bot: true, offsetY: true }"
          ></v-select>
          <v-card-actions>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="loading || username === ''"
              @click="login"
              block
              depressed
            >
              GO REVIEW
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import api from "../api/api.js";
export default {
  name: "Home",
  data: function() {
    return {
      loading: false,
      username: "",
      region: "EUW",
      errorMessage: ""
    };
  },
  components: {},
  mounted() {
    console.log("mounted");
  },
  methods: {
    ...mapActions({
      saveUser: "user/saveUser"
    }),
    login() {
      this.errorMessage = "";
      this.loading = true;
      api
        .getSummoner(this.username)
        .then(summoner => {
          console.log(summoner);
          api
            .getSummonerLeagueInfo(summoner.id)
            .then(async summonerLeagueInfo => {
              console.log(summonerLeagueInfo);
              let user = { ...summoner };
              user.leagueIngo = { ...summonerLeagueInfo[0] };
              await this.saveUser(user);
              localStorage.setItem("userRegistered", user.name);
              this.$router.replace("Home");
            });
        })
        .catch(() => {
          this.errorMessage = "Summoner not found";
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
#login {
  background-color: #160d33;
}
.text-field-custo >>> .v-input__slot::before,
.text-field-custo >>> .v-input__slot::after {
  border-style: none !important;
}
.v-btn.v-btn--disabled.theme--light.v-btn--has-bg {
  background-color: #ffb300 !important;
  opacity: 0.6;
}
</style>
