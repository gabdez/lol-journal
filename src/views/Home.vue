<template>
  <div class="home">
    <v-progress-linear
      background-color="red accent-1"
      color="green accent-2"
      value="60"
    ></v-progress-linear>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api from "../api/api.js";
import mixin from "../components/mixins/assets.js";
export default {
  name: "Home",
  mixins: [mixin],
  data: function() {
    return {
      ready: true
    };
  },
  components: {},
  computed: {
    ...mapState("user", ["user"])
  },
  async mounted() {
    await this.getUser("gabdez");
    console.log(this.user);
  },
  methods: {
    ...mapActions({
      saveUser: "user/saveUser",
      deleteUser: "user/deleteUser",
      getUser: "user/getUser"
    }),
    addUser() {
      this.saveUser({ name: "gabriel", age: 22 });
    },
    async getSummoner() {
      let summoner = await api.getSummoner("gabdez");
      console.log(summoner);
      console.log(this.$_getSummonerIcon(summoner.profileIconId));
      let summonerLeagueInfo = await api.getSummonerLeagueInfo(summoner.id);
      console.log(summonerLeagueInfo);
      let matchList = await api.getSummonerMatchList(summoner.accountId, 0, 10);
      console.log(matchList);
    }
  }
};
</script>
