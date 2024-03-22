import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/update-article',
        name: '更新文章',
        component: () => import('../views/Update-Article.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    }
    ,
    {
        path: '/All-Category',
        name: '所有分类',
        component: () => import('../views/All-Category.vue')
    }
    , {
        path: '/All-Articles',
        name: '所有文章',
        component: () => import('../views/All-Articles.vue')
    },
    {
        path: '/Article',
        name: '文章',
        component: () => import('../views/Article.vue')
    },
    {
        path: '/Category',
        name: '分类',
        component: () => import('../views/Category.vue')
    },
    {
        path: '/Tag',
        name: '标签',
        component: () => import('../views/Tag.vue')
    },
    {
        path: '/Editor-Article',
        name: '编辑文章',
        component: () => import('../views/Editor-Article.vue')
    },
    {
        path: '/Article-Context/:id',
        name: '文章内容',
        component: () => import('../views/Article-Context.vue')
    },
    {
        path: '/register',
        name: '注册',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/userinfo',
        name: '用户信息',
        component: () => import('../views/Userinfo.vue'),
        children: [
            {
                path:'/',
                name:'基本信息',
                component: () => import('../components/UserInfo/UserBasicInfo.vue')
            },
            {
                path:'/bind-email',
                name:'绑定邮箱',
                component: () => import('../components/UserInfo/BindEmail.vue')
            },
            {
                path: '/change-password',
                name: '修改密码',
                component: () => import('../components/UserInfo/ChangePassword.vue')
            },
            {
                path: "/Custom-Settings",
                name: "自定义设置",
                component: () => import('../components/UserInfo/CustomSettings.vue')
            }
        ]
    },
    {
        path: '/*',
        name: '404',
        component: () => import('../views/404.vue')
    }


]

const router = new VueRouter({
    mode: 'history',
    routes
})

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


router.afterEach((to, from, next) => {
    document.documentElement.scrollTop = 0;
})


export default router
