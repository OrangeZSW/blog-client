import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userDto:{
    },
    loginWindow: false,
    isLogin: false,
  },
  getters: {
    getLoginWindowStatus: state => {
      return state.loginWindow;
    },
    getUserDto: state => {
      return state.userDto;
    }
  },
  mutations: {
    setLoginWindowStatus(state, status) {
      state.loginWindow = status;
    },
    setUserDto(state, userDto){
      state.userDto = userDto;
    },
    setLoginStatus(state, status){
      state.isLogin = status;
    }
  },
  actions: {
  },
  modules: {
  }
})
