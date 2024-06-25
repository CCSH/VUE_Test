import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  //主路由
  {
    path: '/',
    component: Main,
    name: 'main',
    redirect: '/home',
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = new VueRouter({
  routes,
})

export default router
