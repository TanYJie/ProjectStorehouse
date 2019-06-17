import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/components/admin'
import adminOrder from '@/components/adminOrder'
import activityEdit from '@/components/activityEdit'
import sellerManage from '@/components/sellerManage'
import sellerEdit from '@/components/sellerEdit'
import bannerEdit from '@/components/bannerEdit'
import entrance from '@/components/entrance'

Vue.use(Router)

export default new Router({
  routes: [
    { //管理员管理商品页面
      path: '/',
      name: 'sellerManage',
      component: sellerManage
    },
    {
      path:'/sellerEdit',
      name:"sellerEdit",
      component:sellerEdit
    },
    // { //管理员管理订单页面
    //   path: '/adminOrder',
    //   name: 'adminOrder',
    //   component: adminOrder
    // },
    { //管理员管理活动说明页面
      path: '/activityEdit',
      name: 'activityEdit',
      component: activityEdit
    },
    { //管理员管理主页轮播图页面
      path: '/bannerEdit',
      name: 'bannerEdit',
      component: bannerEdit
    },
    {
      path: '/entrance',
      name: 'entrance',
      component: entrance
    }

  ]
})
