<template>

</template>

<script>
    export default {
      name: "wxConfig",
      data(){
        return{
          //公司的
          AppID:'wxe539606fcc70dfaa',
          //AppSecret:'1b70af7e2c5b5002c9586f2d9ea34c92',

          //测试号的
          //AppID:'wxb2dbcb798b702b62',
          //AppSecret:'eb05179771f8d5b3be538d4720501a89',

          signature:'',
          noncestr:'',
          timestamp:'',
          url:'',

        }
      },
      created(){
        this.wxConfigNew();
      },
      methods:{
        // getAccessToken(){
        //   let _this=this;
        //   this.$axios({
        //     method:'get',
        //     url:'http://localhost:80/getSign',
        //   }).then(function (response) {
        //     //console.log(response.data);
        //     _this.$data.noncestr=response.data.noncestr;
        //     _this.$data.timestamp=response.data.timestamp;
        //     _this.$data.url=response.data.url;
        //     _this.$data.signature=response.data.signature;
        //     _this.wxConfigNew();
        //   }).catch(function (error) {
        //     console.log(error.response.data);
        //   });
        // },

        wxConfigNew(){
          let _this=this;
          console.log(location.href.split('#')[0]);
          _this.$axios({
            method: 'post',
            url: 'http://tyj.natapp1.cc/getSign',
            data: {
              myUrl: location.href.split('#')[0],
            }
          })
            .then(function(response){
              _this.$wechat.config({
                debug: true,
                appId: "wxe539606fcc70dfaa",
                // timestamp: response.data.timestamp,
                // nonceStr: response.data.nonceStr,
                // signature: response.data.signature,
                // timestamp: response.data.timestamp,
                // nonceStr: response.data.nonceStr,
                // signature: response.data.signature,
                timestamp: "1534408865",
                nonceStr: "b3faa75a-e0d1-4b41-a967-3fdda622ef2f",
                signature: "034c60bfa74f5c3525926e5c3dbd9287009a3eab",
                jsApiList: ["chooseWXPay"]
              })
              _this.$axios({
                method: 'get',
                url: 'http://172.27.65.52:8686/xsyg/pay/pre',
                params: {
                  total_fee: 1,
                  //body: '12345'
                }
              })
                .then(function(res){
                  console.log(res.data);
                  alert("执行到支付处");
                  _this.$wechat.chooseWXPay({
                    appId: "wxe539606fcc70dfaa",
                    timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: res.data.nonce_str, // 支付签名随机串，不长于 32 位
                    package: "prepay_id="+res.data.prepay, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: res.data.sign, // 支付签名

                    success: function (res) {
                      //支付成功后的回调函数
                      if (res.errMsg == "chooseWXPay:ok") {
                        //支付成功
                        alert('支付成功');
                      } else {
                        alert(res.errMsg);
                      }
                    },
                    cancel: function(res) {
                      //支付取消
                      alert('支付取消');
                    }
                  })
                })
                .catch(function(){

                })

            })
            .catch(function(error){
              console.log(error)
            })
        },

        //微信配置
        // wxConfig(){
        //   let _this=this;
        //
        //   this.$wechat.config({
        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     // appId: _this.$data.AppID, // 必填，公众号的唯一标识
        //     // timestamp:_this.$data.timestamp , // 必填，生成签名的时间戳
        //     // nonceStr:_this.$data.noncestr, // 必填，生成签名的随机串
        //     // signature:_this.$data.signature,// 必填，签名
        //     appId: _this.$data.AppID, // 必填，公众号的唯一标识
        //     timestamp:"1534402620" , // 必填，生成签名的时间戳
        //     nonceStr:"e83c93c0e13047e0", // 必填，生成签名的随机串
        //     signature:"2815fc9087400e6319e3dbf5f62831403074393a",// 必填，签名
        //     jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
        //   });
        //   this.$wechat.ready(function(){
        //     console.log("成功");
        //     _this.$wechat.chooseWXPay({
        //       appId: 'wxe539606fcc70dfaa',
        //       timestamp: '1534389999224', // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        //       nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS', // 支付签名随机串，不长于 32 位
        //       package: 'prepay_id=wx16112245897688153e524b861039787652', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        //       signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        //       paySign: '4920135C4AA0ADF0AEEE426784FABC85', // 支付签名
        //       success: function (res) {
        //         // 支付成功后的回调函数
        //         if (res.errMsg == "chooseWXPay:ok") {
        //           //支付成功
        //           alert('支付成功');
        //         } else {
        //           alert(res.errMsg);
        //         }
        //       },
        //       cancel: function(res) {
        //         //支付取消
        //         alert('支付取消');
        //       }
        //     })
        //     // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        //   });
        //   this.$wechat.error(function(res){
        //     console.log("配置失败");
        //     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        //   });
        // },

        //微信付款
        wxPay(){
          // this.$wechat.WeixinJSBridge.invoke(
          //   'getBrandWCPayRequest', {
          //     "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
          //     "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
          //     "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
          //     "package":"prepay_id=u802345jgfjsdfgsdg888",
          //     "signType":"MD5",         //微信签名方式：
          //     "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
          //   },
          //   function(res){
          //     if(res.err_msg.toString() === "get_brand_wcpay_request:ok" ){
          //       // 使用以上方式判断前端返回,微信团队郑重提示：
          //       //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          //     }
          //   });

          // this.$wechat.chooseWXPay({
          //     timestamp: '', // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          //     nonceStr: '', // 支付签名随机串，不长于 32 位
          //     package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          //     signType: "MD5", // 签名方式，默认为´SHA1´，使用新版支付需传入´MD5´
          //     paySign: '', // 支付签名
          //     success: function (res) {
          //     if(res.errMsg.toString() === "chooseWXPay:ok"){
          //       console.log("支付成功")
          //     }else{
          //       alert(res.errMsg);
          //     }
          //   },
          //   cancel: function(res){
          //     alert('取消支付');
          //   }
          // });
        },


      },

    }
</script>

<style scoped>

</style>
