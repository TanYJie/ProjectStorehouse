<template>
  <div class="sellerManage">
    <el-container>
      <el-aside style="width: 290px;text-align:left;">
        <div style="display: block; position: fixed; left: 0px;width: 290px; height:100%">
          <div style="">
            <el-menu
              class="el-menu-demo"
              mode="horizontal"
              text-color="#FFFFFF"
              background-color="#409EFF"
              collapse-transition
              active-text-color="#ffd04b">
              <el-menu-item index="1">Logo</el-menu-item>
              <el-menu-item index="2">管理界面</el-menu-item>
              <el-menu-item index="3"><router-link to="/entrance" style="text-decoration: none">返回</router-link></el-menu-item>
            </el-menu>
          </div>

          <div style="height:100%">
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <router-link to="/" style="text-decoration: none">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title" style="align:left">商家管理</span>
                </el-menu-item>
              </router-link>
              <router-link to="/sellerEdit" style="text-decoration: none">
                <el-menu-item index="2">
                  <i class="el-icon-setting"></i>
                  <span slot="title">商家详情管理</span>
                </el-menu-item>
              </router-link>
              <router-link to="/activityEdit" style="text-decoration: none">
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">活动说明管理</span>
                </el-menu-item>
              </router-link>
              <router-link to="/bannerEdit" style="text-decoration: none">
                <el-menu-item index="4">
                  <i class="el-icon-menu"></i>
                  <span slot="title" style="align:left">主页轮播图管理</span>
                </el-menu-item>
              </router-link>
            </el-menu>
          </div>
        </div>
      </el-aside>

      <el-main>
        <div>
          <div style="margin-top:20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">管理员</el-breadcrumb-item>
              <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!--添加框-->
          <div style="margin-top: 20px; padding:16px; text-align: left;">
                <el-button type="success"  size="small" icon="el-icon-plus" @click="handleNew">添加商家</el-button>
          </div>

          <!--表格数据-->
          <div style="margin-top: 10px">
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" fit border stripe style="width: 100%" max-height="450" height="450" >
              <el-table-column prop="shopID" label="商家ID" sortable width="300px"></el-table-column>
              <el-table-column prop="type" label="商家所属大类" sortable width="300px"></el-table-column>
              <el-table-column prop="name" label="商家名" width="300px" sortable></el-table-column>
              <!--<el-table-column prop="introduce" label="商家简介" width=""></el-table-column>-->
              <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button size="small" @click="editShop(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="confirmDelete(scope.$index, scope.row)">删除</el-button>
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

          <el-dialog title="新建商家" :visible.sync="newdialogFormVisible" width="30%" style="text-align: left;">
            <el-form :model="newform">
              <el-form-item label="商家所属大类" :label-width="formLabelWidth">
                <el-select v-model="newform.newType" placeholder="请选择商家类别">
                  <el-option label="艺术培训" value="3"></el-option>
                  <el-option label="驾校培训" value="2"></el-option>
                  <el-option label="语言培训" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商家名称" :label-width="formLabelWidth">
                <el-input v-model="newform.newName" auto-complete="off" style="width: 210px"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirmNew">确 定</el-button>
              <el-button @click="newdialogFormVisible = false">取 消</el-button>
            </div>
          </el-dialog>

        </div>

      </el-main>
    </el-container>


  </div>
</template>

<script>
  const SecretNumber="why123456";
  import app from "../App";

  export default {
    name: "sellerManage",
    data() {
      return {
        //表格数据
        tableData:[{
          shopID:'',
          type:'',
          name:'',
        }],

        //查找框内数据
        formInline: {
          name:''
        },

        //编辑框是否可见
        dialogFormVisible: false,
        //新建框是否可见
        newdialogFormVisible: false,

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
          newType:'',
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
      if(app.methods.getCookie("IsAdminister")==="")
        this.CheckSecretNumber();
      else
        this.loadAllShops();
    },

    methods: {

      //加载所有商店
      loadAllShops:function() {
        let _this=this;
        this.$axios({
          method:'get',
          url:'/mainPage/pageInitial',
        }).then(function (response) {
          console.log(response.data);
          _this.$data.tableData = [];
          let res=response.data;
          _this.$data.totalSize=parseInt(res.length);
          for(var i=0;i<res.length;i++){
            for(var j=0;j<res[i].shops.length;j++){
              var newItem={shopID:res[i].shops[j].shopid,type:res[i].name,name:res[i].shops[j].name};
              _this.$data.tableData.push(newItem);
            }
          }
        }).catch(function (error) {
          console.log(error.response.data)
        })
      },

      //删除时弹框确定
      confirmDelete:function(index, row){
        let _this=this;
        let id=row.shopID;
        this.$confirm('此操作将永久删除该商家及其所有相关信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method:'get',
            url:'/admin/deleteShop?shopid='+id,
            contentType:'application/json;charset=UTF-8',
          }).then(function (response) {
            console.log(response.data);
            let newIndex=index+((_this.$data.currentPage-1)*(_this.$data.pageSize));//分页要换算当前Index
            _this.tableData.splice(newIndex,1);
            _this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(function (error) {
            console.log(error.response.data)
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //编辑一个商家时调到该商家页面
      editShop:function(index,row){
        let _this=this;
        let ID=row.shopID;
        console.log("currentShopID:"+ID);
        localStorage.setItem("shopID",ID);
        this.$router.push('/sellerEdit');//返回到主页面
      },

      //新建一个商家
      handleNew:function (){
        let _this=this;
        _this.$data.newdialogFormVisible = true;
      },

      //新建后的确定
      confirmNew:function (){
        this.$confirm('确定要创建该商家吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let _this=this;
          let name=_this.$data.newform.newName;
          let shopType=parseInt(_this.$data.newform.newType.toString());

          _this.$axios({
            method:'post',
            url:'/admin/newShop',
            headers:{
              'Content-Type':'application/json;'
            },
            data: {
              name:name,
              shoptype:shopType,
            },
          }).then(function (response) {
            console.log(response.data);
            var newItem={shopID:"",name:name,type:shopType};
            _this.$data.tableData.unshift(newItem);//在表格中加入数据
            _this.$data.newdialogFormVisible = false;//将新建框隐藏
          }).catch(function (error) {
            console.log(error.response.data);
          });
          this.$message({
            type: 'success',
            message: '成功创建该商家!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消创建或创建出错'
          });
        });
      },

      //输入密码
      CheckSecretNumber(){
        let _this=this;
        this.$prompt('请输入管理员密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value===SecretNumber)
          {
            _this.$message({
              type: 'success',
              message: '登录成功',
            });

            _this.IsLogin=true;
            _this.loadAllShops();
            app.methods.addCookie("IsAdminister","true",0);
          }
          else
          {
            _this.$message({
              type: 'error',
              message: '口令错误，请重新输入',
            });
            _this.CheckSecretNumber();
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已返回首页'
          });
          _this.CheckSecretNumber();
          this.$router.push('/');
        });
      },

      //换页触发的函数
      currentChange:function(currentPage){
        this.currentPage = currentPage;
      }
    }

  }
</script>

<style scoped>
  .sellerManage{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
