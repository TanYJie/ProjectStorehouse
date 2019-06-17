// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'

import Login from './components/HelloWorld'
import Home from './components/HelloFromVux'
import ConfirmOrder from './components/ConfirmOrder'
import SuccessPage from './components/SuccessPage'
import wxConfig from './components/wxConfig'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { WechatPlugin } from 'vux'
import  { ConfirmPlugin } from 'vux'


Vue.prototype.$http = axios;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(WechatPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/Login',
  //   component: Login
  // },
  {
    path: '/',
    component: Home
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
  // {
  //   path:'/',
  //   component:wxConfig,
  // },
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  created(){
    //axios.defaults.baseURL='http://172.27.65.52:8081'
    axios.defaults.baseURL='/kjxt/'
  },
}).$mount('#app-box')
