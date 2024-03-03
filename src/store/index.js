import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        category: [],
        tag: [],
        total: 0,
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
        setCategory(state, category) {
            state.category = category
        },
        setTag(state, tag) {
            state.tag = tag
        },
        setTotal(state, total) {
            state.total = total
        },
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
            articles.forEach((item) => {
                item.createdAt = item.createdAt[0] + '-' + item.createdAt[1] + '-' + item.createdAt[2]
                if (item.coverImg === '') {
                    item.coverImg = 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png'
                }
                axios.get(item.url).then((res) => {
                    item.content = res.toString().substring(0, 200)
                })
                state.articles.push(item)
            })

        },
    },
    actions: {},
    modules: {}
})
