<template>
  <div class="sellerEdit">
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
            <el-menu default-active="2" class="el-menu-vertical-demo">
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
              <el-breadcrumb-item>商家详情管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div style="margin-top: 30px">
            <el-tabs v-model="TabsValue" @tab-click="TabClick" type="border-card">
              <el-tab-pane label="商家信息管理" name="first"><shopBasicInfoEdit></shopBasicInfoEdit></el-tab-pane>
              <el-tab-pane label="券管理" name="second"><coupon-edit></coupon-edit></el-tab-pane>
              <el-tab-pane label="商家简介/介绍管理" name="third"><text-edit></text-edit></el-tab-pane>
              <el-tab-pane label="订单管理" name="fourth"><order-edit></order-edit></el-tab-pane>
            </el-tabs>
          </div>

        </div>

      </el-main>
    </el-container>


  </div>
</template>

<script>
  import app from "../App";
  import shopBasicInfoEdit from './BasicInfoEdit'
  import couponEdit from './couponEdit'
  import textEdit from './textEdit'
  import orderEdit from './orderEdit'

  export default {
    name: "sellerEdit",
    components:{
      shopBasicInfoEdit,
      couponEdit,
      textEdit,
      orderEdit
    },
    data() {
      return {
        TabsValue:"first",

        //表格数据
        tableData:[{
          id:'',
          name:'',
          picture:'',
          price:'',
          text:'',
        }],

        formLabelWidth: '120px',

      }
    },

    created(){
      this.loadShop();
    },

    methods: {

      //加载该商店
      //从localStorage中获取shopID
      loadShop:function() {
        let _this=this;
        let shopID=localStorage.getItem("shopID");
        this.$axios({
          method:'get',
          url:'/admin/getShopMessage?shopid='+shopID,
        }).then(function (response) {
          console.log(response.data);
        }).catch(function (error) {
          console.log(error.response.data);
        });
      },

      TabClick(){},
    }

  }
</script>

<style scoped>
  .sellerEdit{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
