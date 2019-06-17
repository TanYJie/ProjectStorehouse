<template>
  <div class="orderEdit">
    <!--查询框-->
    <div style="margin-top: 40px; padding:16px; background-color: #E9EEF3; text-align: left;">
      <el-form :inline="true" :model="formInline" label-width="100px" style="height:160px" >
        <el-form-item label="学生号:" style="width:400px">
          <el-input v-model="formInline.searchStuNumber" ></el-input>
        </el-form-item>
        <el-form-item label="领券时间筛选:" style="width:500px">
          <el-date-picker
            v-model="formInline.searchGetCouponsTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名:" style="width:400px">
          <el-input v-model="formInline.searchStuName" ></el-input>
        </el-form-item>
        <el-form-item label="使用时间筛选:" style="width:500px">
          <el-date-picker
            v-model="formInline.searchUseCouponsTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态" style="width:600px">
          <template>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="未使用" border></el-checkbox>
              <el-checkbox label="已使用" border></el-checkbox>
              <el-checkbox label="已过期" border></el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item style="width:200px;float: right" >
          <el-button type="primary" size="small" icon="el-icon-search"
                     @click="search(formInline.searchStuName,formInline.searchStuNumber,formInline.searchGetCouponsTime,formInline.searchUseCouponsTime)">搜索</el-button>
          <el-button type="success" size="small" icon="el-icon-document" @click="pullOut(formInline.searchStuName,formInline.searchStuNumber,formInline.searchGetCouponsTime,formInline.searchUseCouponsTime)">导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--表格数据-->
    <div style="margin-top: 40px">
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" max-height="480" height="500" border style="width: 100%" >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" style="text-align: left">
              <el-form-item label="姓名：">
                <span>{{ props.row.stuName }}</span>
              </el-form-item>
              <el-form-item label="学号：">
                <span>{{ props.row.stuNumber }}</span>
              </el-form-item>
              <el-form-item label="联系方式：">
                <span>{{ props.row.stuTel }}</span>
              </el-form-item>
              <el-form-item label="券ID：">
                <span>{{ props.row.couponsID }}</span>
              </el-form-item>
              <el-form-item label="券名：">
                <span>{{ props.row.couponsName }}</span>
              </el-form-item>
              <el-form-item label="领券时间：">
                <span>{{ props.row.getCouponsTime }}</span>
              </el-form-item>
              <el-form-item label="券状态：">
                <span>{{ props.row.statusText }}</span>
              </el-form-item>
              <el-form-item label="使用时间：">
                <span>{{ props.row.useCouponsTime }}</span>
              </el-form-item>
              <el-form-item label="成交价格：">
                <span>{{ props.row.money }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="stuName" label="姓名" width="150px" sortable ></el-table-column>
        <el-table-column prop="stuNumber" label="学号" width="200px" sortable></el-table-column>
        <el-table-column prop="stuTel" label="联系方式" width="200px" sortable></el-table-column>
        <el-table-column prop="status" label="券状态" width="150px" sortable>
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.statusType"
              disable-transitions>{{scope.row.statusText}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="成交价格" width="150px" sortable></el-table-column>
        <el-table-column label="操作" fixed="right" width="200px">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="confirmDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <div style="margin-top: 20px; ">
        <el-pagination
          :total="totalSize"
          @current-change="currentChange"
          :page-size="pageSize"
          layout="prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="修改券状态" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="券状态" :label-width="formLabelWidth">
          <el-select v-model="form.formStatus" placeholder="请选择券状态">
            <el-option label="未使用" value="未使用"></el-option>
            <el-option label="已使用" value="已使用"></el-option>
            <el-option label="已过期" value="已过期"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
    export default {
        name: "orderEdit",
      data() {
        return {
          shopID:'',

          //表格数据
          tableData:[{
            accountID:'',
            stuName:'1',
            stuNumber:'2',
            stuTel:'3',
            couponsID:'7',
            couponsName:'4',
            getCouponsTime:'5',
            useCouponsTime:'6',
            status:'',
            statusType:'',
            money:'7',
          }],

          //查找框内数据
          formInline: {
            searchStuName:'',
            searchStuNumber:'',
            searchGetCouponsTime:[],
            searchUseCouponsTime:[],
          },
          checkList: [],

          //编辑表单内数据
          form: {
            formStatus:'',
          },

          formLabelWidth: '120px',

          //当前正在编辑的Index
          currentIndex:'',

          //编辑框是否可见
          dialogFormVisible: false,
          //查看框是否可见
          lookFormVisible: false,

          //分页数据
          pageSize:7,
          totalSize:30,
          currentPage:1,//默认开始页面
        }
      },

      created(){
        this.loadAllOrders();
      },

      methods: {

        //加载所有订单
        loadAllOrders:function() {
          let _this=this;
          let shopID=localStorage.getItem("shopID");
          _this.$data.shopID=shopID;
          this.$axios({
            method:'get',
            url:'/admin/getSiftOrder?shopid='+shopID+
            '&name=null&studentid=null&getTimeF=null&getTimeS=null&useTimeF=null&useTimeS=null&status=null',
          }).then(function (response) {
            console.log(response.data);
            let res=response.data;
            _this.$data.tableData = [];
            for(var i=0;i<res.length;i++){
              let newItem={
                accountID:res[i].accountid,
                stuName:res[i].name,
                stuNumber:res[i].studentid,
                stuTel:res[i].phone,
                couponsID:res[i].couponsid,
                couponsName:res[i].couponsname,
                getCouponsTime:res[i].gettime,
                useCouponsTime:res[i].usetime,
                status:res[i].status,
                statusText:'',
                statusType:'',
                money:res[i].price,
              };
              if(res[i].status.toString()==="0"){
                newItem.statusType="info";
                newItem.statusText="已过期";
              }
              else if(res[i].status.toString()==="1"){
                newItem.statusType="primary";
                newItem.statusText="未使用";
              }
              else if(res[i].status.toString()==="3"){
                newItem.statusType="success";
                newItem.statusText="已使用";
              }
              _this.$data.tableData.push(newItem);
            }
            _this.$data.totalSize=parseInt(response.data.length);//修改表格的总数据量
          }).catch(function (error) {
            console.log(error.response.data);
            console.log('error on loadAllOrders');
          })
        },

        //修改订单状态
        handleEdit:function (index, row){
          let _this=this;
          console.log("index:"+index);
          console.log("currentPage:"+_this.$data.currentPage);
          console.log("pageSize:"+_this.$data.pageSize);
          if(_this.$data.currentPage>1){
            _this.$data.currentIndex=index+((_this.$data.currentPage-1)*(_this.$data.pageSize));//分页要换算当前Index
          }
          else{
            _this.$data.currentIndex=index;//分页要换算当前Index
          }
          console.log("currentIndex="+_this.$data.currentIndex);

          _this.$data.form.formStatus=row.statusText;
          _this.$data.dialogFormVisible = true;
        },

        //修改后的确定
        confirmEdit:function (){
          let _this=this;
          this.$confirm('确定要修改为 '+_this.$data.form.formStatus+' 吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let accountID=_this.$data.tableData[_this.$data.currentIndex].accountID;
            let couponsID=_this.$data.tableData[_this.$data.currentIndex].couponsID;
            let used=-1;
            if(_this.$data.tableData[_this.$data.currentIndex].statusText==="已使用"){
              used=1;
            }
            else if(_this.$data.tableData[_this.$data.currentIndex].statusText==="未使用"||_this.$data.tableData[_this.$data.currentIndex].statusText==="已过期"){
              used=0;
            }
            let newStatus=0;
            if(_this.$data.form.formStatus==='已使用'){newStatus=3;}
            else if(_this.$data.form.formStatus==='未使用'){newStatus=1;}
            else if(_this.$data.form.formStatus==='已过期'){newStatus=0;}
            this.$axios({
              method:'get',
              url:'/admin/changeOrderStatu?&accountid='+accountID+'&couponsid='+couponsID+'&statu='+newStatus+'&used='+used,

            }).then(function (response) {
              console.log(response.data);
              if(response.data.toString()==="true"){
                _this.$data.tableData[_this.$data.currentIndex].statusText=_this.$data.form.formStatus;
                if(newStatus===0){_this.$data.tableData[_this.$data.currentIndex].statusType="info";}
                else if(newStatus===1){_this.$data.tableData[_this.$data.currentIndex].statusType="primary";}
                else if(newStatus===3){_this.$data.tableData[_this.$data.currentIndex].statusType="success";}
              }
              _this.$data.dialogFormVisible = false;
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
              message: '已取消修改'
            });
          });
        },

        //根据条件搜索
        search:function(name,id,getTime,useTime){
          let _this=this;
          let stuID=id;
          if(stuID.toString()===""){stuID="null"}//若学生号为空给后台传null字符串
          if(name.toString()===""){name="null"}//若学生姓名为空给后台传null字符串

          //若时间为空给后台传null字符串
          if(getTime==null){
            getTime=["null","null"];
          }
          if(typeof(getTime[0]) == "undefined"){getTime[0]="null";}
          if(typeof(getTime[1]) == "undefined"){getTime[1]="null";}
          //若时间为空给后台传null字符串
          if(useTime==null){
            useTime=["null","null"];
          }
          if(typeof(useTime[0]) == "undefined"){useTime[0]="null";}
          if(typeof(useTime[1]) == "undefined"){useTime[1]="null";}

          //处理订单状态
          var statusArray=_this.$data.checkList;
          var responseArray="";
          if(statusArray.length==0){responseArray="null";}
          else{
            for(var i=0;i<statusArray.length;i++){
              if(statusArray[i].toString()==="已使用"){responseArray+=",3"}
              if(statusArray[i].toString()==="未使用"){responseArray+=",1"}
              if(statusArray[i].toString()==="已过期"){responseArray+=",0"}
            }
          }
          console.log("name:"+name);
          console.log("id:"+stuID);
          console.log(getTime);
          console.log(useTime);
          console.log(responseArray);

          _this.$axios({
            method:'get',
            url:'/admin/getSiftOrder?shopid='+_this.$data.shopID+
            '&name=' + name.toString() +
            '&studentid=' + stuID.toString() +
            '&getTimeF=' + getTime[0].toString() +
            '&getTimeS=' + getTime[1].toString() +
            '&useTimeF=' + useTime[0].toString() +
            '&useTimeS=' + useTime[1].toString() +
            '&status=' + responseArray.toString(),

          }).then(function (response) {
            console.log(response.data);
            let res=response.data;
            _this.$data.tableData = [];
            for(var i=0;i<res.length;i++){
              let newItem={
                accountID:res[i].accountid,
                stuName:res[i].name,
                stuNumber:res[i].studentid,
                stuTel:res[i].phone,
                couponsID:res[i].couponsid,
                couponsName:res[i].couponsname,
                getCouponsTime:res[i].gettime,
                useCouponsTime:res[i].usetime,
                status:res[i].status,
                statusText:'',
                statusType:'',
                money:res[i].price,
              };
              if(res[i].status.toString()==="0"){
                newItem.statusType="info";
                newItem.statusText="已过期";
              }
              else if(res[i].status.toString()==="1"){
                newItem.statusType="primary";
                newItem.statusText="未使用";
              }
              else if(res[i].status.toString()==="3"){
                newItem.statusType="success";
                newItem.statusText="已使用";
              }
              _this.$data.tableData.push(newItem);
            }
            _this.$data.totalSize=_this.$data.tableData.length;//修改表格的totalSize
          }).catch(function (error) {
            console.log(error.response.data);
          })
        },

        //删除时弹框确定
        confirmDelete:function(index, row){
          let _this=this;
          this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let newIndex=index+((_this.$data.currentPage-1)*(_this.$data.pageSize));//分页要换算当前Index
            console.log(newIndex);
            this.handleDelete(newIndex,row);
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
          let accountID=row.accountID;
          let couponsID=row.couponsID;
          let used=-1;
          if(row.statusText==="已使用"){
            used=1;
          }
          else if(row.statusText==="未使用"||row.statusText==="已过期"){
            used=0;
          }
          this.$axios({
            method:'get',
            url:'/admin/deleteOrder?accountid='+accountID+'&couponsid='+couponsID+'&used='+used,
          }).then(function (response) {
            console.log(response.data);
            if(response.data.toString()==="true"){
              _this.tableData.splice(index,1);
            }
          }).catch(function (error) {
            console.log(error.response.data)
          })
        },

        //换页触发的函数
        currentChange:function(currentPage){
          this.currentPage = currentPage;
        },

        //导出成excel文件
        pullOut:function (name,id,getTime,useTime) {
          let _this=this;
          let stuID=id;
          if(stuID.toString()===""){stuID="null"}//若学生号为空给后台传null字符串
          if(name.toString()===""){name="null"}//若学生姓名为空给后台传null字符串

          //若时间为空给后台传null字符串
          if(getTime==null){
            getTime=["null","null"];
          }
          if(typeof(getTime[0]) == "undefined"){getTime[0]="null";}
          if(typeof(getTime[1]) == "undefined"){getTime[1]="null";}
          //若时间为空给后台传null字符串
          if(useTime==null){
            useTime=["null","null"];
          }
          if(typeof(useTime[0]) == "undefined"){useTime[0]="null";}
          if(typeof(useTime[1]) == "undefined"){useTime[1]="null";}

          //处理订单状态
          var statusArray=_this.$data.checkList;
          var responseArray="";
          if(statusArray.length==0){responseArray="null";}
          else{
            for(var i=0;i<statusArray.length;i++){
              if(statusArray[i].toString()==="已使用"){responseArray+=",3"}
              if(statusArray[i].toString()==="未使用"){responseArray+=",1"}
              if(statusArray[i].toString()==="已过期"){responseArray+=",0"}
            }
          }
          console.log("name:"+name);
          console.log("id:"+stuID);
          console.log(getTime);
          console.log(useTime);
          console.log(responseArray);

          this.$axios({
            method:'get',
            url:'/admin/newExcel?shopid='+_this.$data.shopID+
            '&name=' + name.toString() +
            '&studentid=' + stuID.toString() +
            '&getTimeF=' + getTime[0].toString() +
            '&getTimeS=' + getTime[1].toString() +
            '&useTimeF=' + useTime[0].toString() +
            '&useTimeS=' + useTime[1].toString() +
            '&status=' + responseArray.toString(),
          }).then(function (response) {
            let responseURL=response.data.toString();
            console.log(responseURL);
            window.location.href=responseURL;
          }).catch(function (error) {
            console.log(error.response.data);
          })
        },

      }
    }
</script>

<style scoped>
  .orderEdit{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 200px;
    color: #99a9bf;
  }
  .el-form-item__label{
    width: 200px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 200px;
    margin-bottom: 0;
    width: 25%;
  }
</style>
