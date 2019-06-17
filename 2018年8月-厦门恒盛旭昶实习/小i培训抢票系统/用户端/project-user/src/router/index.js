import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HelloFromVux'
import ConfirmOrder from '@/components/ConfirmOrder'
import SuccessPage from '@/components/SuccessPage'
import sellTemplate from '@/components/sellTemplate'
import MySelf from '@/components/MySelf'
import MyShare from '../components/MyShare'
import OtherShare from '@/components/OtherShare'
import Home1 from '@/components/test'

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   component: Home
    // },
    {
      path: '/',
      component: Home1
    },
    {
      path:'/sellTemplate',
      name:'sellTemplate',
      component:sellTemplate
    },
    {
      path:'/ConfirmOrder',
      name: 'ConfirmOrder',
      component:ConfirmOrder
    },
    {
      path:'/SuccessPage',
      component:SuccessPage,
    },
    {
      path:'/MySelf',
      name:'MySelf',
      component:MySelf,
    },
    {
      path:'/MyShare',
      name:'MyShare',
      component:MyShare,
    },
    {
      path:'/OtherShare',
      name:'OtherShare',
      component:OtherShare,
    },
  ]
})
