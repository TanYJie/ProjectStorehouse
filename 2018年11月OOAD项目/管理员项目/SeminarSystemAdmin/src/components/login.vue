<template>
  <div class="login">
      <div id="topMenu">
        <img src="../assets/系统.png" class="topMenuImg" style="margin-left: 25px"/>
        <img src="../assets/title.png" class="topMenuImg"/>
      </div>
      <div class="line"></div>
      <div id="loginDiv" v-loading="loginLoading">
        <p id="loginTitle">翻转课堂管理员登录</p>
        <div style="width: 300px;margin: 50px auto auto auto">
          <form action="http://47.94.174.82:8082/login" method="post">
            <el-input id="username" name="username" placeholder="用户名" v-model="loginName">
              <i slot="prefix" class="iconfont" style="display: inline-block">&#xe657;</i>
            </el-input>
            <el-input id="password" name="password" placeholder="密码" v-model="loginPassword" type="password" style="margin-top: 15px">
              <i slot="prefix" class="iconfont" style="display: inline-block">&#xe620;</i>
            </el-input>
            <el-button type="primary" native-type="submit" style="margin-top: 40px">
              <i class="iconfont" style="display: inline-block;margin:0 5px 0 0 !important;">&#xe636;</i>
              登录
            </el-button>
          </form>
        </div>
      </div>



  </div>
</template>

<script>
  import app from "../App";

  export default {
    name: "login",
    data() {
      return {
        loginLoading:false,
        loginName:'',
        loginPassword:'',
      }
    },

    created(){

    },

    methods: {
      //检测用户名和密码的填写是否合法
      checkLogin:function(){
        let _this=this;
        if(_this.$data.loginName===""){
          _this.$alert('请输入用户名', '出错啦', {
            type:"error",
            confirmButtonText: '确定',
          });
          return;
        }
        if(_this.$data.loginPassword===""){
          _this.$alert('请输入密码', '出错啦', {
            type:"error",
            confirmButtonText: '确定',
          });
          return;
        }
        _this.login();
      },

      //登录的ajax
      login:function () {
        let _this=this;
        _this.$data.loginLoading=true;
        var loginName=_this.$data.loginName;
        var loginPassword=_this.$data.loginPassword;
        _this.$axios({
          method:'post',
          url:'/login',
          data:{
            account:loginName,
            password:loginPassword
          },
        }).then(function (response) {
          _this.$data.loginLoading=false;
          if(response.data.success.toString()==="true"){
            _this.$router.push("/teacher");
          }
          else{
            _this.$alert('用户名或密码错误,请重新输入', '出错啦', {
              type:"error",
              confirmButtonText: '确定',
            });
          }
        }).catch(function (error) {
          console.log(error.response.data);
        })
      }
    }
  }
</script>

<style>
  @import '../public/css/login.css';
</style>
