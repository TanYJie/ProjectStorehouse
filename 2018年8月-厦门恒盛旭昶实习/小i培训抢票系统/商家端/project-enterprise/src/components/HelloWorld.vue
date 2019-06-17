<template>
  <div id="HelloWorld">
    <div class="vux-demo" style="margin-top: 10vh" >
      <img class="logo" src="../assets/beike_logo.png">
    </div>
    <div style="margin-top: 10vh;margin-left:auto;margin-right:auto;width: 80%">
      <group title="请输入密码">
        <x-input v-model="value"></x-input>
      </group>
      <div style="margin-top: 10vh;text-align: center;">
        <el-button type="primary" @click="submitData">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>

    import { XInput } from 'vux'
    import { XButton } from 'vux'
    import { AlertModule, Alert, Group,ConfirmPlugin } from 'vux'
    const SecretNumber="sanduo123";
    import app from "../App";

    export default {
    name: 'HelloWorld',
    components: {
      Group,
      XInput,
      XButton,
      Alert,
      ConfirmPlugin
    },
    data () {
       return {
         value:''
       }
    },
    created(){
      this.CheckSecretNumber();
    },

    methods:{
      //提交校验码
      submitData:function () {
          let _this=this;
          var data=_this.$data.value;

          //输入为空时弹窗============================
          if(typeof(_this.$data.value) == "undefined"){
            _this.showModule("请输入校验码!");
            setTimeout(() => {
              AlertModule.hide()
            }, 3000)
            return;
          }
          if(data===""){
            _this.showModule("请输入校验码!");
            setTimeout(() => {
              AlertModule.hide()
            }, 3000)
            return;
          }

          this.$axios({
            method:'get',
            url:'/order/getOrderByCode?code='+data.toString(),

          }).then(function (response) {
            console.log(response.data);
            let data=response.data;
            if(data.exist.toString()==="false"){
              _this.showModule("没有找到相应记录!")
            }
            else if(data.exist.toString()==="true"){
              _this.$data.buyerInfo.buyerName=data.name;
              _this.$data.buyerInfo.buyerTel=data.phone;
              _this.$data.buyerInfo.buyerGoods=data.goods;
              _this.$data.buyerInfo.buyerMoney=data.money;

              window.localStorage.setItem("buyerName",_this.$data.buyerInfo.buyerName);
              window.localStorage.setItem("buyerTel",_this.$data.buyerInfo.buyerTel);
              window.localStorage.setItem("buyerGoods",_this.$data.buyerInfo.buyerGoods);
              window.localStorage.setItem("buyerMoney",_this.$data.buyerInfo.buyerMoney);
              window.localStorage.setItem("code",_this.$data.value);
              _this.$router.push('/ConfirmOrder');
            }

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

      CheckSecretNumber(){
        let _this=this;
        console.log("1");
        this.$vux.confirm.show({
          // 组件除show外的属性
        })

        this.$prompt('请输入管理员密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value===SecretNumber)
          {
            _this.$message({
              type: 'success',
              message: '登录成功',
            });
            app.methods.addCookie("IsAdminister","true",0);
          }
          else
          {
            _this.$message({
              type: 'error',
              message: '口令错误，请重新输入',
            });
            _this.CheckSecretNumber();
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已返回首页'
          });
          _this.CheckSecretNumber();
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }

  #HelloWorld{
    height:100%;
    width:100%;
    border:hidden;
    overflow:hidden;
  }
</style>
