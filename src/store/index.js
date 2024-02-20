import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
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
    backLoginWindow() {
        const Login = document.querySelector('.login')
        if (!Login.contains(event.target)) {
          Login.style.zIndex = '0'
          Login.style.opacity = '0'
          Login.style.right = '-400px'
        }
    },
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
