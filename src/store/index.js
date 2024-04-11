import Vue from 'vue'
import Vuex from 'vuex'
import moment from './moment'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    // 持久化存储
    plugins: [
        // 把vuex的数据存储到sessionStorage
        createPersistedState({
            storage: window.sessionStorage,
            reducer(val) {
                return {
                    // 只存储state中的userData
                    userDto: val.userDto,
                    isLogin: val.isLogin,
                    author: val.author,
                    articles: val.articles,
                    category: val.category,
                    tag: val.tag,
                    total: val.total,
                }
            }
        }),
    ],
    state: {
        category: [],
        tag: [],
        total: 0,
        author: {},
        articles: [],
        userDto: {},
        loginWindow: false,
        isLogin: false,
        search: false,
    },
    getters: {
        getUserDto: state => {
            return state.userDto;
        },
    },
    mutations: {
        setSearch(state, search) {
            state.search = search
        },
        setAuthor(state,author) {
            state.author = author
        },
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


            // 创建一个 Promise 数组，用于存放所有的 axios.get 请求
            const promises = articles.map(item => {
                // 处理文章的 createdAt 和 coverImg
                item.createdAt = item.createdAt[0] + '-' + item.createdAt[1] + '-' + item.createdAt[2]
                if (item.coverImg === '') {
                    item.coverImg = 'https://cdn.jsdelivr.net/gh/OrangeZSW/blog_img/202305021008781.png'
                }

                // 返回一个 Promise 对象，表示 axios.get 的异步操作
                return axios.get(item.url)
                    .then(res => {
                        // 设置文章内容
                        item.content = res.toString().substring(0, 100)
                        return item // 返回设置好内容的文章对象
                    })
            })
            // 等待所有 Promise 执行完成后再更新 state.articles
            Promise.all(promises)
                .then(articlesWithContent => {
                    // 将所有设置好内容的文章添加到 state.articles 中
                    state.articles = [] // 清空文章列表
                    state.articles.push(...articlesWithContent)
                })
                .catch(error => {
                    console.error('Error fetching article content:', error)
                })
        }

    },
    actions: {
        updateUserDto(context, userDto) {
            axios.get('user/'+context.state.userDto.userId).then(res => {
                context.commit('setUserDto', res)
            })
        }
    },
    modules: {
        moment,
    }
})
