import idb from "../database/userDB.js";

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async deleteUser(context, user) {
      await idb.deleteUser(user);
    },
    async getUser(context, userName) {
      context.state.user = null;
      let user = await idb.getUser(userName);
      context.state.user = user;
      console.log(user);
    },
    async saveUser(context, user) {
      await idb.saveUser(user);
      user;
    }
  }
};
