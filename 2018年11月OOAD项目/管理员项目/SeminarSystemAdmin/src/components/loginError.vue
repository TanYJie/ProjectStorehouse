<template>
  <div class="login">
      <div id="topMenu">
        <img src="../assets/系统.png" class="topMenuImg" style="margin-left: 25px"/>
        <img src="../assets/title.png" class="topMenuImg"/>
      </div>
      <div class="line"></div>
      <div id="loginDiv" >
        <p id="loginTitle">翻转课堂管理员登录</p>
        <div style="width: 300px;margin: 50px auto auto auto">
          <div>
            <i class="el-icon-error"></i>
            账号或密码错误!
          </div>
          <router-link to="/">
            <el-button type="primary" @click="checkLogin()" style="margin-top: 40px">
              重新登录
            </el-button>
          </router-link>
        </div>
      </div>



  </div>
</template>

<script>
  import app from "../App";

  export default {
    name: "loginError",
    data() {
      return {

      }
    },

    created(){

    },

    methods: {

    }
  }
</script>

<style>
  @import '../public/css/login.css';
</style>
