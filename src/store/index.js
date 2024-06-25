import Vue from 'vue'
import Vuex from 'vuex'

import data from './modules/data.js'
import user from "./modules/user.js";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    data,
    user,
  },
})
export default store