import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
  }
})
