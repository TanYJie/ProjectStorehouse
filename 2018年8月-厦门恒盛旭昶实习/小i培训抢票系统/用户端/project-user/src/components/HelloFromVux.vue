<template>
  <div class="home" style="width: 100%">
    <div style="margin-top: 2vh;width: 94%;margin-left: auto;margin-right: auto">
      <div style="margin-top: 4vh">
        <el-carousel indicator-position="none" :interval="4000" type="card" height="20vh" >
          <el-carousel-item v-for="item in banner" :key="item">
            <a :href="item.des">
              <img :src="item.photo" style="height: 100%;width: 100%">
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!--<div class="line" style="width: 94%;;margin-left: auto;margin-right: auto;margin-top:20px;height: 2px;background-color: rgba(96,96,96,0.15)"></div>-->
    <div style="margin-top: 5vh;width: 94%;margin-left: auto;margin-right: auto;opacity:0.9;">
      <el-tabs type="border-card" tabPosition="left" style="height: 65vh;padding: 0;width: 100%">
        <el-tab-pane label="培训机构" style="padding: 0;width: 100%">
          <div style="">
          <el-collapse v-model="activeNames" accordion @change="openShop" style="height: 100%;">
            <el-collapse-item v-for="(shop,index) in languageShops" :key="index" :name="shop.shopid">
              <span slot="title" style="font-size: 4vw">&nbsp;{{shop.name}}</span>
              <div style="border:1px solid rgba(200,200,169,0.6); padding: 10px;margin-right: 7px">
                <div>
                  <span style="font-size: 4vw">商家简介</span>
                  <el-button style="float: right;padding: 6px;margin-right: 5px"
                             type="primary" size="mini" @click="goToShop">商家详情</el-button>
                </div>
                <div style="margin-top: 10px">
                  <div v-html="shop.briefintro"></div>
                </div>
              </div>
              <div class="coupon" v-for="(coupon,index) in shopInfo.coupons" :key="index"
                   style="padding: 6px;margin-right: 7px;margin-top: 10px;box-shadow:1px 1px 1px rgba(200,200,169,0.6)">
                <div style="width: 120px;display: inline-block">
                  <span style="font-size:18px;color:#FDF5E6">&nbsp;{{coupon.basic}}~{{coupon.most}}</span>
                  <span style="color:#FDF5E6">¥</span>
                  <p style="font-size:8px;color:#FDF5E6">&nbsp;&nbsp;{{coupon.name}}</p>
                </div>
                <div style="width: 51px;display: inline-block;float: right;margin-top:26px;">
                  <button class="getButton" :value="coupon.status" @click="getCoupon(coupon)">
                    <span style="">{{getTitle(coupon.status)}}</span>
                  </button>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane label="驾校报名">
          <div style="">
          <el-collapse v-model="activeNames" accordion @change="openShop" style="height: 100%;">
            <el-collapse-item v-for="(driveShop,driveIndex) in driveShops" :key="driveIndex" :name="driveShop.shopid">
              <span slot="title" style="font-size: 4vw">&nbsp;{{driveShop.name}}</span>
              <div style="border:1px solid rgba(200,200,169,0.6); padding: 10px;margin-right: 7px">
                <div>
                  <span style="font-size: 4vw">商家简介</span>
                  <el-button style="float: right;padding: 6px;margin-right: 5px"
                             type="primary" size="mini" @click="goToShop">商家详情</el-button>
                </div>
                <div style="margin-top: 10px">
                  <div v-html="driveShop.briefintro"></div>
                </div>
              </div>
              <div class="coupon" v-for="(coupon,index) in shopInfo.coupons" :key="index"
                   style="padding: 6px;margin-right: 7px;margin-top: 10px;box-shadow:1px 1px 1px rgba(200,200,169,0.6)">
                <div style="width: 120px;display: inline-block">
                  <span style="font-size:18px;color:#FDF5E6">&nbsp;{{coupon.basic}}~{{coupon.most}}</span>
                  <span style="color:#FDF5E6">¥</span>
                  <p style="font-size:8px;color:#FDF5E6">&nbsp;&nbsp;{{coupon.name}}</p>
                </div>
                <div style="width: 51px;display: inline-block;float: right;margin-top:26px;">
                  <button class="getButton" :value="coupon.status" @click="getCoupon(coupon)">
                    <span style="">{{getTitle(coupon.status)}}</span>
                  </button>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          </div>
        </el-tab-pane>
      </el-tabs>

      <tabbar style="position: fixed">
        <tabbar-item tabbar-text-active-color="#409EFF" selected>
          <img slot="icon" src="../assets/首页.png">
          <img slot="icon-active" src="../assets/首页绿.png">
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item tabbar-text-active-color="#409EFF" link="/MySelf">
          <img slot="icon" src="../assets/个人.png">
          <img slot="icon-active" src="../assets/个人绿.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </div>

  </div>
