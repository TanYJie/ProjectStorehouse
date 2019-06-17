<template>
  <el-collapse accordion>
    <el-collapse-item title="红之星驾校" name="1">
      <div style="border:1px solid rgba(200,200,169,0.6); padding: 10px;margin-right: 7px">
        <div>
          <span>商家简介</span>
          <el-button style="float: right;padding: 6px;margin-right: 5px" type="primary" size="mini">商家详情</el-button>
        </div>
      </div>
      <div style="border:2px solid rgba(200,200,169,0.6);background-color: #FDF5E6;
          padding: 10px;margin-right: 7px;margin-top: 10px;box-shadow:1px 1px 1px rgba(200,200,169,0.6) ">
        <p>券名</p>
        <span style="color: orangered">抵用</span>
        <span style="font-size:20px;color: orangered">50~100</span>
        <span style="color: orangered">RMB</span>
        <div style="height: 28px">
          <div style="float: right">
            <button class="getButton">
              <span style="font-weight: lighter;">立即领取</span>
            </button>
          </div>
        </div>
      </div>
    </el-collapse-item>

    <el-collapse-item title="ABC驾校" name="2">
      <div style="border:1px solid rgba(200,200,169,0.6); padding: 10px;margin-right: 7px">
        <div>
          <span>商家简介</span>
          <el-button style="float: right;padding: 6px;margin-right: 5px" type="primary" size="mini">商家详情</el-button>
        </div>
      </div>
    </el-collapse-item>

  </el-collapse>
</template>

<script>
    export default {
        name: "TrainOrganization"
    }
</script>

<style scoped>

  .getButton {
    background-color: orangered;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    font-size: 11px;
    border-radius: 40px;
    /*margin-right: 0;*/
    /*margin-left:62%;*/
  }
</style>
