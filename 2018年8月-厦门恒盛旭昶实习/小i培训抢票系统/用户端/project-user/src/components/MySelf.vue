<template>
  <div id="main">
    <!--头像-->
    <div>
      <blur :blur-amount=30 :url="url" style="height: 35vh;text-align: center;">
        <div style="padding-top: 8%">
          <img :src="MyPhoto" style="width: 20vh;height: 20vh;border-radius: 50%;border: 2px solid #ececec;">
          <div>{{MyName}}</div>
        </div>
      </blur>
    </div>

    <!--状态栏-->
    <div style="padding:10px;">
      <button-tab>
        <button-tab-item selected @click.native="ClickToShowNotUseCoupons">待使用</button-tab-item>
        <button-tab-item @click.native="ClickToShowOverDueCoupons">已过期</button-tab-item>
      </button-tab>
    </div>

    <!--优惠券-->
    <div style="height:45vh;overflow-y:scroll;">
      <div :class="CouponBg" v-for="(item,index) in CurrentCoupons" :key="index"><!--循环写入-->
        <div style="width: 50vw;padding-left: 10px;color: #ffffff;display:inline-block">
          <div style="font-size: 8vw">¥{{item.CurrentCutDownPrice}}</div>
          <div style="font-size: 3vw">{{item.Name}}</div>
          <div style="font-size: 3vw">使用日期{{item.ServiceLifeBegin}}至{{item.ServiceLifeEnd}}</div>
        </div>
        <div style="width: 25vw;display:inline-block;text-align: center;float: right;line-height: 7vh">
          <div><button class="getButton" :style="Visibility" @click="ClickToJump(item)">
            <span>查看</span>
          </button></div>
          <div><button class="getButton" @click=" ClickToShowDeleteMsg(item,index)">
            <span>丢弃</span>
          </button></div>
        </div>
        <!--删除确认窗口-->
      </div>
    </div>

    <confirm v-model="DeleteConfirm"
             title="操作提示"
             @on-confirm="ClickToAbandonThisCoupon()">
      <p style="text-align:center;">是否删除该优惠券?</p>
      <p style="text-align:center;font-size: small">（ps:待使用的优惠券如果不小心删除，可联系客服找回该优惠券。如果重复领取该券就无法找回~~）</p>
    </confirm>

    <tabbar tabbar-text-active-color="#409EFF" style="position: fixed">
      <tabbar-item tabbar-text-active-color="#409EFF" link="/">
        <img slot="icon" src="../assets/首页.png">
        <img slot="icon-active" src="../assets/首页绿.png">
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item selected>
        <img slot="icon" src="../assets/个人.png">
        <img slot="icon-active" src="../assets/个人绿.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Blur,ButtonTab, ButtonTabItem,Tabbar,TabbarItem,Confirm} from 'vux'

    export default {
      components: {
        Confirm,
        Tabbar,TabbarItem,
        ButtonTab,
        ButtonTabItem,
        Blur
      },
      created(){
        this.LoadNotUseCoupons();
      },
      Updated(){

      },
      data(){
        return {
          url:require("../assets/vux_logo.png"),//头像图
          CouponBg:'CouponBg1',
          Visibility:'visibility:visible',

          //优惠券信息
          NotUseCoupons:[{
            id:0,
            CurrentCutDownPrice:0,
            Name:'null',
            ServiceLifeBegin:'//',
            ServiceLifeEnd:'//',
          }],
          OverDueCoupons:[{
            id:0,
            CurrentCutDownPrice:0,
            Name:'null',
            ServiceLifeBegin:'//',
            ServiceLifeEnd:'//',
          }],
          CurrentCoupons:[{
            id:0,
            CurrentCutDownPrice:0,
            Name:'null',
            ServiceLifeBegin:'//',
            ServiceLifeEnd:'//',
          }],
          TempCoupon:[{//存储item的临时变量
            id:0,
            CurrentCutDownPrice:0,
            Name:'null',
            ServiceLifeBegin:'//',
            ServiceLifeEnd:'//',
          }],

          //状态标识符
          DeleteConfirm:false,
          UseConfirm:false,
          UseUrl:'',
          currentIndex:'',

          //用户信息
          MyPhoto:'',
          MyName:'',
        }
      },
      methods:{
        //加载优惠券
        LoadNotUseCoupons:function () {
          let _this=this;

          _this.CurrentCoupons.length=0;

          //加载待使用
          this.$axios({
            methods: 'get',
            url:'/personalPage/getCouponsByStatus?status=1',
            }).then(function (response) {
              console.log(response);

            //加载数组
            _this.$data.NotUseCoupons.length=0;
            for(let i=0;i<response.data.length;i++)
            {
              _this.$data.NotUseCoupons.push({
                id:response.data[i].couponsid,
                CurrentCutDownPrice:response.data[i].price,
                Name:response.data[i].name,
                ServiceLifeBegin:response.data[i].begintime,
                ServiceLifeEnd:response.data[i].endtime
                });
            }

            _this.CurrentCoupons=_this.NotUseCoupons;

            _this.LoadOverDueCoupons();
          }).catch(function (error) {
            console.log(error);
          })
        },
        LoadOverDueCoupons:function(){
          let _this=this;

          //加载待使用
          this.$axios({
            methods: 'get',
            url:'/personalPage/getCouponsByStatus?status=0',
          }).then(function (response) {
            //console.log(response);

            //加载数组
            _this.$data.OverDueCoupons.length=0;
            for(let i=0;i<response.data.length;i++)
            {
              _this.$data.OverDueCoupons.push({
                id:response.data[i].couponsid,
                CurrentCutDownPrice:response.data[i].price,
                Name:response.data[i].name,
                ServiceLifeBegin:response.data[i].begintime,
                ServiceLifeEnd:response.data[i].endtime
              });
            }

            _this.LoadCurrentUser();
          }).catch(function (error) {
            console.log(error);
          })
        },
        //加载当前用户
        LoadCurrentUser:function(){
          let _this=this;

          _this.$axios({
            methods:'get',
            url:'/personalPage/getAccountMessage',
          }).then(function (response) {
            //console.log(response.data);
            console.log(document.cookie);
            _this.MyName=response.data.name;
            _this.MyPhoto=response.data.photo;
          })
        },

        //功能函数
        ClickToShowNotUseCoupons:function () {
          this.CurrentCoupons=this.NotUseCoupons;
          this.CouponBg='CouponBg1';
          this.Visibility='visibility:visible';
          //document.getElementsByClassName("CouponBg").item(0).style.background="url(" + require("../assets/优惠券.png") + ")";
        },
        ClickToShowOverDueCoupons:function(){
          this.CurrentCoupons=this.OverDueCoupons;
          this.CouponBg='CouponBg2';
          this.Visibility='visibility:hidden';
        },

        ClickToShowDeleteMsg:function(item,index){
         this.TempCoupon=item;
         this.$data.currentIndex=index;
         this.DeleteConfirm=true;
       },
        ClickToAbandonThisCoupon:function () {
         let _this=this;
         console.log(this.TempCoupon.id);

         this.$axios({
           methods: 'get',
           url:'/shopPage/deleteCoupons?couponsid='+_this.TempCoupon.id,
         }).then(function (response) {
           console.log(response);
           _this.$data.CurrentCoupons.splice(_this.$data.currentIndex,1);
         })
       },

        ClickToJump:function (item) {
          window.localStorage.setItem("CouponID",item.id);
          this.$router.push({name:"MyShare"});
        }
      }
    }
</script>

<style scoped>
  #main{
    width:100%;
    height: 100%;
    border:hidden;
    overflow:hidden;
  }
  .CouponBg1{
     width: 80vw;
     height: 15vh;
     margin:auto;
     margin-bottom: 5px;
     background: url("../assets/优惠券.png");
     background-size: 100% 100% ;
     background-repeat: no-repeat;
   }
  .CouponBg2{
    width: 80vw;
    height: 15vh;
    margin:auto;
    margin-bottom: 5px;
    background: url("../assets/优惠券（已过期）.png");
    background-size: 100% 100% ;
    background-repeat: no-repeat;
  }

  .getButton {
    background-color: #FDF5E6;
    border: none;
    color: orangered;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    font-size: 2vh;
    border-radius: 40px;
  }
</style>
