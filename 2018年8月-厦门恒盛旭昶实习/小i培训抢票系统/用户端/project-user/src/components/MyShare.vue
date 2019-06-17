<template >
  <div class="main">
    <!--券当前详情-->
    <el-card class="box-card" style="border-radius: 10px;margin: 20px;background-color: rgba(255,255,255,0.64)">
      <div slot="header" class="clearfix">
        {{CouponName}}
      </div>
      <div style="font-size: small;">
        &nbsp;&nbsp;{{CouponIntro}}
      </div>

      <div class="CouponBg">
        <div style="width: 50vw;padding-left: 10px;color: #ffffff;display:inline-block">
          <div style="font-size: 5vw"><span style="font-size: 8vw">¥</span><span style="text-decoration: line-through">{{CouponBasicPrice}}</span><span style="font-size: 8vw">{{CouponCurrentPrice}}</span></div>
          <div style="font-size: 3vw">{{CouponName}}</div>
          <div style="font-size: 3vw">使用日期{{CouponBeginTime}}至{{CouponEndTime}}</div>
        </div>
        <div style="width: 25vw;display:inline-block;text-align: center;float: right;line-height: 15vh">
          <button class="getButton" @click="ClickToShowConfirmMsg">
            <span>使用</span>
          </button>
        </div>
      </div>
    </el-card>
    <!--使用确认窗口-->
    <confirm v-model="UseConfirm"
             title="操作提示"
             :show-confirm-button="false">
      <p style="">请让商家扫描该券，如果商家核对成功您的信息，该券就使用成功并且删除。</p>
      <img :src="UseUrl">
    </confirm>


    <!--砍价信息-->
    <box gap="20px" style="text-align: center">
      <img :src="AccountPhoto" width="60" height="60" style="border-radius: 50%;box-shadow: 5px 5px 5px #cf9236"/>
      <div>{{AccountName}}</div>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="BargainPercent" color="#FF4C0A"></el-progress>
      <div style="text-align: center">
        <span style="font-size: small">已助力</span>
        <span style="font-size: large;color: #ff0000">{{BargainHasCut}}元</span>
        <span style="font-size: small;">还可以助力</span>
        <span style="color: #ff0000;">{{BargainCanCut}}元</span>
      </div>
    </box>

    <!--请求助力-->
    <x-button :gradients="['#FF5E3A', '#FF9500']" style="margin-top: 5px;width: 50%;box-shadow: 5px 5px 5px #cf9236;" @click.native="ShowHelpMsg=true">请求好友助力</x-button>
    <confirm v-model="ShowHelpMsg"
             title="如何分享"
             theme="ios"
             :show-cancel-button="false">
      <div style="text-align:left;">1、点击右上角 ··· 菜单<br/>2、分享给好友或朋友圈<br/>3、好友进来助力~</div>
    </confirm>

    <!--砍价时间表-->
    <card style="border-radius: 10px;margin: 10px;background-color: rgba(247,247,247,0.46);">
      <div slot="header" style="text-align: center;height: 8vh;font-size: large; line-height: 8vh;  ">好友助力</div>
      <div slot="content" style="max-height:30vh; overflow-y:scroll;">
        <x-table :cell-bordered="false" style="border-radius: 20px">
          <tbody>
          <tr v-for="(item,index) in BargainRecords" :key="index">
            <td width="20%" style="padding-top:10px;"><img :src="item.PhotoUrl" style="border-radius:50%;width: 8vw;height: 8vw;"/></td>
            <td width="20%" style="">{{item.Name}}</td>
            <td width="60%">¥{{item.Money}}</td>
          </tr>
          </tbody>
        </x-table>
      </div>
    </card>

    <!--悬浮_活动规则-->
    <button style="text-align:center;position: fixed;right: 5vw;top:40vh;border:0;background-color: rgba(56,56,56,0)"><img src="../assets/icon/活动规则.png" width="30" height="30" @click="OpenHelp"/></button>
    <div id="hiddenHelp" style="text-align:center;position:fixed;right:0px;top:0px;height: 100vh;width: 100vw;background-color: rgba(0,0,0,0.51);display: none">
      <div class="ActivityIntroBg">
        <button style="border:0;background-color: rgba(56,56,56,0);height: 8vw;width: 8vw;float:right;margin-right: 5%;margin-top: 5%" @click="CloseHelp"><img src="../assets/关闭UI.png" style="width: 100%;height: 100%"/></button>
        <div style="padding-top: 8vh;padding-left: 2vw;padding-right: 2vw" v-html="ActivityIntro"></div>
      </div>
    </div>

    <!--悬浮_客服-->
    <button style="text-align:center;position: fixed;right: 5vw;top:50vh;border:0;background-color: rgba(56,56,56,0)"><img src="../assets/icon/微信.png" width="30" height="30" @click="OpenQrcode"/></button>
    <div id="hiddenDiv" style="position: fixed;right: 10vw;top: 20vh;height:50vh; width:50vh;display: none" >
      <button style="border:0;background-color: rgba(56,56,56,0);height: 10%;width: 10%;float: right" @click="CloseQrcode"><img src="../assets/关闭UI.png" style="width: 100%;height: 100%"/></button>

      <img src="../assets/qrcode/客服二维码.jpg"  style="height: 100%;width: 100%"/>
      <div style="text-align: center;font-size: medium;background-color: #ffffff;color: #ff6e00;"><span>ps:有任何问题请扫描二维码咨询客服</span></div>

    </div>
  </div>
