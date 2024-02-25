import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        category: [],
        tag: [],
        articles: [],
        userDto: {},
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
            const sideBarPhone = document.querySelector('.sideBar-menu')
            const body = document.querySelector('body')
            if (!sideBarPhone.contains(event.target)) {
                body.style.setProperty('--width', '0')
                sideBarPhone.style.right = '-300px'
            }
        },
        setLoginWindowStatus(state, status) {
            state.loginWindow = status;
        },
        setUserDto(state, userDto) {
            state.userDto = userDto;
        },
        setLoginStatus(state, status) {
            state.isLogin = status;
        },
        updateArticles(state, articles) {
            state.articles = articles
        },
        setArticles(state, articles) {
            state.articles = []
            state.category = []
            state.tag = []
            articles.forEach((item) => {
                item.createdAt = item.createdAt[0] + '-' + item.createdAt[1] + '-' + item.createdAt[2]
                if (item.coverImg === '') {
                    item.coverImg = 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png'
                }
                if (item.category !== '' && !state.category.includes(item.category)) {
                    state.category.push(item.category)
                }
                if (item.tag !== '' && !state.tag.includes(item.tag)) {
                    state.tag.push(item.tag)
                }
                axios.get(item.url).then((res) => {
                    item.content = res.toString().substring(0, 200)
                })
            })
            state.articles = articles

        },
    },
    actions: {},
    modules: {}
})
