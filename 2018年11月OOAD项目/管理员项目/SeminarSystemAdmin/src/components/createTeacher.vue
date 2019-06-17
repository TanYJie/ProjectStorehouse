<template>
  <div class="createTeacher">
    <my-top-menu></my-top-menu>

    <el-container>
      <el-aside style="width: 270px;text-align:left;">
        <div style="display: block; left: 0;width: 250px; height:100%">
          <div style="height:100%">
            <el-menu :default-active="openString" :default-openeds="openArray" class="el-menu-vertical-demo" style="height:100%">
              <el-submenu index="1">
                <template slot="title">
                  <img src="../assets/信息.png" style="width: 30px"/>
                  <span style="font-size: 18px">&nbsp;&nbsp;信息管理</span>
                </template>
                <router-link to="/teacher" style="text-decoration: none">
                  <el-menu-item index="1-1" style="background-color: #E9EEF3">
                    <template slot="title">
                      <span style="font-size: 16px">管理教师信息</span>
                    </template>
                  </el-menu-item>
                </router-link>
                <router-link to="/student" style="text-decoration: none">
                  <el-menu-item index="1-2">
                    <template slot="title">
                      <span style="font-size: 16px">管理学生信息</span>
                    </template>
                  </el-menu-item>
                </router-link>
              </el-submenu>
            </el-menu>

          </div>
        </div>
      </el-aside>

      <el-main>
        <div>
          <div style="margin-top:20px;margin-left: 30px;width: 400px;">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
              <el-breadcrumb-item :to="{ path: '/teacher' }">管理员</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/teacher' }">教师信息管理</el-breadcrumb-item>
              <el-breadcrumb-item>创建教师账户</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div id="information">
            <div style="margin-top: 10px">
              <span class="formSpan">教师姓名：</span>
              <el-input v-model="formName" class="formInput" auto-complete="off"></el-input>
            </div>
            <div style="margin-top: 20px">
              <span class="formSpan">教工号：</span>
              <el-input v-model="formAccount" class="formInput" auto-complete="off"></el-input>
            </div>
            <div style="margin-top: 20px">
              <span class="formSpan">电子邮箱：</span>
              <el-input v-model="formEmail" class="formInput" auto-complete="off"></el-input>
            </div>
            <div style="margin-top: 20px">
              <span class="formSpan">初始密码：</span>
              <el-input v-model="formPassword" class="formInput" auto-complete="off"></el-input>
            </div>
          </div>
          <div style="width: 88%;min-width: 700px">
            <div style="width: 300px;margin:40px auto 0 auto;">
              <el-button type="success" @click="checkValue" style="margin-right: 15px">
                创建  <i class="el-icon-circle-check-outline"></i>
              </el-button>
              <router-link to="/teacher">
                <el-button>
                  取消 <i class="el-icon-circle-close-outline"></i>
                </el-button>
              </router-link>
            </div>
          </div>
        </div>

      </el-main>
    </el-container>


  </div>
</template>

<script>
  import app from "../App";
  import myTopMenu from "./topMenu"

  export default {
    name: "createTeacher",
    components:{
      myTopMenu
    },
    data() {
      return {
        openString:'1-1',
        openArray:['1'],

        formAccount:'',
        formName:'',
        formEmail:'',
        formPassword:'',

      }
    },

    methods: {

      checkValue(){
        let _this=this;
        if(_this.$data.formAccount.toString()===""){
          _this.$alert('教工号不能为空!', '注意', {
            confirmButtonText: '确定',
            callback: action => {}
          });
          return;
        }
        if(_this.$data.formName.toString()===""){
          _this.$alert('姓名不能为空!', '注意', {
            confirmButtonText: '确定',
            callback: action => {}
          });
          return;
        }
        if(_this.$data.formPassword.toString()===""){
          _this.$alert('初始密码不能为空!', '注意', {
            confirmButtonText: '确定',
            callback: action => {}
          });
          return;
        }
        _this.$confirm('确定要创建 '+_this.$data.formName+' 的账号吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          _this.confirmCreate();
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消创建'
          });
        });

      },

      confirmCreate:function () {
        let _this=this;
        _this.$axios({
          method:'post',
          url:'/teacher',
          header:{
            contentType:'application/json'
          },
          data:{
            account:_this.$data.formAccount,
            password:_this.$data.formPassword,
            teacherName:_this.$data.formName,
            email:_this.$data.formEmail,
          }
        }).then(function (response) {
          _this.$alert('您成功创建 '+_this.$data.formName+' 的账号', '操作成功', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }).catch(function (error) {
          console.log(error.response);
          _this.$message({
            type: 'error',
            message: '创建失败,已存在该教师'
          });
        })
      }
    }
  }
</script>

<style scoped>
  @import '../public/css/createTeacher.css';
</style>
