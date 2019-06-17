<template>
  <div id="sellTemplate">
    <div style="margin-top: 2vh;width: 94%;margin-left: auto;margin-right: auto">
      <div style="margin-top: 2vh;text-align: center">
        <swiper auto loop :aspect-ratio="300/550">
          <swiper-item class="swiperImg"  v-for="(item, index) in pictureList" :key="index" style="text-align: center">
            <img :src="item.img" style="height: 80%;margin-left: auto;margin-right: auto;display: block">
            <p style="font-size: 4vw;">{{item.title}}</p>
          </swiper-item>
        </swiper>
      </div>
    </div>
    <div style="margin-top: 1vh;width: 96%;margin-left: auto;margin-right: auto;
                background-color:white;opacity: 0.85;height: 51vh;overflow: scroll">
      <div style="width: 90%;margin-left: auto;margin-right: auto;">
        <el-collapse v-model="activeNames" style="height: 100%;">
          <el-collapse-item  name="1">
            <span slot="title" style="font-size: 4vw">&nbsp;&nbsp;机构介绍</span>
            <div style="padding: 10px;">
              <p v-html="shopInfo.introduce" style="width: 100%;font-size: 4vw"></p>
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <span slot="title" style="font-size: 4vw">&nbsp;&nbsp;领券</span>
            <div class="coupon" v-for="(coupon,index) in shopInfo.coupons" :key="index"
                 style="padding: 10px;margin-right: 7px;margin-top: 10px;box-shadow:1px 1px 1px rgba(200,200,169,0.6)">
              <div style="width: 200px;display: inline-block">
                <span style="font-size:5vw;color:#FDF5E6">&nbsp;{{coupon.basic}}~{{coupon.most}}</span>
                <span style="color:#FDF5E6">¥</span>
                <p style="font-size:4vw;color:#FDF5E6">&nbsp;&nbsp;{{coupon.name}}</p>

              </div>
              <div style="width: 50px;display: inline-block;float: right;margin-top:26px;margin-right: 10px">
                <button class="getButton" :value="coupon.status" @click="getCoupon(coupon)">
                  <span style="">{{getTitle(coupon.status)}}</span>
                </button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

    <div style="display: block">
      <tabbar style="position: fixed;">
        <tabbar-item link="/">
          <img slot="icon" src="../assets/首页.png">
          <img slot="icon-active" src="../assets/首页绿.png">
          <span slot="label">主页</span>
        </tabbar-item>
        <tabbar-item link="/MySelf">
          <img slot="icon" src="../assets/个人.png">
          <img slot="icon-active" src="../assets/个人绿.png">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </div>

  </div>
</template>

<script>
    import TrainOrganization from "../myComponents/TrainOrganization"
    import {Tabbar,TabbarItem, Swiper,SwiperItem} from 'vux'
    import { AlertModule, Alert, Group,Confirm} from 'vux'

    export default {
        name: "sellTemplate",
        components:{
          Tabbar,
          TabbarItem,
          Swiper,
          SwiperItem,
          Alert
        },
        data() {
          return {
            shopInfo:{},
            activeNames: ['2'],
            shopTitle:'',
            pictureList:[],
          }
        },

        created(){
          this.loadShop();
        },

        methods:{

          loadShop:function(){
            let _this=this;
            let shopID=localStorage.getItem("shopID");
            this.$axios({
              method:'get',
              url:'/mainPage/getShopMessage?shopid='+shopID,
            }).then(function (response) {
              console.log(response.data);
              var photoData=response.data.photo;
              _this.$data.shopInfo=response.data;
              for(var i=0;i<photoData.length;i++){
                let newItem={
                  img: photoData[i].photo,
                  title: photoData[i].des
                };
                _this.$data.pictureList.push(newItem);
              }
            }).catch(function (error) {
              console.log(error.response.data);
            });
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
                  coupon.status="1";
                  _this.showModule("领取成功!");
                }
                else if(response.data.toString()==="-1"){
                  window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe539606fcc70dfaa&redirect_uri=http://ixmu.xmu.edu.cn/oauth_ixmu/kjxt_index&response_type=code&scope=snsapi_base&connect_redirect=1#wechat_redirect"
                }
                else{
                  _this.showModule("领取失败,可能该卷还没有开放哦~")
                }
              }).catch(function (error) {
                console.log(error.response.data);
              });
            }
          },

          //弹窗提示函数,content为弹窗内容
          showModule(content) {
            AlertModule.show({
              title: '',
              content: content,
            })
          },
        }

    }
</script>

<style scoped>

  #sellTemplate{
    height:100%;
    width:100%;
    border:hidden;
    overflow:hidden;
    /*background: url("../assets/background4.png");*/
    background-color: #EDEDED;
    background-size:100% 100%;
  }

  .box1-item {
    width: 200px;
    height: 120px;
    background-color: #ccc;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }

  .el-tabs__item{
    padding:0 10px;
  }

  .getButton {
    /*background-color: orangered;*/
    background-color: #FDF5E6;
    border: none;
    color: orangered;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    font-size: 13px;
    border-radius: 40px;
    /*margin-right: 0;*/
    /*margin-left:62%;*/
  }

  .coupon{
    background: url("../assets/coupon.jpg");
    background-size:100% 100%;
  }

  .swiperImg{
    width: 100%;
    height: 100%;
  }

  .el-tabs__content{
    height: 96%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
