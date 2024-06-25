import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import Cookie from 'js-cookie'
import '@/assets/css/global.less'
import '@/assets/css/common.less'
import '@/utils/tool.js';

//全局引入
Vue.use(ElementUI)

Vue.config.productionTip = false

//添加全局守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if (!token && to.name !== 'login') {
    //未登录 不在登录页面 跳转登录
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    //登录了 去登录页面 跳转首页
    next({ name: 'home' })
  } else {
    next()
  }
})

//清空Cookie
Vue.prototype.cleanCookie = function () {
  var cookies = document.cookie.split(';')
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i]
    var position = cookie.indexOf('=')
    var name = position > -1 ? cookie.substr(0, position) : cookie
    var domain = window.location.hostname
    var path = '/'
    document.cookie =
      name +
      '=; expires=Thu, 01-Jan-70 00:00:01 GMT; domain=' +
      domain +
      '; path=' +
      path
  }
}

new Vue({
  router,
  store,
  data() {
    return {}
  },
  render: (h) => h(App),
  created() {
    //重新处理路由
    store.commit('handleRouter', router)
  },
}).$mount('#app')
