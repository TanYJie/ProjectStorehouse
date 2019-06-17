import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/HelloFromVux'
import ConfirmOrder from '@/components/ConfirmOrder'
import SuccessPage from '@/components/SuccessPage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: main
    },
    {
      path: '/ConfirmOrder',
      name: 'ConfirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/SuccessPage',
      name: 'SuccessPage',
      component: SuccessPage
    },
  ]
})
