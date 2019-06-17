<template>
  <div class="textEdit">
    <div>
      <div style="margin-top:20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">管理员</el-breadcrumb-item>
          <el-breadcrumb-item>商家介绍/简介管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!--选择框-->
      <div style="margin-top: 30px;text-align: left">
        <el-select v-model="textSelected" filterable placeholder="请选择类型">
          <el-option
            v-for="item in textOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="components-container" style="margin-top: 30px">
        <!--<button @click="getUEContent()">获取内容</button>-->
        <!--<button @click="getUEContentTxt()">获取无文本内容</button>-->
        <div class="editor-container" style="margin-top:20px;">
          <UE :defaultMsg=defaultMsg :config=config :id=ue2 ref="ue2"></UE>
        </div>
      </div>

      <div style="margin-top:30px; margin-right:20px;">
        <el-button type="primary" style="float: right" @click="sendContent()" >保存到服务器</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import UE from '../components/ue/ue';
    export default {
      name: "textEdit",
      components: {UE},
      data() {
        return {
          defaultMsg: '',
          config: {
            initialFrameWidth: null,
            initialFrameHeight: 350
          },
          ue1: "ue1", // 不同编辑器必须不同的id
          ue2: "ue2",
          shopID:'',
          textSelected:'',
          textOptions: [{ value: '1', label: '商家简介'},{ value: '2', label: '商家详情'}],//选择框的选项
        }
      },
      created(){
        let _this=this;
        _this.$data.shopID=localStorage.getItem("shopID");
      },
      methods: {

        //得到富文本框的HTML代码
        getUEContent() {
          let content = this.$refs.ue2.getUEContent(); // 调用子组件方法
          this.$notify({
            title: '获取成功，可在控制台查看！',
            message: content,
            type: 'success'
          });
          console.log(content);
        },
        //得到富文本框的文本
        getUEContentTxt() {
          let content = this.$refs.ue2.getUEContentTxt(); // 调用子组件方法
          this.$notify({
            title: '获取成功，可在控制台查看！',
            message: content,
            type: 'success'
          });
          console.log(content)
        },
        //向后台传送HTML代码
        sendContent(){
          let content = this.$refs.ue2.getUEContent();
          let _this=this;
          var shopID=_this.$data.shopID;
          var testID=_this.$data.textSelected;
          if(testID===""){
            _this.$alert('请选择相关信息', '亲爱的王昊宇', {
              confirmButtonText: '确定',
            });
          }
          if(testID==="1"){
            //商家简介
            _this.$axios({
              method:'post',
              url:'/admin/changeShopBrief',
              headers:{
                'Content-Type':'application/json;'
              },
              data:{
                brief:encodeURI(content.toString()),
                shopid:shopID,
              }
            }).then(function (response) {
              console.log(response.data);
              if(response.data){
                _this.$message({
                  message: '成功保存到服务器',
                  type: 'success'
                });
              }
              else{
                _this.$message.error('保存错误,请联系后台人员');
              }
            }).catch(function (error) {
              _this.$message.error('保存错误,请联系后台人员');
              console.log(error.response.data);
            })
          }
          if(testID==="2"){
            //商家详情
            _this.$axios({
              method:'post',
              url:'/admin/changeShopIntro',
              headers:{
                'Content-Type':'application/json;'
              },
              data:{
                intro:encodeURI(content.toString()),
                shopid:shopID,
              }
            }).then(function (response) {
              console.log(response.data);
              if(response.data){
                _this.$message({
                  message: '成功保存到服务器',
                  type: 'success'
                });
              }
              else{
                _this.$message.error('保存错误,请联系后台人员');
              }
            }).catch(function (error) {
              _this.$message.error('保存错误,请联系后台人员');
              console.log(error.response.data);
            })
          }

        },
      }
    }
</script>

<style scoped>

</style>
