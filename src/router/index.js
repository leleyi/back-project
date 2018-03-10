import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import First from '@/components/First'
import Home from '@/components/Home'
import GoodsList from '@/components/PersonalGoods/GoodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {   path:'/GoodsList', component:GoodsList,}
      ]
    },
    {
      path:'/first',
      component:First
    },
  ]
})
