import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import GoodsList from '@/components/PersonalGoods/GoodsList'
import Chat from '@/components/Chat/Chat'
import Login from '@/components/Login'
import Person from '@/components/PersonalInfo/Person'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {path:'/GoodsList',component:GoodsList},
        {path:'/Chat',component:Chat},
        {path:'/Person',component:Person},
      ],
    },
  ]
})
