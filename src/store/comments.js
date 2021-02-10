import idb from "../database/userDB.js";

export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {},
  actions: {
    async deleteComment(context, comment) {
      await idb.deleteComment(comment);
    },
    async getComments(context) {
      context.state.comments = [];
      let comments = await idb.getComments();
      comments.forEach(c => {
        context.state.comments.push(c);
      });
    },
    async saveComment(context, comment) {
      await idb.saveComment(comment);
    }
  }
};
