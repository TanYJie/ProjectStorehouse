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
              <el-menu-item index="3"><router-link to="/" style="text-decoration: none">返回</router-link></el-menu-item>
            </el-menu>
          </div>

          <div style="height:100%">
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <router-link to="/admin" style="text-decoration: none">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title" style="align:left">商品管理</span>
                </el-menu-item>
              </router-link>
              <router-link to="/sellerManage" style="text-decoration: none">
                <el-menu-item index="2">
                  <i class="el-icon-setting"></i>
                  <span slot="title">订单管理</span>
                </el-menu-item>
              </router-link>
              <router-link to="/activityEdit" style="text-decoration: none">
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">活动说明管理</span>
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
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!--查找框-->
          <div style="margin-top: 40px; padding:16px; background-color: #E9EEF3; text-align: left;">
            <el-form :inline="true" :model="formInline" label-width="100px" style="height:45px" >
              <el-form-item label="商品名称:" style="">
                <el-input v-model="formInline.name" size="small" ></el-input>
              </el-form-item>
              <el-form-item style="width:100px">
                <el-button type="primary" size="small" @click="searchByName(formInline.name)">搜索</el-button>
              </el-form-item>
              <el-form-item style="width:100px;float: right" >
                <el-button type="success"  size="small" icon="el-icon-plus" @click="handleNew">添加商品</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!--表格数据-->
          <div style="margin-top: 40px">
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"  max-height="500" height="500" fit border stripe style="width: 100%">
              <el-table-column prop="id" label="商品ID" width="100px" sortable></el-table-column>
              <el-table-column prop="name" label="商品名称" sortable></el-table-column>
              <el-table-column prop="picture" label="图片" >
                <template slot-scope="scope" >
                  <img :src="scope.row.picture" style="height: 80px;width: 120px"/>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="商品价格" sortable></el-table-column>
              <el-table-column prop="text" label="商品文本说明"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

          <el-dialog title="编辑商品信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
              <el-form-item label="商品ID" :label-width="formLabelWidth">
                <el-input v-model="form.formID" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.formName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input v-model="form.formPrice" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="说明文本" :label-width="formLabelWidth">
                <el-input v-model="form.formText" type="textarea" :rows="4" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirmEdit">确 定</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </el-dialog>

          <el-dialog title="新建商品" :visible.sync="newdialogFormVisible" width="40%">
            <el-form :model="newform">
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="newform.newName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-upload
                  class="upload-demo"
                  action="/xsyg/goods/goodsPicture"
                  :data="pictureData"
                  ref="upload"
                  limit=1
                  :on-change="handleChange"
                  :on-remove="backChange"
                  :on-error="errorChange"
                  :auto-upload="false"
                  list-type="picture-card">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过10MB</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="价格" :label-width="formLabelWidth">
                <el-input v-model="newform.newPrice" auto-complete="off" ></el-input>
              </el-form-item>
              <el-form-item label="商品文本说明" :label-width="formLabelWidth">
                <el-input v-model="newform.newText" type="textarea" :rows="4" auto-complete="off"></el-input>
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
        //表格数据
        tableData:[{
          id:'',
          name:'',
          picture:'',
          price:'',
          text:'',
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
          newPrice:'',
          newText:'',
        },

        //当前正在编辑的Index
        currentIndex:'',

        //图片数据
        pictureData:{name:''},

        //分页数据
        pageSize:4,
        totalSize:100,
        currentPage:1,//默认开始页面
      }
    },

    created(){
      if(app.methods.getCookie("IsAdminister")==="")
        this.CheckSecretNumber();
      else
        this.loadAllUsers();
    },

    methods: {

       //加载所有商品
      loadAllUsers:function() {
        let _this=this;

        this.$axios({
          method:'get',
          url:'/goods/getGoodsList',

        }).then(function (response) {
          console.log(response.data);
          _this.$data.tableData = [];
          for(var i=0;i<response.data.length;i++){
            var newItem={id:response.data[i].goodsid,name:response.data[i].name,picture:response.data[i].photo,
              price:parseFloat(response.data[i].price),text:response.data[i].text};
            _this.$data.tableData.push(newItem);
          }
          _this.$data.totalSize=parseInt(response.data.length);
        }).catch(function (error) {
          console.log(error.response.data)
        })
      },

      //删除时弹框确定
      confirmDelete:function(index, row){
        let _this=this;
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let newIndex=index+((_this.$data.currentPage-1)*(_this.$data.pageSize));//分页要换算当前Index
          this.handleDelete(newIndex,row);
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

      //删除一个商品
      handleDelete:function (index, row) {
        var name=row.name.toString();
        let _this=this;

        this.$axios({
          method:'get',
          url:'/goods/deleteItem?name='+name,
          contentType:'application/json;charset=UTF-8',

        }).then(function (response) {
          _this.tableData.splice(index,1);
        }).catch(function (error) {
          console.log(error.response.data)
        })
      },

      //编辑一个商品
      handleEdit:function (index, row){
        let _this=this;
        _this.$data.dialogFormVisible = true;
        console.log("index:"+index);
        console.log("currentPage:"+_this.$data.currentPage);
        console.log("pageSize:"+_this.$data.pageSize)
        _this.$data.currentIndex=index+((_this.$data.currentPage-1)*(_this.$data.pageSize));//分页要换算当前Index
        console.log("currentIndex="+_this.$data.currentIndex);

        _this.$data.form.formID=row.id;
        _this.$data.form.formName=row.name;
        _this.$data.form.formPrice=row.price;
        _this.$data.form.formText=row.text;
      },

      //编辑后的确定
      confirmEdit:function (){
        this.$confirm('确定要修改该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let _this=this;

          var id=_this.$data.form.formID;
          var name=_this.$data.form.formName;
          var price=_this.$data.form.formPrice;
          var text=_this.$data.form.formText;

          console.log(_this.$data.currentIndex)
          this.$axios({
            method:'get',
            url:'/goods/editItem?strid='+id+'&name='+name+'&price='+price+'&text='+text

          }).then(function (response) {
            console.log(response.data);
            let currentIndex=_this.$data.currentIndex;
            _this.$data.dialogFormVisible = false;
            if(response.data.toString()==='1'){
              _this.$data.tableData[currentIndex].name=_this.$data.form.formName;
              _this.$data.tableData[currentIndex].price=parseFloat(_this.$data.form.formPrice);
              _this.$data.tableData[currentIndex].text=_this.$data.form.formText;
            }
          }).catch(function (error) {
            console.log(error.response.data)
          });

          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改或修改出错'
          });
        });
      },

      //新建一个商品
      handleNew:function (){
        let _this=this;
        _this.$data.newdialogFormVisible = true;
      },

      //新建后的确定
      confirmNew:function (){
        this.$confirm('确定要创建该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let _this=this;

          var name=_this.$data.newform.newName;
          var price=_this.$data.newform.newPrice.toString();
          var text=_this.$data.newform.newText;

          this.$axios({
            method:'get',
            url:'/goods/addGoods?name='+name+'&price='+price+'&text='+text

          }).then(function (response) {
            console.log(response.data);
            var newItem={name:name,picture:'Not Completed',price:price,text:parseFloat(text)};
            _this.$data.tableData.unshift(newItem);//在表格中加入数据

            //检验返回的id是否为正整数,如果是,将图片和ID再发回后端
            var res=response.data.toString();
            var type="^[0-9]*[1-9][0-9]*$";
            var r=new RegExp(type);
            var flag=r.test(res);
            if(flag){
              _this.pictureData.name=res;
              console.log(_this.pictureData);
              _this.$refs.upload.submit();//提交图片和相应id
            }
            _this.$data.newdialogFormVisible = false;//将新建框隐藏
            //_this.loadAllUsers();
          }).catch(function (error) {
            console.log(error.response.data)
          });
          this.$message({
            type: 'success',
            message: '成功创建该商品!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消创建或创建出错'
          });
        });
      },

      //根据名字搜索商品
      searchByName:function(name){
        let _this=this;

        this.$axios({
          method:'get',
          url:'/goods/selectItemByName?name='+name,

        }).then(function (response) {
          //_this.$data.tableData=response.data;
          console.log(response.data);
          _this.$data.tableData = [];
          for(var i=0;i<response.data.length;i++){
            var newItem={id:response.data[i].goodsid,name:response.data[i].name,picture:'Not Completed',price:parseInt(response.data[i].price),text:response.data[i].text};
            _this.$data.tableData.push(newItem);
            _this.$data.totalSize=_this.$data.tableData.length;//修改表格的totalSize
          }
        }).catch(function (error) {
          console.log(error.response.data)
        })

        // this.$axios({
        //   method:'post',
        //   url:'/goods/selectItemByName',
        //   data:{
        //     name:name
        //   }
        // }).then(function (response) {
        //   console.log(response.data);
        //   _this.$data.tableData = [];
        //   for(var i=0;i<response.data.length;i++){
        //     var newItem={name:response.data[i].name,picture:'Not Completed',price:parseInt(response.data[i].price),text:response.data[i].text};
        //     _this.$data.tableData.push(newItem);
        //   }
        // }).catch(function (error) {
        //   console.log(error.response.data)
        // })

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
            _this.loadAllUsers();
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

          this.$router.push('/');
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

      //获取当前时间，格式YYYY-MM-DD HH:MM:SS
      getNowFormatDate() {
        let _this=this
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
        _this.$data.pictureData.name=currentdate;
      },

      //换页触发的函数a
      currentChange:function(currentPage){
        this.currentPage = currentPage;
      }
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
