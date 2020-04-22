import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    // redirect: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [{
      path: '',
      name: 'home',
      component: Home
    }]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
