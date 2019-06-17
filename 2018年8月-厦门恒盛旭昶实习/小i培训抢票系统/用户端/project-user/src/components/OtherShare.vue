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
          <button class="getButton" @click="IWantToGet">
            <span>我也要Get!</span>
          </button>
        </div>
      </div>
    </el-card>

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

    <x-button :gradients="['#FF5E3A', '#FF9500']" style="margin-top: 5px;width: 50%;box-shadow: 5px 5px 5px #cf9236;" @click.native="AssistSuccessBig">用力一推</x-button>
    <x-button :gradients="['#FF5E3A', '#FF9500']" style="margin-top: 5px;width: 50%;box-shadow: 5px 5px 5px #cf9236;" @click.native="AssistSuccessLittle">轻轻助力</x-button>


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
        <div style="padding-top: 8vh;padding-left: 2vw;padding-right: 2vw">{{ActivityIntro}}</div>
      </div>
    </div>

    <!--悬浮_客服-->
    <button style="text-align:center;position: fixed;right: 5vw;top:50vh;border:0;background-color: rgba(56,56,56,0)"><img src="../assets/icon/微信.png" width="30" height="30" @click="OpenQrcode"/></button>
    <div id="hiddenDiv" style="position: fixed;right: 10vw;top: 20vh;height:50vh; width:50vh;display: none" >
      <button style="border:0;background-color: rgba(56,56,56,0);height: 10%;width: 10%;float: right" @click="CloseQrcode"><img src="../assets/关闭UI.png" style="width: 100%;height: 100%"/></button>
      <img src="../assets/qrcode/二维码.jpg"  style="height: 100%;width: 100%"/>
    </div>
  </div>
</template>

<script>
  import { Card,Flexbox,FlexboxItem,Icon,XButton,Divider,Box,XTable, LoadMore,Popover,AlertModule, Alert } from 'vux'
  export default {
    components: {
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

        ShopID:'',

        //变量
        CutLittlePrice:0,
        CutBigPrice:0,
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

        this.$axios({
          methods: 'get',
          url:'/bargain/bargainMessage',
        }).then(function(response){
          console.log(response);

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

          _this.ShopID=response.data.shopid;

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
          console.log(_this.BargainRecords);

        }).catch(function (error) {
          console.log(error);
        })
      },

      //轻轻助力按钮
      AssistSuccessLittle:function () {
        //更新当前数据，助力好友列表，价格数据，禁用该按钮
        let _this=this;

        //_this.CutLittlePrice=10;//测试数据
        _this.$axios({
          methods: 'get',
          url:'/bargain/bargainNormal',
        }).then(function (response) {
          console.log("轻轻助力后端访问成功");

          _this.CutLittlePrice=parseFloat(response.data);
          if(response.data===-1){
            AlertModule.show({
              title: '助力提示',
              content: '每个人只能助力一次噢',
            })

          }
          else if(response.data===-2)
          {
            AlertModule.show({
              title: '助力提示',
              content: '活动已逾期',
            })
          }
          else
          {
            _this.showModule('助力成功','你已成功为'+_this.AccountName+_this.CutLittlePrice+'元');
            // AlertModule.show({
            //   title: '助力成功',
            //   content: '你已成功为'+_this.AccountName+_this.CutLittlePrice+'元',
            // });
            // location.reload()
          }
        })
      },
      //用力一推按钮
      AssistSuccessBig:function () {
        //更新当前数据，助力好友列表，价格数据，禁用该按钮
        let _this=this;

        _this.CutBigPrice=20;//测试数据
        _this.$axios({
          methods: 'get',
          url:'/bargain/bargainSpecial',
        }).then(function (response) {
              console.log("用力一推后端访问成功");
              _this.CutBigPrice=parseFloat(response.data);
              if(response.data===-1){
                AlertModule.show({
                  title: '助力提示',
                  content: '每个人只能助力一次噢',
                })
              }
              else if(response.data===-2)
              {
                AlertModule.show({
                  title: '助力提示',
                  content: '活动已逾期',
                })
              }
              else if(response.data===-3)
              {
                window.location='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe539606fcc70dfaa&redirect_uri=http://ixmu.xmu.edu.cn/oauth_ixmu/kjxt_index&response_type=code&scope=snsapi_base&connect_redirect=1#wechat_redirect';
              }
              else
              {
                _this.showModule('助力成功','你已成功为'+_this.AccountName+_this.CutBigPrice+'元');
                // AlertModule.show({
                //   title: '助力成功',
                //   content: '你已成功为'+_this.AccountName+_this.CutBigPrice+'元',
                // });
                // location.reload();
              }
          })
      },

      //我也要get按钮
      IWantToGet:function () {
        let _this=this;
        _this.$axios({
          methods: 'get',
          url:'/bargain/meToo',
        }).then(function (response) {
          console.log(response);
          if(response.data.toString()==="turn"){
            window.localStorage.setItem("shopID",_this.ShopID);
            _this.$router.push({name:'sellTemplate'});
          }
          else if(response.data.toString()==="check"){
            window.location='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe539606fcc70dfaa&redirect_uri=http://ixmu.xmu.edu.cn/oauth_ixmu/kjxt_index&response_type=code&scope=snsapi_base&connect_redirect=1#wechat_redirect';
          }
        }).catch(function (error) {
          console.log(error);
        });
      },

      //弹窗提示函数,content为弹窗内容
      showModule(title,content) {
        AlertModule.show({
          title: title,
          content: content,
          onHide () {
            location.reload();
          }
        })
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
    /*background-color: #EDEDED;*/
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
