<template>
  <div class="ActivityEdit">
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
            <el-menu default-active="3" class="el-menu-vertical-demo">
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
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">活动说明管理</span>
              </el-menu-item>
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
              <el-breadcrumb-item>活动说明管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!--选择框-->
          <!--<div style="margin-top: 30px">-->
            <!--<el-select v-model="shopSelected" filterable placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in options"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--<el-select v-model="textSelected" filterable placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in textOptions"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->

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

      </el-main>
    </el-container>

  </div>
</template>

<script>
  import UE from '../components/ue/ue';
    export default {
      name: "ActivityEdit",
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
          shopSelected:'',
          textSelected:'',
          options: [],//选择框的选项
          textOptions: [{ value: '1', label: '商家简介'},{ value: '2', label: '商家介绍'}],//选择框的选项
        }
      },
      // created(){
      //   this.loadAllShops();
      // },
      methods: {

        //加载所有商店
        loadAllShops:function() {
          let _this=this;
          this.$axios({
            method:'get',
            url:'/mainPage/pageInitial',
          }).then(function (response) {
            //console.log(response.data);
            _this.$data.options = [];
            let res=response.data;
            for(var i=0;i<res.length;i++){
              for(var j=0;j<res[i].shops.length;j++){
                var newItem={value:res[i].shops[j].shopid,label:res[i].shops[j].name};
                _this.$data.options.push(newItem);
              }
            }
            console.log(_this.$data.options);
          }).catch(function (error) {
            console.log(error.response.data)
          })
        },

        //得到富文本框的HTML代码
        getUEContent() {
          let content = this.$refs.ue2.getUEContent(); // 调用子组件方法
          this.$notify({
            title: '获取成功，可在控制台查看！',
            message: content,
            type: 'success'
          });
          console.log(content)
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

        sendContent(){
          let content = this.$refs.ue2.getUEContent();
          let _this=this;
            _this.$axios({
              method:'get',
              url:'/admin/editRule?rule='+encodeURI(content.toString()),
              contentType:'application/json;charset=UTF-8',
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
        },

        //向后台传送HTML代码
        // sendContent(){
        //   let content = this.$refs.ue2.getUEContent();
        //   let _this=this;
        //   var shopID=_this.$data.shopSelected;
        //   var testID=_this.$data.textSelected;
        //   if(shopID===""||testID===""){
        //     _this.$alert('请选择商店和相关信息', '亲爱的王昊宇', {
        //       confirmButtonText: '确定',
        //     });
        //   }
        //   if(testID==="1"){
        //     //商家简介
        //     _this.$axios({
        //       method:'get',
        //       url:'/admin/changeShopBrief?brief='+encodeURI(content.toString())+'&shopid='+shopID,
        //       contentType:'application/json;charset=UTF-8',
        //     }).then(function (response) {
        //       console.log(response.data);
        //       if(response.data){
        //         _this.$message({
        //           message: '成功保存到服务器',
        //           type: 'success'
        //         });
        //       }
        //       else{
        //         _this.$message.error('保存错误,请联系后台人员');
        //       }
        //     }).catch(function (error) {
        //       _this.$message.error('保存错误,请联系后台人员');
        //       console.log(error.response.data);
        //     })
        //   }
        //   if(testID==="2"){
        //     //商家详情
        //     _this.$axios({
        //       method:'get',
        //       url:'/admin/changeShopIntro?intro='+encodeURI(content.toString())+'&shopid='+shopID,
        //       contentType:'application/json;charset=UTF-8',
        //     }).then(function (response) {
        //       console.log(response.data);
        //       if(response.data){
        //         _this.$message({
        //           message: '成功保存到服务器',
        //           type: 'success'
        //         });
        //       }
        //       else{
        //         _this.$message.error('保存错误,请联系后台人员');
        //       }
        //     }).catch(function (error) {
        //       _this.$message.error('保存错误,请联系后台人员');
        //       console.log(error.response.data);
        //     })
        //   }
        //
        // },
      }
    }
</script>

<style scoped>

</style>