</template>

<script>
import { XInput } from 'vux'
import { XButton } from 'vux'
import { AlertModule, Alert, Group,Confirm} from 'vux'
import { Tabbar, TabbarItem } from 'vux'
import { Loading } from 'element-ui';

import app from "../App";
import TrainOrganization from "../myComponents/TrainOrganization"

export default {

  name:'Home',
  components: {
    Group,
    XInput,
    XButton,
    Alert,
    Confirm,
    TrainOrganization,
    Tabbar,
    TabbarItem,
  },
  data () {
    return {
      languageShops:[],
      driveShops:[],
      shopInfo:{},
      activeNames:'',
      activeNamesForDrive:'',
      banner:[],
    }
  },
  created(){
    this.load();
    this.loadPicture();
  },

  methods: {

    //加载大类及所有商家名字信息
    load:function(){
      let _this=this;
      //let loadingInstance = Loading.service({ fullscreen: true });
      this.$axios({
        method:'get',
        url:'/mainPage/pageInitial',
      }).then(function (response) {
        console.log(response.data);
        //loadingInstance.close();
        for(var i=0;i<response.data.length;i++){
          if(response.data[i].name.toString()==="培训机构"){
            _this.$data.languageShops=response.data[i].shops;
          }
          else if(response.data[i].name.toString()==="驾校报名"){
            _this.$data.driveShops=response.data[i].shops;
          }
        }
      }).catch(function (error) {
        console.log(error.response.data);
      });
    },

    //加载banner图
    loadPicture:function(){
      let _this=this;
      this.$axios({
        method:'get',
        url:'/admin/getMainPic',
      }).then(function (response) {
        console.log(response.data);
        _this.$data.banner=response.data;
      }).catch(function (error) {
        console.log(error.response.data)
      })
    },

    //用户点击商家时加载商家的所有券
    openShop:function(val){
      //如果是打开,则向后端发起请求
      let _this=this;
      if(val.toString()!==""){
        _this.$axios({
          method:'get',
          url:'/mainPage/getShopMessage?shopid='+val.toString(),
        }).then(function (response) {
          _this.$data.shopInfo=response.data;
          console.log(_this.$data.shopInfo);
        }).catch(function (error) {
          console.log(error.response.data);
        });
      }
    },

    //跳转到商家详情页面
    goToShop:function(){
      let _this=this;
      console.log("currentShopID:"+_this.$data.activeNames);
      localStorage.setItem("shopID",_this.$data.activeNames);
      this.$router.push('/sellTemplate');//返回到主页面
    },

    //弹窗提示函数,content为弹窗内容
    showModule(content) {
      AlertModule.show({
        title: '',
        content: content,
      })
    },

    //根据status变化按钮的文字
    getTitle(data){
      if(data.toString()==='1'){
        return "查看";
      }else{
        return "领取";
      }
    },

    //领取or查看券
    getCoupon(coupon){
      let _this=this;
      console.log("couponsid:"+coupon.couponsid);
      console.log("status:"+coupon.status);
      //查看
      if(coupon.status.toString()==="1"){
        window.localStorage.setItem("CouponID",coupon.couponsid);
        _this.$router.push('/MyShare');
      }
      //领取
      else if(coupon.status.toString()==="0"){
        _this.$axios({
          method:'get',
          url:'/shopPage/getCoupons?couponsid='+coupon.couponsid,
        }).then(function (response) {
          console.log(response.data);
          if(response.data.toString()==="0"){
            _this.showModule("领取成功!");
            coupon.status="1";
          }
          // else if(response.data.toString()!=="0"){
          //   _this.showModule("领取失败,可能该卷还没有开放哦~")
          // }
        }).catch(function (error) {
          console.log(error.response.data);
        });
      }
    },

  }
}
</script>

<style>
  .home{
    height:100%;
    width:100%;
    padding: 0;
    border:hidden;
    overflow:hidden;
    background-image: url('../assets/background4.png');
    /*background-color: #EDEDED;*/
    background-size:100% 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-tabs__item{
    padding:0 10px;
  }

  .el-collapse-item__content{
    padding-bottom: 5px;
  }

  .el-tabs--border-card>.el-tabs__content{
    padding: 0;
  }
  .el-tabs__content{
    padding: 0;
  }

  .getButton {
    /*background-color: orangered;*/
    background-color: #FDF5E6;
    border: none;
    color: orangered;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    font-size: 11px;
    border-radius: 40px;
    /*margin-right: 0;*/
    /*margin-left:62%;*/
  }

  .coupon{
    background-image: url('../assets/coupon.jpg');
    background-size:100% 100%;
  }

  .el-tabs__content{
    height: 96%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

</style>
