import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: {}
  },
  mutations: {
    setSubtotal: (state, payload) => {
      state.items.push(payload)
    }
  },
  getters: {
    getItems: state => state.items
  }
})