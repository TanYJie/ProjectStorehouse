<template>
  <div class="modifyStudent">
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
                  <el-menu-item index="1-1">
                    <template slot="title">
                      <span style="font-size: 16px">管理教师信息</span>
                    </template>
                  </el-menu-item>
                </router-link>
                <router-link to="/student" style="text-decoration: none">
                  <el-menu-item index="1-2" style="background-color: #E9EEF3">
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
              <el-breadcrumb-item :to="{ path: '/student' }">学生信息管理</el-breadcrumb-item>
              <el-breadcrumb-item>编辑学生信息</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div id="information" v-loading="formLoading">
            <div style="margin-top: 10px">
              <span class="formSpan">学号：</span>
              <el-input v-model="formAccount" :placeholder="formAccountPlaceholder" class="formInput" auto-complete="off"></el-input>
            </div>
            <div style="margin-top: 20px">
              <span class="formSpan">学生姓名：</span>
              <el-input v-model="formName" :placeholder="formNamePlaceholder" class="formInput" auto-complete="off"></el-input>
            </div>
            <div style="margin-top: 20px">
              <span class="formSpan">电子邮箱：</span>
              <el-input v-model="formEmail" :placeholder="formEmailPlaceholder" class="formInput" auto-complete="off"></el-input>
            </div>
          </div>
          <div style="width: 88%;min-width: 700px">
            <div style="width: 300px;margin:40px auto 0 auto;">
              <el-button type="primary" @click="confirmEdit" style="margin-right: 15px">
                  修改  <i class="el-icon-circle-check-outline"></i>
              </el-button>
              <router-link to="/student">
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
    name: "modifyStudent",
    components:{
      myTopMenu
    },
    data() {
      return {
        openString:'1-2',
        openArray:['1'],
        formLoading:true,

        formId:'',
        formAccount:'',
        formName:'',
        formEmail:'',
        formAccountPlaceholder:'',
        formNamePlaceholder:'',
        formEmailPlaceholder:'',
      }
    },

    created(){
      // if(app.methods.getCookie("IsAdminister")==="")
      //   this.CheckSecretNumber();
      // else
      this.loadStudent();
    },

    methods: {

      loadStudent:function () {
        let _this=this;
        var studentId=_this.$route.query.studentId;
        var studentAccount=_this.$route.query.studentAccount;
        var studentName=_this.$route.query.studentName;
        var studentEmail=_this.$route.query.studentEmail;
        _this.$data.formId=studentId;
        _this.$data.formAccount=studentAccount;
        _this.$data.formAccountPlaceholder=studentAccount;
        _this.$data.formName=studentName;
        _this.$data.formNamePlaceholder=studentName;
        _this.$data.formEmail=studentEmail;
        _this.$data.formEmailPlaceholder=studentEmail;
        _this.$data.formLoading=false;
      },

      alertMes:function(message){
        let _this=this;
        _this.$alert(message, '注意', {
          confirmButtonText: '确定',
          type:'warning',
          callback: action => {}
        });
      },

      checkValue:function(){
        let _this=this;
        if(_this.$data.formAccount.toString()===""){
          _this.alertMes('学号不能为空！');
          return false;
        }
        if(_this.$data.formName.toString()===""){
          _this.alertMes('姓名不能为空！');
          return false;
        }
        var reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
        if(reg.test(_this.$data.formEmail)==false){
          _this.alertMes("请输入正确的邮箱格式！");
          return false;
        }
        return true;
      },

      confirmEdit:function () {
        let _this=this;
        if(!_this.checkValue()){
          return;
        }
        _this.$axios({
          method:'put',
          url:'/student/'+parseInt(_this.$data.formId)+'/information',
          header:{
            contentType:'application/json'
          },
          data:{
            studentName:_this.$data.formName,
            account:_this.$data.formAccount,
            email:_this.$data.formEmail,
          }
        }).then(function (response) {
          _this.$alert('您的修改已成功生效', '操作成功', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }).catch(function (error) {
          console.log(error.response);
          _this.$message({
            type: 'error',
            message: '修改失败!'
          });
        })
      },
    }
  }
</script>

<style scoped>
  @import '../public/css/modifyStudent.css';
</style>
