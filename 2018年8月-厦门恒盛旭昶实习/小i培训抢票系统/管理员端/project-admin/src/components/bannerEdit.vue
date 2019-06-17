<template>
  <div class="admin">
    <el-container>
      <el-aside style="width: 290px;  text-align:left;">
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
            <el-menu default-active="4" class="el-menu-vertical-demo">
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
              <el-breadcrumb-item>主页轮播图管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!--添加框-->
          <div style="margin-top: 40px; padding:16px; text-align: left;width: 90%;margin-left: auto;margin-right: auto">
            <el-button type="success"  size="small" icon="el-icon-plus" @click="newPicture">添加图片</el-button>
          </div>
          <div style="margin-top: 10px">
            <el-table :data="tableData" fit border stripe style="width: 90%;margin-left: auto;margin-right: auto">
              <el-table-column prop="ID" label="ID" sortable width="150px"></el-table-column>
              <el-table-column prop="picture" label="图片" width="300px">
                <template slot-scope="scope" >
                  <img :src="scope.row.picture" style="height: 180px;width: 270px"/>
                </template>
              </el-table-column>
              <el-table-column prop="position" label="顺位" width="150px" sortable></el-table-column>
              <el-table-column prop="link" label="链接" width="250px" sortable></el-table-column>
              <el-table-column label="操作" width="">
                <template slot-scope="scope">
                  <el-button type="danger" size="small" @click="confirmDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <el-dialog title="新建图片" :visible.sync="newdialogFormVisible" width="40%">
            <el-form :model="pictureForm">
              <el-form-item label="图片" :label-width="formLabelWidth">
                <el-upload
                  class="upload-demo"
                  action="/kjxt/admin/mainPicture"
                  :data="pictureData"
                  ref="upload"
                  limit=1
                  :on-change="handleChange"
                  :on-remove="backChange"
                  :on-error="errorChange"
                  :auto-upload="false"
                  list-type="picture-card">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">图片长宽比为3：2最为适宜</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="顺位" :label-width="formLabelWidth" required>
                <el-input v-model="pictureForm.newPosition" auto-complete="off" ></el-input>
              </el-form-item>
              <el-form-item label="所跳转链接" :label-width="formLabelWidth" required>
                <el-input v-model="pictureForm.newLink" auto-complete="off" ></el-input>
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
    name: "admin",
    data() {
      return {
        //图片表格中数据
        tableData:[{
          ID:'',
          picture:'',
          position:'',
          link:'',
        }],

        //新建框是否可见
        newdialogFormVisible: false,

        formLabelWidth: '120px',
        pictureForm: {newPosition:'',newLink:''},//图片表单内数据
        pictureData:{orderid:"",des:""},//图片附带数据
      }
    },

    created(){
        this.loadMainPage();
    },

    methods: {

       //加载主页信息
      loadMainPage:function() {
        let _this=this;

        this.$axios({
          method:'get',
          url:'/admin/getMainPic',

        }).then(function (response) {
          console.log(response.data);
          _this.$data.tableData = [];
          for(var i=0;i<response.data.length;i++){
            var newItem={
              ID:response.data[i].photoid,
              picture:response.data[i].photo,
              position:response.data[i].orderid,
              link:response.data[i].des,
            };
            _this.$data.tableData.push(newItem);
          }
        }).catch(function (error) {
          console.log(error.response.data)
        })
      },

      //删除时弹框确定
      confirmDelete:function(index, row){
        let _this=this;
        this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //let newIndex=index+((_this.$data.currentPage-1)*(_this.$data.pageSize));//分页要换算当前Index
          this.handleDelete(index,row);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //删除一张图片
      handleDelete:function (index, row) {
        let _this=this;
        let photoID=parseInt(row.ID);
        _this.$axios({
          method:'get',
          url:'/admin/deleteMainPicture?photoid='+photoID,
        }).then(function (response) {
          console.log(response.data);
          _this.tableData.splice(index,1);
        }).catch(function (error) {
          console.log(error.response.data)
        })
      },

      //新建一张图片
      newPicture:function (){
        let _this=this;
        _this.$data.newdialogFormVisible = true;
      },

      //新建后的确定
      confirmNew:function (){
        this.$confirm('确定要加该图片吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let _this=this;
          var position=_this.$data.pictureForm.newPosition;
          var link=_this.$data.pictureForm.newLink;
          for(var i=0;i<_this.$data.tableData.length;i++){
            if(_this.$data.tableData[i].position===position){
              alert("有顺位重复的图片,请检查");
              return;
            }
          }
          _this.pictureData.orderid=position;
          _this.pictureData.des=link;
          console.log("pictureData:"+_this.pictureData);
          _this.$refs.upload.submit();//提交图片和相应id
          var newItem={ID:"",picture:"",position:position,link:link};
          _this.$data.tableData.unshift(newItem);//在表格中加入数据
          _this.$data.newdialogFormVisible = false;//将新建框隐藏
          _this.$message({
            type: 'success',
            message: '成功加入该图片!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消加图或加图出错'
          });
        });
      },

      //上传前限制文件大小和格式
      beforeAvatarUpload(file){
        console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!');
        }
        return isJPG && isLt2M;
      },

      //上传文件后隐藏上传框
      handleChange(event,file, fileList) {
        var divset = document.getElementsByClassName("el-upload el-upload--picture-card");
        for (var i = 0; i<divset.length;i++) {
          divset[i].style.display="none";
        };
      },

      //删除文件后显示上传框
      backChange(file, fileList) {
        var divset = document.getElementsByClassName("el-upload el-upload--picture-card");
        for (var i = 0; i<divset.length;i++) {
          divset[i].style.display="block";
          divset[i].style.margin="auto";
        };
      },

      //上传失败后显示上传框
      errorChange(err,file, fileList) {
        var divset = document.getElementsByClassName("el-upload el-upload--picture-card");
        for (var i = 0; i<divset.length;i++) {
          divset[i].style.display="block";
          divset[i].style.margin="auto";
        };
      },
    }

  }
</script>

<style scoped>
  .admin{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
