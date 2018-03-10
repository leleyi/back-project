import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import GoodsList from '@/components/PersonalGoods/GoodsList'
import Chat from '@/components/Chat/Chat'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {path:'/GoodsList',component:GoodsList,},
        {path:'/Chat',component:Chat},
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      hidden: true
    },
  ]
})
