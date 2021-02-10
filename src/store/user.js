import idb from "../database/userDB.js";

export default {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {},
  actions: {
    async deleteUser(context, user) {
      await idb.deleteUser(user);
    },
    async getUsers(context) {
      context.state.users = [];
      let users = await idb.getUsers();
      users.forEach(c => {
        context.state.users.push(c);
      });
    },
    async saveUser(context, user) {
      await idb.saveUser(user);
    }
  }
};
