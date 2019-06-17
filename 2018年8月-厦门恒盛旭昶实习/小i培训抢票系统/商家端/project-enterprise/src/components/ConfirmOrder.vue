<template>
  <div id="ConfirmOrder">
    <group label-width="5em" title="订单信息">
      <cell primary="content" title="姓名" align-items="flex-start" :value="buyerInfo.stuName"></cell>
      <!--<cell primary="content" title="学号" align-items="flex-start" :value="buyerInfo.stuNumber"></cell>-->
      <cell primary="content" title="电话" align-items="flex-start" :value="buyerInfo.stuTel"></cell>
      <cell primary="content" title="商家名" align-items="flex-start" :value="buyerInfo.shopName"></cell>
      <cell primary="content" title="券名" align-items="flex-start" :value="buyerInfo.couponName"></cell>
      <cell primary="content" title="当前额度" align-items="flex-start" :value="buyerInfo.currentMoney"></cell>
    </group>
    <div style="margin-top: 5vh;text-align: center;">
      <el-button style="margin-right:10px" type="success" @click="submitData" round>确认</el-button>
      <el-button type="primary" @click="goBack" round>返回</el-button>
    </div>

    <div>
      <confirm title="确认已经付款吗?" v-model="showConfirm" @on-cancel="onCancel" @on-confirm="onConfirm"></confirm>
    </div>
  </div>
</template>

<script>

  import { XInput } from 'vux'
  import { XButton } from 'vux'
  import { Confirm,Cell,AlertModule, Alert, Group} from 'vux'

  export default {
    name: "ConfirmOrder",
    components: {
      Group,
      XInput,
      XButton,
      Alert,
      Cell,
      Confirm,
    },
    data(){
      return {
        buyerInfo:{
          stuName:'',
          // stuNumber:'',
          stuTel:'',
          shopName:'',
          couponName:'',
          currentMoney:'',
        },

        value:'',

        showConfirm:false,//确认框是否可见
      }
    },
    created(){
      //通过HelloFromVux.vue传过来的数据初始化订单信息
      this.$data.buyerInfo.stuName=window.localStorage.getItem("stuName");
      //this.$data.buyerInfo.stuNumber=window.localStorage.getItem("stuNumber");
      this.$data.buyerInfo.stuTel=window.localStorage.getItem("stuTel");
      this.$data.buyerInfo.shopName=window.localStorage.getItem("shopName");
      this.$data.buyerInfo.couponName=window.localStorage.getItem("couponName");
      this.$data.buyerInfo.currentMoney=window.localStorage.getItem("currentMoney");
    },
    methods:{
      submitData:function () {
        let _this=this;
        console.log("submit");
        _this.$data.showConfirm=true;
      },
      goBack:function () {
        console.log("goBack!");
        this.$router.push('/');//返回到主页面
      },

      //确认框的确认触发的事件
      onConfirm:function(){
        let _this=this;
        _this.$data.showConfirm=false;
        this.$axios({
          method:'get',
          url:'/shopPage/confirm'

        }).then(function (response) {
          console.log(response.data);
          let data=response.data;
          if(data.toString()==='true'){
            _this.$router.push('/SuccessPage');//跳转到成功页面
          }
          else{
            _this.showModule("该订单存在错误,请核对");
          }
        }).catch(function (error) {
          console.log(error.response.data);
        });


      },
      //确认框的取消触发的事件
      onCancel:function(){
        let _this=this;
        _this.$data.showConfirm=false;
      },

      //弹窗提示,参数content为要弹出的信息
      showModule (content) {
        AlertModule.show({
          title: '',
          content:content,
        })
      },

    }
  }
</script>

<style scoped>
  #ConfirmOrder{
    height:100%;
    width:100%;
    border:hidden;
    overflow:hidden;
  }
</style>
