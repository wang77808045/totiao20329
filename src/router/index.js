import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout'
import Home from '@/views/home'
import Article from '@/views/article'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        // 首页
        path: '',
        component: Home
      },
      {
        // 文章列表
        path: '/article',
        component: Article
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

// 安插路由拦截器
router.beforeEach((to, from, next) => {
  // console.log('所有路由跳转经过这里')

  // 1.登录页面直接放行
  if (to.path === '/login') {
    next()
    return
  }

  // 2.非登录页面 ，需要校验

  const token = window.sessionStorage.getItem('user')

  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
