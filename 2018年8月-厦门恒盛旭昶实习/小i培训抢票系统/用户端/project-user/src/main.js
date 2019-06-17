// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import axios from 'axios'
import { WechatPlugin } from 'vux'
import  { ConfirmPlugin } from 'vux'
import App from './App'
import Home from './components/HelloFromVux'
import ConfirmOrder from './components/ConfirmOrder'
import SuccessPage from './components/SuccessPage'
import sellTemplate from './components/sellTemplate'
import router from './router'

//发送请求带cookie
axios.defaults.withCredentials=true;

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(WechatPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path:'/sellTemplate',
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
];

// const router = new VueRouter({
//   routes
// });

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  created(){
    //axios.defaults.baseURL='http://172.27.65.52:8081/kjxt'
    axios.defaults.baseURL='/kjxt/'
  },
}).$mount('#app-box')
