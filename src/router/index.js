import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
    ,{
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
