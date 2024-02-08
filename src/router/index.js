import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  }
]

const router = new VueRouter({
  routes
})


// 路由守卫
router.beforeEach((to, from, next) => {

  next();
});


export default router
