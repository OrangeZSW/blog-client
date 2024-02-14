import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginWindow: false,
    isLogin: false,
  },
  getters: {
    getLoginWindowStatus: state => {
      return state.loginWindow;
    }
  },
  mutations: {
    setLoginWindowStatus(state, status) {
      state.loginWindow = status;
    }
  },
  actions: {
  },
  modules: {
  }
})
