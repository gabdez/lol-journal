<template>
  <div class="home">
    <div v-if="ready">
      <v-btn @click="addUser">Add User</v-btn>
      <p />
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} is {{ user.age }} years old.
          <v-btn @click="deleteUser(user)">Delete</v-btn>
        </li>
      </ul>
    </div>
    <v-btn @click="getSummoner">get summoner</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import api from "../api/api.js";
export default {
  name: "Home",
  data: function() {
    return {
      ready: true
    };
  },
  components: {},
  computed: {
    ...mapState("user", ["users"])
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions({
      saveUser: "user/saveUser",
      deleteUser: "user/deleteUser",
      getUsers: "user/getUsers"
    }),
    addUser() {
      this.saveUser({ name: "gabriel", age: 22 });
    },
    async getSummoner() {
      let summoner = await api.getSummoner("gabdez");
      console.log(summoner);
    }
  }
};
</script>
