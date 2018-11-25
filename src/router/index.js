import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import User from '@/components/user'
import Search from '@/components/search'
import Marked from '@/components/marked'
import Login from '@/components/login'
import Info from '@/components/info'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/info',
      name: "数据",
      component: Info
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/user',
      name: 'user',
      component:(localStorage.getItem("username") && localStorage.getItem("token")) ? User:Login
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/marked',
      name: 'marked',
      component: Marked
    }
  ]
})
