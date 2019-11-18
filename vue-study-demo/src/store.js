import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages : ""
  },
  mutations: {
    setMessage (state, value) {
      state.messages = value;
    },
    setDesc (state, value) {

    }
  },
  actions: {

  }
})
