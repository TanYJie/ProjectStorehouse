n<template>
  <div class="hello">

  </div>
</template>

<script>
  const SecretNumber="why123456";
  import app from "../App";
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    let _this=this;
    _this.CheckSecretNumber();
  },
  methods:{
    //输入密码
    CheckSecretNumber(){
      let _this=this;
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
          this.$router.push('/admin');
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

</style>
