import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const Layout = () => import('@/views/layout')
const Article = () => import('@/views/article')
const Publish = () => import('@/views/publish')
const Image = () => import('@/views/image')
const Comment = () => import('@/views/comment')
const Setting = () => import('@/views/setting')
const Fans = () => import('@/views/fans')
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
    }, {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    {
      path: '/image',
      name: 'image',
      component: Image
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/fans',
      name: 'fans',
      component: Fans
    }
    ]
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
