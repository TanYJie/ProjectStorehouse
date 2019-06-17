<template>
  <div id="app" style="">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    this.Initial();
  },
  methods:{

    Initial:function () {
      let _this=this;
      let myUrl = location.href.split('#')[0];
      _this.$axios({
        method: 'get',
        url: '/xsyg/getSign?url='+myUrl,
      }).then(function(r){
        _this.$wechat.config({
          appId: "wxe539606fcc70dfaa",
          timestamp: r.data.timestamp,
          nonceStr: r.data.noncestr,
          signature: r.data.sign,
          jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"]
        })
        _this.$wechat.ready(function(){
          console.log("配置成功");
          _this.$wechat.hideAllNonBaseMenuItem();
          _this.$wechat.showMenuItems({
            menuList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 要显示的菜单项，所有menu项见附录3
          });
        });// wechat choosePay
        _this.$wechat.error(function () {
          console.log("配置失败");
        })
      })// wechat ready
    }// getSign

  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
    //background-color: #FDF5E6;
    //background-color: red;
    /*width:100%;*/
  }
  #app{
    padding:0;
    margin:0;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    border:hidden;

  }

</style>
