<template>
  <div class="top">
      <div id="topMenu">
        <img src="../assets/系统.png" class="topMenuImg" style="margin-left: 25px"/>
        <img src="../assets/title.png" class="topMenuImg"/>
        <div class="topMenuRightText" v-on:click="exitToLogin()" style="cursor: pointer">注销</div>
        <div class="topMenuRight" v-on:click="exitToLogin()">
          <img src="../assets/注销.png" style="height: 30px;cursor: pointer" onclick="exitToLogin()"/>
        </div>
      </div>
      <div class="line"></div>

  </div>
</template>

<script>
  import app from "../App";
  export default {
    name: "top",
    data() {
      return {

      }
    },
    created(){

    },
    methods: {
      exitToLogin() {
        let _this=this;
        _this.$confirm('确定要退出吗?', '翻转课堂管理系统', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          _this.$router.push("./");
        }).catch(() => {

        });
      }

    }

  }
</script>

<style scoped>
  @import '../public/css/topMenu.css';
</style>
