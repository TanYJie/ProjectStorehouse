<template>
  <div class="shopBasicInfoEdit">
    <div style="margin-top:20px;text-align: left;width: 90%;padding: 10px;display: block; background-color: #E9EEF3;">
      <el-form :model="newform">
        <el-form-item label="商家所属大类" :label-width="formLabelWidth">
          <el-select v-model="newform.newType" placeholder="请选择商家类别" disabled>
            <el-option label="艺术培训" value="3"></el-option>
            <el-option label="驾校培训" value="2"></el-option>
            <el-option label="语言培训" value="1"></el-option>
          </el-select>
          <el-button type="primary" style="margin-left: 30px" @click="handleEdit">编辑</el-button>
        </el-form-item>
        <el-form-item label="商家名称" :label-width="formLabelWidth">
          <el-input v-model="newform.newName" auto-complete="off" style="width: 210px" disabled></el-input>
        </el-form-item>
        <el-form-item label="商家简介" :label-width="formLabelWidth">
          <div v-html="newform.newBriefIntroduce" style="width: 600px;word-wrap: break-word"></div>
        </el-form-item>
        <el-form-item label="商家介绍" :label-width="formLabelWidth">
          <!--<el-input v-model="newform.newIntroduce" type="textarea" :rows="4" auto-complete="off" ></el-input>-->
          <div v-html="newform.newIntroduce" style="width: 600px;word-wrap: break-word"></div>
        </el-form-item>
      </el-form>
    </div>

    <!--添加框-->
    <div style="margin-top: 40px; padding:16px; text-align: left;width: 90%;margin-left: auto;margin-right: auto">
      <el-button type="success"  size="small" icon="el-icon-plus" @click="newPicture">添加图片</el-button>
    </div>
    <div style="margin-top: 10px">
      <el-table :data="tableData" fit border stripe style="width: 90%;margin-left: auto;margin-right: auto">
        <el-table-column prop="ID" label="ID" sortable width="100px"></el-table-column>
        <el-table-column prop="picture" label="图片" width="350px">
          <template slot-scope="scope" >
            <img :src="scope.row.picture" style="height: 150px;width: 300px"/>
          </template>
        </el-table-column>
        <el-table-column prop="text" label="图片所配文字" width="300px"></el-table-column>
        <el-table-column prop="position" label="顺位" width="100px" sortable></el-table-column>
        <el-table-column label="操作" width="200px">
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
            action="/kjxt/admin/goodsPicture"
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
        <el-form-item label="图片对应文字" :label-width="formLabelWidth" required>
          <el-input v-model="pictureForm.newText" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="顺位" :label-width="formLabelWidth" required>
          <el-input v-model="pictureForm.newPosition" auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmNew">确 定</el-button>
        <el-button @click="newdialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑商家" :visible.sync="editdialogFormVisible" width="30%" style="text-align: left;">
      <el-form :model="editForm">
        <el-form-item label="商家所属大类" :label-width="formLabelWidth">
          <el-select v-model="editForm.editType" placeholder="请选择商家类别">
            <el-option label="艺术培训" value="3"></el-option>
            <el-option label="驾校培训" value="2"></el-option>
            <el-option label="语言培训" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.editName" auto-complete="off" style="width: 210px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>

    export default {
        name: "shopBasicInfoEdit",
        components:{

        },

        data(){
          return{
            shopID:'',//商家ID
            formLabelWidth: '120px',
            newdialogFormVisible:false,//新建框是否可见
            editdialogFormVisible:false,//编辑框是否可见

            //图片表格中数据
            tableData:[{
              ID:'',
              picture:'',
              text:'',
              position:'',
            }],
            //商品表单内数据
            newform: {
              newType:'',
              newName:'',
              newIntroduce:'',
              newBriefIntroduce:'',
            },
            //编辑框内数据
            editForm:{
              editType:'',
              editName:''
            },

            pictureForm: {newPosition:'',newText:''},//图片表单内数据
            pictureData:{photoid:""},//图片附带数据

          }
        },

        created(){
          this.loadShopBasicInfo();
        },

        methods:{

          //加载商店基本信息
          loadShopBasicInfo:function() {
            let _this=this;
            let shopID=localStorage.getItem("shopID");
            _this.$data.shopID=shopID;
            this.$axios({
              method:'get',
              url:'/admin/getShopMessage?shopid='+shopID,
            }).then(function (response) {
              console.log("BasicInfoEdit:");
              console.log(response.data);
              let res=response.data;
              _this.$data.newform.newType=res.kjShoptype.name;
              _this.$data.newform.newName=res.name;
              _this.$data.newform.newIntroduce=res.introduce;
              _this.$data.newform.newBriefIntroduce=res.briefIntro;

              _this.$data.tableData=[];
              for(var i=0;i<res.photo.length;i++){
                var newItem={ID:res.photo[i].photoid,picture:res.photo[i].photo,
                             text:res.photo[i].des,position:res.photo[i].orderid};
                _this.$data.tableData.push(newItem);
              }

            }).catch(function (error) {
              console.log(error.response.data);
            });
          },
          //新加一张图片
          newPicture:function () {
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
              var position=_this.$data.pictureForm.newPosition.toString();
              var text=_this.$data.pictureForm.newText.toString();
              for(var i=0;i<_this.$data.tableData.length;i++){
                if(_this.$data.tableData[i].position===position){
                  alert("有顺位重复的图片,请检查");
                  return;
                }
              }
              _this.$axios({
                method:'get',
                url:'/admin/newPhoto?shopid='+_this.$data.shopID+'&orderid='+position+'&des='+text
              }).then(function (response) {
                console.log(response.data);
                //检验返回的id是否为正整数,如果是,将图片和ID再发回后端
                var res=response.data.toString();
                var type="^[0-9]*[1-9][0-9]*$";
                var r=new RegExp(type);
                var flag=r.test(res);
                if(flag){
                  _this.pictureData.photoid=res;
                  console.log(_this.pictureData);
                  _this.$refs.upload.submit();//提交图片和相应id
                }
                var newItem={ID:res,picture:"",position:position};
                _this.$data.tableData.unshift(newItem);//在表格中加入数据
                _this.$data.newdialogFormVisible = false;//将新建框隐藏
              }).catch(function (error) {
                console.log(error.response.data);
              });
              _this.$message({
                type: 'success',
                message: '成功加入该图片!'
              });
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消加图或加图出错'
              });
            });
          },
          //删除时弹框确定
          confirmDelete:function(index, row){
            let _this=this;
            var id=row.ID.toString();
            this.$confirm('此操作将删除该图片, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _this.$axios({
                method:'get',
                url:'/admin/deletePhoto?photoid='+id,
              }).then(function (response) {
                console.log(response.data);
                _this.$data.tableData.splice(index,1);
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
          //编辑时弹框
          handleEdit:function(){
            let _this=this;
            _this.$data.editForm.editType=_this.$data.newform.newType;
            _this.$data.editForm.editName=_this.$data.newform.newName;
            _this.$data.editdialogFormVisible=true;
          },
          //编辑的确定
          confirmEdit:function(){
            this.$confirm('确定要修改该商店吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let _this=this;
              var shopid=_this.$data.shopID;
              var shopType=_this.$data.editForm.editType;
              var shopName=_this.$data.editForm.editName;
              let shopTypeInt="0";
              if(shopType==="艺术培训"){shopTypeInt="3";}
              if(shopType==="驾校培训"){shopTypeInt="2";}
              if(shopType==="语言培训"){shopTypeInt="1";}
              this.$axios({
                method:'get',
                url:'/admin/editShop?type='+shopTypeInt+'&name='+shopName+'&shopid='+shopid

              }).then(function (response) {
                console.log(response.data);
                _this.$data.editdialogFormVisible = false;
                _this.$data.newform.newType=shopType;
                _this.$data.newform.newName=shopName;
                _this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
              }).catch(function (error) {
                console.log(error.response.data)
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消修改或修改出错'
              });
            });
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

        },
    }
</script>

<style scoped>

</style>
