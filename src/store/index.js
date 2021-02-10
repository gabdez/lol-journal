import Vue from "vue";
import Vuex from "vuex";

import userModule from "./user.js";
import commentsModule from "./comments.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
    comments: commentsModule
  }
});
