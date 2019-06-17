<template>
  <div class="student">
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
          <div style="margin-top:20px;margin-left: 30px;width: 300px">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px">
              <el-breadcrumb-item :to="{ path: '/student' }">管理员</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/student' }">学生信息管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!--查找框-->
          <div id="search">
            <el-form :inline="true" :model="formInline" label-width="100px" style="height:45px" >
              <el-form-item style="margin-left: 40px">
                <el-input prefix-icon="el-icon-search" v-model="formInline.name" placeholder="请输入学号/姓名"></el-input>
              </el-form-item>
              <el-form-item style="width:100px;margin-left: 20px">
                <el-button type="primary" size="small" @click="searchByName(formInline.name)">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div id="listText">
            <span style="font-weight: bold;font-size: 24px">学生列表</span>
          </div>
          <div class="line"></div>

          <!--表格数据-->
          <div>
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                      max-height="410" height="410" border fit stripe
                      v-loading="tableLoading"
                      id="myTable">
              <el-table-column prop="account" label="学号" min-width="200px" align="center" sortable></el-table-column>
              <el-table-column prop="name" label="姓名" min-width="200px" align="center" sortable></el-table-column>
              <el-table-column prop="email" label="电子邮箱" min-width="200px" align="center"></el-table-column>
              <el-table-column width="220px" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" icon="el-icon-edit"
                             @click="handleEdit(scope.$index, scope.row)"></el-button>
                  <el-button type="success" size="small" icon="el-icon-refresh"
                             @click="confirmReset(scope.$index, scope.row)"></el-button>
                  <el-button type="danger" size="small" icon="el-icon-delete"
                             @click="confirmDelete(scope.$index, scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>

            <div style="margin-top: 20px; ">
              <el-pagination
                :total="totalSize"
                @current-change="currentChange"
                :page-size="pageSize"
                layout="prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>


        </div>

      </el-main>
    </el-container>


  </div>
</template>

<script>
  const SecretNumber="why123456";
  import app from "../App";
  import myTopMenu from "./topMenu"

  export default {
    name: "teacher",
    components:{
      myTopMenu,
    },
    data() {
      return {
        openString:'1-2',
        openArray:['1'],
        search:'',
        tableLoading:true,
        //表格数据
        tableData:[],

        //查找框内数据
        formInline: {
          name:''
        },

        //编辑表单内数据
        form: {
          formName:'',
          formPrice:'',
          formText:'',
        },
        formLabelWidth: '120px',

        //新建表单内数据
        newform: {
          newName:'',
          newPrice:'',
          newText:'',
        },

        //当前正在编辑的Index
        currentIndex:'',

        //图片数据
        pictureData:{name:''},

        //分页数据
        pageSize:6,
        totalSize:100,
        currentPage:1,//默认开始页面
      }
    },

    created(){
      // if(app.methods.getCookie("IsAdminister")==="")
      //   this.CheckSecretNumber();
      // else
      this.loadAllStudent();
    },

    methods: {

       //加载所有学生
      loadAllStudent:function() {
        let _this=this;
        this.$axios({
          method:'get',
          url:'/student',
        }).then(function (response) {
          console.log(response.data);
          _this.$data.tableData = [];
          for(var i=0;i<response.data.length;i++){
            var newItem={
              id:response.data[i].id,
              account:response.data[i].account,
              name:response.data[i].studentName,
              email:response.data[i].email,
            };
            _this.$data.tableData.push(newItem);
          }
          _this.$data.totalSize=parseInt(response.data.length);
          _this.$data.tableLoading=false;
        }).catch(function (error) {
          console.log(error.response.data)
        })
      },

      //删除时弹框确定
      confirmDelete:function(index, row){
        let _this=this;
        this.$confirm('此操作将永久删除该账号, 是否继续?', '删除账号', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let newIndex=index+((_this.$data.currentPage-1)*(_this.$data.pageSize));//分页要换算当前Index
          _this.$message({
            type: 'success',
            message: '删除成功'
          });
          _this.handleDelete(newIndex,row);
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //删除一个学生账号
      handleDelete:function (index, row) {
        var userId=row.id.toString();
        let _this=this;
        this.$axios({
          method:'delete',
          url:'/student/'+userId,
          contentType:'application/json;charset=UTF-8',
        }).then(function (response) {
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
          _this.tableData.splice(index,1);
        }).catch(function (error) {
          console.log(error.response);
          _this.$message({
            type: 'error',
            message: '删除失败!'
          });
        })
      },

      //重置时弹框确定
      confirmReset:function(index, row){
        let _this=this;
        var teacherName=row.name;
        this.$confirm('确定要重置 '+teacherName+' 的密码吗?', '重置密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let newIndex=index+((_this.$data.currentPage-1)*(_this.$data.pageSize));//分页要换算当前Index
          this.handleReset(newIndex,row);
        }).catch(() => {

        });
      },

      //重置密码
      handleReset:function (index, row) {
        var userId=row.id.toString();
        let _this=this;
        this.$axios({
          method:'put',
          url:'/student/'+userId+'/password',
          contentType:'application/json;charset=UTF-8',
        }).then(function (response) {
          _this.$alert(row.name+' 的初始密码被重置为 123456', '操作成功', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }).catch(function (error) {
          console.log(error.response.data);
          _this.$message({
            type: 'error',
            message: '重置失败!'
          });
        })
      },

      //编辑一个学生
      handleEdit:function (index, row){
        let _this=this;
        _this.$router.push({
          path:'/modifyStudent',
          query:{
            studentId:row.id,
            studentAccount:row.account,
            studentName:row.name,
            studentEmail:row.email
          }
        });
      },

      //根据名字或教师ID搜索学生
      searchByName:function(name){
        let _this=this;
        _this.$data.tableLoading=true;
        this.$axios({
          method:'get',
          url:'/student/searchstudent?identity='+name,
        }).then(function (response) {
          console.log(response.data);
          _this.$data.tableData = [];
          for(var i=0;i<response.data.length;i++){
            var newItem={
              id:response.data[i].id,
              account:response.data[i].account,
              name:response.data[i].studentName,
              email:response.data[i].email,
            };
            _this.$data.tableData.push(newItem);
          }
          _this.$data.tableLoading=false;
          _this.$data.totalSize=parseInt(response.data.length);
        }).catch(function (error) {
          console.log(error.response.data)
        })
      },

      //换页触发的函数
      currentChange:function(currentPage){
        this.currentPage = currentPage;
      }
    }

  }
</script>

<style scoped>
  @import '../public/css/student.css';
</style>
