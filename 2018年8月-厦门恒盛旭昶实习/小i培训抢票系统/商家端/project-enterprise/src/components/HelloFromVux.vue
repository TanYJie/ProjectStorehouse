<template>
  <div id="main" style="background-color: #FDF5E6;">
    <div class="vux-demo" style="margin-top: 10vh">
      <img class="logo" src="../assets/beike_logo.png">
    </div>
    <div style="margin-top: 10vh;margin-left:auto;margin-right:auto;width: 80%">
      <group title="请输入校验码">
        <x-input v-model="value"></x-input>
      </group>
      <!--<div style="margin-top: 10vh;text-align: center;">-->
        <!--<el-button type="primary" @click="submitData">确认</el-button>-->
      <!--</div>-->
    </div>
    <div>
      <confirm v-model="passWordInputShow"
               :close-on-confirm="closeOnConfirm"
               :show-cancel-button="showCancelButton"
               show-input
               ref="confirm5"
               title="请输入密码"
               @on-confirm="onConfirm5">
      </confirm>
    </div>

  </div>
</template>

<script>
import { XInput } from 'vux'
import { XButton } from 'vux'
import { AlertModule, Alert, Group,Confirm} from 'vux'

const SecretNumber="sanduo123";
import app from "../App";

export default {
  components: {
    Group,
    XInput,
    XButton,
    Alert,
    Confirm
  },
  data () {
    return {
      value:'',
      closeOnConfirm:false,
      passWordInputShow: true,
      showCancelButton:false,

      orderInfo:{
        stuName:'',
        stuNumber:'',
        stuTel:'',
        shopName:'',
        couponName:'',
        couponStatus:'',
        currentMoney:'',
      },

    }
  },
  created(){
    this.getInfo();
  },

  methods:{

    //获得订单信息
    getInfo:function(){
      let _this=this;
      this.$axios({
        method:'get',
        url:'/shopPage/getCouponsMessage'
      }).then(function (response) {
        console.log(response.data);
        var res=response.data;
        window.localStorage.setItem("stuName",res.name);
        //window.localStorage.setItem("stuNumber",res.studentid);
        window.localStorage.setItem("stuTel",res.phone);
        window.localStorage.setItem("shopName",res.shopname);
        window.localStorage.setItem("couponName",res.couponsname);
        window.localStorage.setItem("currentMoney",res.price);

      }).catch(function (error) {
        console.log(error.response.data);
      });
    },

    //弹窗提示
    showModule (content) {
      AlertModule.show({
        title: '',
        content:content,
      })
    },

    //输入密码
    onConfirm5 (value) {
      let _this=this;
      this.$refs.confirm5.setInputValue('');
      if(value.toString()===SecretNumber){
        //app.methods.addCookie("IsAdminister","true",0);
        //_this.$data.passWordInputShow=false;
        _this.$router.push('/ConfirmOrder')
      }
      else{
        _this.showModule("密码错误 , 请重试")
      }
      console.log('input value: ' + value);
    },
  }

}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}

  #main{
    height:100%;
    width:100%;
    border:hidden;
    overflow:hidden;
  }
</style>
