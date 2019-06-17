import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import admin from '@/components/admin'
import adminOrder from '@/components/adminOrder'
import activityEdit from '@/components/activityEdit'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    { //管理员管理商品页面
      path: '/admin',
      name: 'admin',
      component: admin
    },
    { //管理员管理订单页面
      path: '/adminOrder',
      name: 'adminOrder',
      component: adminOrder
    },
    { //管理员管理活动说明页面
      path: '/activityEdit',
      name: 'activityEdit',
      component: activityEdit
    },

  ]
})
