<template>
    <div>
      <el-row>
        <el-col :span="6">
          <el-card style="width: 300px">
            <img src="../assets/购物袋.png" class="image">
            <div style="padding: 14px;">
              <span style="margin-left: 50px">预购系统</span>
              <div class="bottom clearfix">
                <el-button type="primary" size="small" style="float: right;margin-bottom: 10px" @click="goToXSYG">进入</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="width: 300px">
            <img src="../assets/砍价.png" class="image">
            <div style="padding: 14px;">
              <span style="margin-left: 50px">砍价系统</span>
              <div class="bottom clearfix">
                <el-button type="primary" size="small" style="float: right;margin-bottom: 10px" @click="goToKJXT">进入</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "entrance",
        data(){
          return{
            system:[
              {name:'预购系统',picture:''},
              {}
            ]
          }
        },
        methods:{
          //前往新生预购
          goToXSYG:function () {
            window.location.href="http://ixmu.xmu.edu.cn/test2/index.html#/admin";
          },
          //前往砍价系统
          goToKJXT:function () {
            this.$router.push("/");
          }
        }
    }
</script>

<style scoped>

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

</style>
