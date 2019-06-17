<template>
  <div id="successPage">
    <div style="margin-top:10vh;">
      <div style="width:93px;margin-left:auto;margin-right:auto">
        <img src="http://172.27.65.52:8081/shopPage/createCode?couponsid=1&width=100&height=100" alt="">
      </div>
      <div style="margin-left: auto;margin-left: auto;margin-top: 6vh;text-align: center">
        <!--<flow>-->
          <!--<flow-state state="1" title="已付款" is-done></flow-state>-->
          <!--<flow-line is-done></flow-line>-->
          <!--<flow-state state="2" title="已收货" is-done></flow-state>-->
          <!--<flow-line is-done></flow-line>-->
          <!--<flow-state state="3" title="已完成" is-done></flow-state>-->
        <!--</flow>-->
        <p>完成一单 , 再接再厉 !</p>
      </div>
      <div style="margin-left: auto;margin-left: auto;margin-top: 20vh;text-align: center">
        <el-button type="success" @click="goBack">返回主页</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import { Icon } from 'vux'
  import { Flow, FlowState, FlowLine } from 'vux'
  export default {
      name: "SuccessPage",
      components: {
        Icon,
        Flow,
        FlowState,
        FlowLine
      },
    data(){
        return{
          p:'',
        }
    },
    created(){
        this.getCoupon("1","1");
    },
    methods:{
        goBack:function () {
          this.$router.push('/');//返回到主页面
        },
      getCoupon(status,couponsid){
        let _this=this;
        _this.$axios({
          method:'get',
          url:'/shopPage/createCode?couponsid='+couponsid+'&width=500&height=500',
        }).then(function (response) {
          //console.log(response.data);
          //console.log(encodeURI(response.data));
          _this.$data.p="data:image/png;base64,"+encodeURI(response.data).toString();
        }).catch(function (error) {
          console.log(error.response.data);
        });
      },
    }
  }
</script>

<style scoped>
  #successPage{
    height:100%;
    width:100%;
    border:hidden;
    overflow:hidden;
  }

</style>
