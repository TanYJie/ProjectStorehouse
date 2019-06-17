<template>
  <div class="coupon">
    <!--添加框-->
    <div style="margin-top: 40px; padding:16px; text-align: left;width: 90%;margin-left: auto;margin-right: auto">
      <el-button type="success"  size="small" icon="el-icon-plus" @click="newCoupon">添加券</el-button>
    </div>
    <!--表格-->
    <div style="margin-top: 10px">
      <el-table :data="tableData" fit border stripe style="width: 90%;margin-left: auto;margin-right: auto">
        <el-table-column prop="ID" label="券ID" sortable width="200px"></el-table-column>
        <el-table-column prop="name" label="券名" width="200px"></el-table-column>
        <el-table-column prop="minValue" label="券初始价值" width="200px" sortable></el-table-column>
        <el-table-column prop="maxValue" label="券最高额度" width="200px" sortable></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="confirmDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新建券信息" :visible.sync="newDialogFormVisible" width="40%" style="text-align: left">
      <el-form :model="newform" :rules="rules">
        <el-form-item label="券名" :label-width="formLabelWidth" prop="newName">
          <el-input v-model="newform.newName" auto-complete="off" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="券介绍" :label-width="formLabelWidth" prop="newIntro">
          <el-input v-model="newform.newIntro" type="textarea" :rows="3" auto-complete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="券价值" :label-width="formLabelWidth" required>
          <el-input v-model="newform.newMinValue" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
          ~
          <el-input v-model="newform.newMaxValue" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="砍价时间范围" :label-width="formLabelWidth" prop="newBargainTime">
          <el-input v-model="newform.newBargainTime" auto-complete="off" style="width: 50%">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <!--<el-form-item label="券开始时间" :label-width="formLabelWidth" prop="newBeginTime">-->
          <!--<el-date-picker-->
            <!--v-model="newform.newBeginTime"-->
            <!--type="date"-->
            <!--value-format="yyyy-MM-dd"-->
            <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="券结束时间" :label-width="formLabelWidth" prop="newEndTime">-->
          <!--<el-date-picker-->
            <!--v-model="newform.newEndTime"-->
            <!--type="date"-->
            <!--value-format="yyyy-MM-dd"-->
            <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <el-form-item label="券使用时间" :label-width="formLabelWidth" prop="newUseTime" required>
          <el-input v-model="newform.newUseTime" auto-complete="off" style="width: 50%">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="券领取频率" :label-width="formLabelWidth" prop="newBetweenTime">
          <el-input v-model="newform.newBetweenTime" auto-complete="off" style="width: 50%">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="游客砍价范围" :label-width="formLabelWidth" required>
          <el-input v-model="newform.newLow" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
          ~
          <el-input v-model="newform.newHigh" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="学生砍价范围" :label-width="formLabelWidth" required>
          <el-input v-model="newform.newStuLow" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
          ~
          <el-input v-model="newform.newStuHigh" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="券分享标题" :label-width="formLabelWidth" prop="newIntro">
          <el-input v-model="newform.newShareTitle" auto-complete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="券分享内容" :label-width="formLabelWidth" prop="newIntro">
          <el-input v-model="newform.newShareContent" type="textarea" :rows="3" auto-complete="off" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmNew('ruleForm')">确 定</el-button>
        <el-button @click="newDialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑券信息" :visible.sync="editDialogFormVisible" width="40%" style="text-align: left">
      <el-form :model="form">
        <el-form-item label="券ID" :label-width="formLabelWidth">
          <el-input v-model="form.formID" auto-complete="off" style="width: 50%" disabled></el-input>
        </el-form-item>
        <el-form-item label="券名" :label-width="formLabelWidth">
          <el-input v-model="form.formName" auto-complete="off" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="券介绍" :label-width="formLabelWidth">
          <el-input v-model="form.formIntro" type="textarea" :rows="3" auto-complete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="券价值" :label-width="formLabelWidth">
          <el-input v-model="form.formMinValue" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
          ~
          <el-input v-model="form.formMaxValue" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="砍价时间范围" :label-width="formLabelWidth">
          <el-input v-model="form.formBargainTime" auto-complete="off" style="width: 50%">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <!--<el-form-item label="券开始时间" :label-width="formLabelWidth">-->
          <!--<el-date-picker-->
            <!--v-model="form.formBeginTime"-->
            <!--type="date"-->
            <!--value-format="yyyy-MM-dd"-->
            <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="券结束时间" :label-width="formLabelWidth">-->
          <!--<el-date-picker-->
            <!--v-model="form.formEndTime"-->
            <!--type="date"-->
            <!--value-format="yyyy-MM-dd"-->
            <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <el-form-item label="券使用时间" :label-width="formLabelWidth">
          <el-input v-model="form.formUseTime" auto-complete="off" style="width: 50%">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="券领取频率" :label-width="formLabelWidth">
          <el-input v-model="form.formBetweenTime" auto-complete="off" style="width: 50%">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="游客砍价范围" :label-width="formLabelWidth">
          <el-input v-model="form.formLow" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
          ~
          <el-input v-model="form.formHigh" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="学生砍价范围" :label-width="formLabelWidth">
          <el-input v-model="form.formStuLow" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
          ~
          <el-input v-model="form.formStuHigh" auto-complete="off" style="width: 40%">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="券分享标题" :label-width="formLabelWidth" prop="newIntro">
          <el-input v-model="form.formShareTitle" auto-complete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="券分享内容" :label-width="formLabelWidth" prop="newIntro">
          <el-input v-model="form.formShareContent" type="textarea" :rows="3" auto-complete="off" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
    export default {
        name: "couponEdit",
        created(){
          this.loadAllCoupon();
        },
        data() {
          return {
            shopID:'',//商家ID
            formLabelWidth: '120px',
            newDialogFormVisible:false,
            editDialogFormVisible:false,

            tableData:[{  //表格数据
              ID:"",
              name:"",
              intro:"",
              maxValue:"",
              minValue:"",
              bargainTime:"", //砍价时间范围
              beginTime:"",   //券开始时间
              endTime:"",     //券结束时间
              useTime:"",
              betweenTime:"", //领取频率
              low:"",
              high:"",
              stuLow:"",
              stuHigh:"",
              shareTitle:"",
              shareContent:"",
            }],

            newform:{  //新建框的数据
              newName:"",
              newIntro:"",
              newMaxValue:"",
              newMinValue:"",
              newBargainTime:"", //砍价时间范围
              newBeginTime:"",   //券开始时间
              newEndTime:"",     //券结束时间
              newUseTime:"",     //券使用时间
              newBetweenTime:"", //领取频率
              newLow:"",
              newHigh:"",
              newStuLow:"",
              newStuHigh:"",
              newShareTitle:"",
              newShareContent:"",
            },
            form:{  //编辑框的数据
              formID:"",
              formName:"",
              formIntro:"",
              formMaxValue:"",
              formMinValue:"",
              formBargainTime:"", //砍价时间范围
              formBeginTime:"",   //券开始时间
              formEndTime:"",     //券结束时间
              formUseTime:"",     //新的券使用时间
              formBetweenTime:"", //领取频率
              formLow:"",
              formHigh:"",
              formStuLow:"",
              formStuHigh:"",
              formShareTitle:"",
              formShareContent:"",
            },

            rules: {
              newName: [
                { required: true, message: '请填券名', trigger: 'change' }
              ],
              newIntro: [
                { required: true, message: '请填介绍', trigger: 'change' }
              ],
              newBargainTime: [
                { required: true, message: '请填', trigger: 'change' }
              ],
              newBetweenTime :[
                { required: true, message: '请填', trigger: 'change' }
              ],
            }

          }
        },

        methods:{

          //加载所有的券
          loadAllCoupon:function() {
            let _this=this;
            let shopID=localStorage.getItem("shopID");
            _this.$data.shopID=shopID;
            this.$axios({
              method:'get',
              url:'/admin/getShopMessage?shopid='+shopID,
            }).then(function (response) {
              console.log("CouponEdit:");
              console.log(response.data);
              let res=response.data;
              _this.$data.tableData=[];
              for(var i=0;i<res.coupons.length;i++){
                var newItem={
                  ID:res.coupons[i].couponsid,
                  name:res.coupons[i].name,
                  intro:res.coupons[i].type,
                  minValue:res.coupons[i].basic,
                  maxValue:res.coupons[i].most,
                  bargainTime:res.coupons[i].bargaintime, //砍价时间范围
                  beginTime:"",   //券开始时间
                  endTime:"",     //券结束时间
                  useTime:res.coupons[i].usetime,     //新券使用时间
                  betweenTime:res.coupons[i].betweentime, //领取频率
                  low:res.coupons[i].low,
                  high:res.coupons[i].high,
                  stuLow:res.coupons[i].stulow,
                  stuHigh:res.coupons[i].stuhigh,
                  shareTitle:res.coupons[i].title,
                  shareContent:res.coupons[i].content,
                };
                _this.$data.tableData.push(newItem);
              }
            }).catch(function (error) {
              console.log(error.response.data);
            });
          },
          //新建一个券
          newCoupon:function () {
            let _this=this;
            _this.$data.newDialogFormVisible=true;
          },
          //新建后的确定
          confirmNew:function(){
            let _this=this;
            _this.$confirm('确定要创建该商品吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let newData=_this.$data.newform;
              console.log(newData);
              _this.$axios({
                method:'post',
                url:'/admin/newCoupons',
                headers:{
                  'Content-Type':'application/json;'
                },
                data:{
                  name:newData.newName,
                  type:newData.newIntro,
                  basic:newData.newMinValue,
                  most:newData.newMaxValue,
                  bargaintime:newData.newBargainTime,
                  begin:"",
                  end:"",
                  usetime:newData.newUseTime.toString(),
                  betweenTime:newData.newBetweenTime,
                  low:newData.newLow,
                  high:newData.newHigh,
                  stulow:newData.newStuLow,
                  stuhigh:newData.newStuHigh,
                  shopid:_this.$data.shopID,
                  title:newData.newShareTitle,
                  content:newData.newShareContent,
                }
              }).then(function (response) {
                console.log(response.data);
                var newItem={
                  name:newData.newName,
                  intro:newData.newIntro,
                  maxValue:newData.newMaxValue,
                  minValue:newData.newMinValue,
                  bargainTime:newData.newBargainTime, //砍价时间范围
                  beginTime:"",   //券开始时间
                  endTime:"",     //券结束时间
                  useTime:newData.newUseTime.toString(),
                  betweenTime:newData.newBetweenTime, //领取频率
                  low:newData.newLow,
                  high:newData.newHigh,
                  stuLow:newData.newStuLow,
                  stuHigh:newData.newStuHigh,
                  shareTitle:newData.newShareTitle,
                  shareContent:newData.newShareContent,
                };
                _this.$data.tableData.unshift(newItem);//在表格中加入数据
                _this.$message({
                  type: 'success',
                  message: '成功创建该券!'
                });
                _this.$data.newDialogFormVisible=false;
                _this.$data.newform={};
              }).catch(function (error) {
                console.log(error.response.data)
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消创建或创建出错'
              });
            });
          },
          //编辑一个券
          handleEdit:function (index, row){
            let _this=this;
            _this.$data.form.formID=row.ID;
            _this.$data.form.formName=row.name;
            _this.$data.form.formIntro=row.intro;
            _this.$data.form.formMaxValue=row.maxValue;
            _this.$data.form.formMinValue=row.minValue;
            _this.$data.form.formBargainTime=row.bargainTime; //砍价时间范围
            _this.$data.form.formBeginTime="";   //券开始时间
            _this.$data.form.formEndTime="";     //券结束时间
            _this.$data.form.formUseTime=row.useTime;     //新 券使用时间
            _this.$data.form.formBetweenTime=row.betweenTime; //领取频率
            _this.$data.form.formLow=row.low;
            _this.$data.form.formHigh=row.high;
            _this.$data.form.formStuLow=row.stuLow;
            _this.$data.form.formStuHigh=row.stuHigh;
            _this.$data.form.formShareTitle=row.shareTitle;
            _this.$data.form.formShareContent=row.shareContent;
            _this.$data.editDialogFormVisible = true;
            _this.$data.currentIndex=index;//分页要换算当前Index
            console.log("currentIndex="+_this.$data.currentIndex);
          },
          //编辑后的确定
          confirmEdit:function (){
            this.$confirm('确定要修改该券吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let _this=this;
              let form=_this.$data.form;
              _this.$axios({
                method:'post',
                url:'/admin/editCoupons',
                headers:{
                  'Content-Type':'application/json;'
                },
                data:{
                  couponsid:form.formID.toString(),
                  name:form.formName,
                  type:form.formIntro,
                  basic:form.formMinValue.toString(),
                  most:form.formMaxValue.toString(),
                  bargaintime:form.formBargainTime.toString(),
                  begin:"",
                  end:"",
                  usetime:form.formUseTime.toString(),
                  betweenTime:form.formBetweenTime,
                  low:form.formLow,
                  high:form.formHigh,
                  stulow:form.formStuLow,
                  stuhigh:form.formStuHigh,
                  shopid:_this.$data.shopID,
                  title:form.formShareTitle,
                  content:form.formShareContent,
                }
              }).then(function (response) {
                console.log(response.data);
                let currentIndex=_this.$data.currentIndex;
                let form=_this.$data.form;
                  _this.$data.tableData[currentIndex].ID=form.formID.toString();
                  _this.$data.tableData[currentIndex].name=form.formName;
                  _this.$data.tableData[currentIndex].intro=form.formIntro;
                  _this.$data.tableData[currentIndex].maxValue=form.formMaxValue.toString();
                  _this.$data.tableData[currentIndex].minValue=form.formMinValue.toString();
                  _this.$data.tableData[currentIndex].bargainTime=form.formBargainTime.toString(); //砍价时间范围
                  _this.$data.tableData[currentIndex].beginTime=form.formBeginTime.toString(); //券开始时间
                  _this.$data.tableData[currentIndex].endTime=form.formEndTime.toString();     //券结束时间
                  _this.$data.tableData[currentIndex].useTime=form.formUseTime.toString();     //新券 使用时间
                  _this.$data.tableData[currentIndex].betweenTime=form.formBetweenTime; //领取频率
                  _this.$data.tableData[currentIndex].low=form.formLow;
                  _this.$data.tableData[currentIndex].high=form.formHigh;
                  _this.$data.tableData[currentIndex].stuLow=form.formStuLow;
                  _this.$data.tableData[currentIndex].stuHigh=form.formStuHigh;
                  _this.$data.tableData[currentIndex].shareTitle=form.formShareTitle;
                  _this.$data.tableData[currentIndex].shareContent=form.formShareContent;

                _this.$data.editDialogFormVisible = false;
              }).catch(function (error) {
                console.log(error.response.data)
              });
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消修改或修改出错'
              });
            });
          },
          //删除时弹框确定
          confirmDelete:function(index, row){
            let _this=this;
            this.$confirm('此操作将永久删除该券, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.handleDelete(index,row);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          //删除一个订单
          handleDelete:function (index, row) {
            let _this=this;
            let couponsID=row.ID;
            this.$axios({
              method:'get',
              url:'admin/deleteCou?couponsid='+couponsID,
            }).then(function (response) {
              console.log(response.data);
              _this.tableData.splice(index,1);
            }).catch(function (error) {
              console.log(error.response.data)
            })
          },
        }
    }
</script>

<style scoped>

</style>
