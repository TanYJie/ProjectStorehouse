// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import './assets/iconfont/iconfont.css'

//发送请求带cookie
axios.defaults.withCredentials=true;

Vue.prototype.$http = axios;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created(){
    axios.defaults.baseURL='http://47.94.174.82:8082/'
    //axios.defaults.baseURL='http://localhost:8081/'
    //axios.defaults.baseURL='http://vz5pri.natappfree.cc/'
  },
  components: { App },
  template: '<App/>'
});

