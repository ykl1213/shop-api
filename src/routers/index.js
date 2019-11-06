import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import axios from 'axios'
import Users from '../components/Users.vue'
import Roles from '../components/Rolue.vue'
import Rights from '../components/Rights.vue'

Vue.use(VueRouter)
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.interceptors.request.use(function (config) {
  if (config.url !== 'login') {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  if (response.data.meta.status === 401) {
    localStorage.removeItem('token')
  }
  return response.data
}, function (error) {
  return Promise.reject(error)
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },
    { path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})

export default router