</template>

<script>
  import { Card,Flexbox,FlexboxItem,Icon,XButton,Divider,Box,XTable, LoadMore,Popover,AlertModule, Alert,Confirm } from 'vux'
  export default {
    components: {
      Confirm,
      AlertModule,
      Alert,
      Popover,
      XTable,
      LoadMore,
      Box,
      Card,
      Flexbox,
      FlexboxItem,
      Icon,
      Divider,
      XButton
    },
    data () {
      return {
        //信息列表
        CouponID:0,
        CouponName:'',
        CouponIntro:'',
        CouponBasicPrice:0,
        CouponMostPrice:0,
        CouponCurrentPrice:0,
        CouponBeginTime:'',
        CouponEndTime:'',
        BargainRecords:[{
          PhotoUrl:'',
          Name:'',
          Money:0,
        }],
        BargainHasCut:0,
        BargainCanCut:0,
        BargainPercent:0,

        AccountPhoto:'',
        AccountName:'',

        ActivityIntro:'',

        //操作标记
        ShowHelpMsg:false,

        //使用的变量信息
        UseConfirm:false,
        UseUrl:"",
      }
    },
    created(){
      this.LoadMessage();
    },

    methods: {
      OpenQrcode:function () {
        var div = document.getElementById("hiddenDiv").style.display;
        if(div=='none'){
          document.getElementById("hiddenDiv").style.display='block';
        }
      },
      CloseQrcode:function () {
        var div = document.getElementById("hiddenDiv").style.display;
        if(div!='none'){
          document.getElementById("hiddenDiv").style.display='none';
        }
      },
      OpenHelp:function () {
        var div = document.getElementById("hiddenHelp").style.display;
        if(div=='none'){
          document.getElementById("hiddenHelp").style.display='block';
        }
      },
      CloseHelp:function () {
        var div = document.getElementById("hiddenHelp").style.display;
        if(div!='none'){
          document.getElementById("hiddenHelp").style.display='none';
        }
      },

      LoadMessage:function () {
        let _this=this;
        _this.$data.CouponID=window.localStorage.getItem("CouponID");
        console.log(_this.$data.CouponID);

        this.$axios({
          methods: 'get',
          url:'/bargain/selfBargainMessage?couponsid='+_this.$data.CouponID,
        }).then(function(response){
          console.log("个人砍价页面的response↓");
          console.log(response);
          _this.LoadShareAbility();
          //加载券信息
          _this.CouponName=response.data.name;
          _this.CouponIntro=response.data.type;
          _this.CouponBasicPrice=response.data.basic;
          _this.CouponMostPrice=response.data.most;
          _this.CouponCurrentPrice=response.data.price;
          _this.CouponBeginTime=response.data.begintime;
          _this.CouponEndTime=response.data.endtime;

          _this.AccountPhoto=response.data.kjAccount.photo;
          _this.AccountName=response.data.kjAccount.name;

          _this.ActivityIntro=response.data.rule;

          _this.BargainHasCut=(_this.CouponCurrentPrice-_this.CouponBasicPrice).toFixed(2);
          _this.BargainCanCut=(_this.CouponMostPrice-_this.CouponCurrentPrice).toFixed(2);
          _this.BargainPercent=parseFloat((_this.BargainHasCut * 100/(_this.CouponMostPrice-_this.CouponBasicPrice)).toFixed(2));

          //加载助力列表
          _this.BargainRecords.length=0;
          for(let i=0;i<response.data.kjBargainrecords.length;i++)
          {
            let _photo=response.data.kjBargainrecords[i].photo;
            let _name=response.data.kjBargainrecords[i].name;
            let _money=response.data.kjBargainrecords[i].money;

            if(response.data.kjBargainrecords[i].name.length>3)
              _name=response.data.kjBargainrecords[i].name[0]+"**"+response.data.kjBargainrecords[i].name[response.data.kjBargainrecords[i].name.length-1];
            var temp={PhotoUrl:_photo,Name:_name,Money:_money};
            _this.BargainRecords.unshift(temp);
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      LoadShareAbility:function(){
        let _this=this;

        _this.$axios({
          methods:'get',
          url:'/personalPage/createBargainPage?couponsid='+_this.CouponID,
        }).then(function (response) {
          let url=response.data.url;
          let title = response.data.title;
          let content = response.data.content;
          //设置右上角Menu的分享接入口

          //分享给好友
          _this.$wechat.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: content, // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://ixmu.xmu.edu.cn/kjxt/OTA/ShareIcon.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              console.log(1);
              // 用户点击了分享后执行的回调函数
            },
            fail:function (error) {
              console.error(error);
            }
          });
          _this.LoadFriendShareAbility();

          //隐藏部分接口
          // _this.$wechat.hideAllNonBaseMenuItem();
          // _this.$wechat.showMenuItems({
          //   menuList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 要显示的菜单项，所有menu项见附录3
          // });
          // “基本类”按钮详见附录3

        })// wechat choosePay
      },
      LoadFriendShareAbility:function(){
        //分享到朋友圈
        let _this=this;

        _this.$axios({
          methods:'get',
          url:'/personalPage/createBargainPage?couponsid='+_this.CouponID,
        }).then(function (response) {
          let url = response.data.url;
          let title = response.data.title;
          let content = response.data.content;
          //设置右上角Menu的分享接入口

          //分享给朋友圈
          _this.$wechat.onMenuShareTimeline({
            title: title, // 分享标题
            desc: content, // 分享描述
            link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://ixmu.xmu.edu.cn/kjxt/OTA/ShareIcon.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              console.log(1);
              // 用户点击了分享后执行的回调函数
            },
            fail: function (error) {
              console.error(error);
              }
            });
        });
      },

      //点击使用
      ClickToUseThisCoupon(){
        this.$router.push({name:'MySelf'});
      },

      //点击使用
      ClickToShowConfirmMsg:function(){
        this.UseUrl="kjxt/shopPage/createCode?couponsid="+this.CouponID+"&width=200&height=200";
        this.UseConfirm=true;
        console.log(this.UseUrl);
      },
    }
  }
</script>

<style>
  .main{
    width:100%;
    min-height: 100%;
    border:hidden;
    overflow:hidden;
    background: url('../assets/bg1.jpg');
    background-size:100% 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .ActivityIntroBg{
    width: 70vw;
    height: 90vh;
    border-radius: 10px;
    background: url('../assets/1.png');
    background-repeat: no-repeat;
    background-size: 100%;
    margin-left:auto;
    margin-right:auto;
    margin-top: 5vh;
  }
  .CouponBg{
    width: 80vw;
    height: 15vh;
    background: url("../assets/优惠券.png");
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
