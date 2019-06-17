<template>
  <div class="adminOrder">
    <el-container>
      <el-aside style="width: 290px;  text-align:left;">
        <div style="display: block; position: fixed; left: 0px;width: 290px; height:100%">
          <div style="">
            <el-menu
              class="el-menu-demo"
              mode="horizontal"
              text-color="#FFFFFF"
              background-color="#409EFF"
              collapse-transition
              active-text-color="#ffd04b">
              <el-menu-item index="1">Logo</el-menu-item>
              <el-menu-item index="2">管理界面</el-menu-item>
              <el-menu-item index="3"><router-link to="/" style="text-decoration: none">返回</router-link></el-menu-item>
            </el-menu>
          </div>

          <div style="height:100%">
            <el-menu default-active="2" class="el-menu-vertical-demo" >
              <router-link to="/admin" style="text-decoration: none">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title" style="align:left">商品管理</span>
                </el-menu-item>
              </router-link>
              <router-link to="/adminOrder" style="text-decoration: none">
                <el-menu-item index="2">
                  <i class="el-icon-setting"></i>
                  <span slot="title">订单管理</span>
                </el-menu-item>
              </router-link>
              <router-link to="/activityEdit" style="text-decoration: none">
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">活动说明管理</span>
                </el-menu-item>
              </router-link>

            </el-menu>

          </div>
        </div>
      </el-aside>

      <el-main>
        <div>
          <div style="margin-top:20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">管理员</el-breadcrumb-item>
              <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!--查询框-->
          <div style="margin-top: 40px; padding:16px; background-color: #E9EEF3; text-align: left;">
            <el-form :inline="true" :model="formInline" label-width="80px" style="height:100px" >
              <el-form-item label="学生号:" style="width:300px">
                <el-input v-model="formInline.stuID" ></el-input>
              </el-form-item>
              <el-form-item label="筛选日期:" style="width:500px">
                <el-date-picker
                  v-model="formInline.timeValue"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="订单状态" style="width:600px">
                <template>
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="已完成" border></el-checkbox>
                    <el-checkbox label="已付款" border></el-checkbox>
                    <el-checkbox label="未付款" border></el-checkbox>
                    <el-checkbox label="订单失败" border></el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-form-item>
              <el-form-item style="width:200px;float: right" >
                <el-button type="primary" size="small" icon="el-icon-search"
                           @click="searchByName(formInline.stuID,formInline.timeValue)">搜索</el-button>
                <el-button type="success" size="small" icon="el-icon-document" @click="pullOut">导出</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!--表格数据-->
          <div style="margin-top: 40px">
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" max-height="480" height="500" border style="width: 100%" >
              <el-table-column prop="time" label="预定时间" width="200px" sortable></el-table-column>
              <el-table-column prop="id" label="序号" width="150px" sortable></el-table-column>
              <el-table-column prop="studentID" label="学生号" width="150px" sortable></el-table-column>
              <el-table-column prop="name" label="姓名" width="150px" sortable></el-table-column>
              <el-table-column prop="money" label="定金金额" width="150px" sortable></el-table-column>
              <el-table-column prop="status" label="订单状态" width="150px" sortable
                               :filters="[{ text: '已完成', value: '已完成' }, { text: '已付款', value: '已付款' },
                                          { text: '未付款', value: '未付款' }, { text: '订单失败', value: '订单失败' },]"
                               :filter-method="filterTag">
                <template slot-scope="scope">
                  <el-tag
                           :type="scope.row.statusType"
                           disable-transitions>{{scope.row.status}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="200px">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="primary" size="small" @click="lookMore(scope.$index, scope.row)">查看</el-button>
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

          <el-dialog title="修改订单状态" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
              <el-form-item label="订单状态" :label-width="formLabelWidth">
                <el-select v-model="form.formStatus" placeholder="请选择订单状态">
                  <el-option label="已完成" value="已完成"></el-option>
                  <el-option label="已付款" value="已付款"></el-option>
                  <el-option label="未付款" value="未付款"></el-option>
                  <el-option label="订单失败" value="订单失败"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirmEdit">确 定</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </el-dialog>

          <el-dialog title="查看" :visible.sync="lookFormVisible" width="40%">
            <el-form :model="lookform">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="lookform.lookName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" :label-width="formLabelWidth">
                <el-input v-model="lookform.lookTel" auto-complete="off" ></el-input>
              </el-form-item>
              <el-form-item label="校区" :label-width="formLabelWidth">
                <el-input v-model="lookform.lookPosition" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="具体地址" :label-width="formLabelWidth">
                <el-input v-model="lookform.lookAddress" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="预计到校日期" :label-width="formLabelWidth">
                <el-input v-model="lookform.lookArriveTime" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="已选商品" :label-width="formLabelWidth">
                <el-input v-model="lookform.lookGoods" type="textarea" :rows="4" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="预定时间" :label-width="formLabelWidth">
                <el-input v-model="lookform.lookTime" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="订单状态" :label-width="formLabelWidth">
                <el-input v-model="lookform.lookStatus" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="定金金额" :label-width="formLabelWidth">
                <el-input v-model="lookform.lookMoney" auto-complete="off"></el-input>
              </el-form-item>

            </el-form>
            <!--<div slot="footer" class="dialog-footer">-->
              <!--<el-button type="primary" @click="confirmL">确 定</el-button>-->
              <!--<el-button @click="newdialogFormVisible = false">取 消</el-button>-->
            <!--</div>-->
          </el-dialog>

        </div>

      </el-main>
    </el-container>

  </div>
</template>

<script>
  const SecretNumber="123456";

  import app from "../App"
  export default {
    name: "adminOrder",
    data() {
      return {
        //表格数据
        tableData:[{
          time:'1',
          id:'1',
          studentID:'1',
          name:'1',
          money:'1',
          statusType:'warning',
          status:'未付款'
        }],

        //查找框内数据
        formInline: {
          stuID: '',
          timeValue:[],
        },
        checkList: [],

        //编辑表单内数据
        form: {
          formStatus:'',
        },

        //查看表单内数据
        lookform: {
          lookName:'',
          lookTel:'',
          lookPosition:'',
          lookAddress:'',
          lookArriveTime:'',
          lookGoods:'',
          lookTime:'',
          lookStatus:'',
          lookMoney:''
        },
        formLabelWidth: '120px',

        //当前正在编辑的Index
        currentIndex:'',

        //当前筛选的状态
        selectStatus:[],
        //是否装载了表格
        isLoad:"0",

        //编辑框是否可见
        dialogFormVisible: false,
        //查看框是否可见
        lookFormVisible: false,

        //分页数据
        pageSize:7,
        totalSize:100,
        currentPage:1,//默认开始页面
      }
    },

    created(){
        this.loadAllUsers();
    },

    methods: {

      //筛选标签
      filterTag(value, row) {
        let _this=this;
        _this.clearSelectStatus();
        var have="0";//判断数组中是否含有此value
        for(var i=0;i<_this.$data.selectStatus.length;i++){
          if(_this.$data.selectStatus[i]===value){have="1"; break;}
        }
        if(have==="0"){_this.$data.selectStatus.push(value);}
        return row.status === value;
      },


      //加载所有订单
      loadAllUsers:function() {
        let _this=this;

        this.$axios({
          method:'get',
          url:'/order/getOrderList',

        }).then(function (response) {
          console.log(response.data);
          _this.$data.tableData = [];
          var types='';
          var status='';
          for(var i=0;i<response.data.length;i++){
            if(response.data[i].status===1){
              status='未付款';
              types='danger';
            }
            if(response.data[i].status===0){
              status='订单失败';
              types='info';
            }
            if(response.data[i].status===2){
              status='已付款';
              types='primary'
            }
            if(response.data[i].status===3){
              status='已完成';
              types='success';
            }
            var newItem={time:response.data[i].reservetime,id:response.data[i].orderid,studentID:response.data[i].studentid,name:response.data[i].name,
                          money:parseFloat(response.data[i].deposit),status:status,statusType:types};
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
        console.log("pageSize:"+_this.$data.pageSize)
        if(_this.$data.currentPage>1){
          _this.$data.currentIndex=index+((_this.$data.currentPage-1)*(_this.$data.pageSize));//分页要换算当前Index
        }
        else{
          _this.$data.currentIndex=index;//分页要换算当前Index
        }
        console.log("currentIndex="+_this.$data.currentIndex);

        //设置无法修改失败的订单
        if(row.status==="订单失败"){
          this.$message({
            message: 'Sorry , 无法修改失败的订单',
            type: 'warning'
          });
        }
        else{
          _this.$data.form.formStatus=row.status;
          _this.$data.dialogFormVisible = true;
        }
      },

      //修改后的确定
      confirmEdit:function (){
        let _this=this;
        this.$confirm('确定要修改为 '+_this.$data.form.formStatus+' 吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id=_this.$data.tableData[_this.$data.currentIndex].id;
          var studentid=_this.$data.tableData[_this.$data.currentIndex].studentID;
          var newStatus=0;
          if(_this.$data.form.formStatus==='已完成'){newStatus=3;}
          else if(_this.$data.form.formStatus==='已付款'){newStatus=2;}
          else if(_this.$data.form.formStatus==='未付款'){newStatus=1;}
          else if(_this.$data.form.formStatus==='订单失败'){newStatus=0;}
          console.log(id);
          console.log(_this.$data.currentIndex);

          this.$axios({
            method:'get',
            url:'/order/changeOrderStatus?&orderid='+id+'&status='+parseInt(newStatus)

          }).then(function (response) {
            console.log(response.data);
            if(response.data.toString()==="true"){
              _this.$data.tableData[_this.$data.currentIndex].status=_this.$data.form.formStatus;
              if(newStatus===1){_this.$data.tableData[_this.$data.currentIndex].statusType="danger";}
              else if(newStatus===2){_this.$data.tableData[_this.$data.currentIndex].statusType="primary";}
              else if(newStatus===3){_this.$data.tableData[_this.$data.currentIndex].statusType="success";}
              else if(newStatus===0){_this.$data.tableData[_this.$data.currentIndex].statusType="info";}
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

      //根据名字搜索
      searchByName:function(stuID,time){
        let _this=this;
        if(stuID===""){stuID="null"}//若学生号为空给后台传null字符串

        //若时间为空给后台传null字符串
        if(time==null){
          time=["null","null"];
        }
        if(typeof(time[0]) == "undefined"){time[0]="null";}
        if(typeof(time[1]) == "undefined"){time[1]="null";}

        //处理订单状态
        var statusArray=_this.$data.checkList;
        var responseArray="";
        if(statusArray.length==0){responseArray=",-1";}
        else{
          for(var i=0;i<statusArray.length;i++){
            if(statusArray[i].toString()==="已完成"){responseArray+=",3"}
            if(statusArray[i].toString()==="已付款"){responseArray+=",2"}
            if(statusArray[i].toString()==="未付款"){responseArray+=",1"}
            if(statusArray[i].toString()==="订单失败"){responseArray+=",0"}
          }
        }
        console.log(responseArray);

        this.$axios({
          method:'get',
          url:'order/getSiftOrder?status='+responseArray+'&studentid='+stuID+'&firstTime='+time[0]+'&secondTime='+time[1],

        }).then(function (response) {
          console.log(response.data);
          _this.$data.tableData = [];
          var types='';
          var status='';
          for(var i=0;i<response.data.length;i++){
            if(response.data[i].status===1){
              status='未付款';
              types='danger';
            }
            if(response.data[i].status===0){
              status='订单失败';
              types='info';
            }
            if(response.data[i].status===2){
              status='已付款';
              types='primary'
            }
            if(response.data[i].status===3){
              status='已完成';
              types='success';
            }
            var newItem={time:response.data[i].reservetime,id:response.data[i].orderid,studentID:response.data[i].studentid,name:response.data[i].name,
              money:parseFloat(response.data[i].deposit),status:status,statusType:types};
            _this.$data.tableData.push(newItem);
          }
          _this.$data.totalSize=_this.$data.tableData.length;//修改表格的totalSize
        }).catch(function (error) {
          console.log(error.response.data);
          console.log('error on search by id and time');
        })
      },

      //查看详细信息
      lookMore:function (index, row){
        let _this=this;
        _this.$data.lookFormVisible = true;
        _this.$data.currentIndex=index+((_this.$data.currentPage-1)*(_this.$data.pageSize));

        this.$axios({
          method:'get',
          url:'/order/getOrders?studentid='+row.studentID+'&orderid='+parseInt(row.id),

        }).then(function (response) {
          console.log(response.data);
          var goods=response.data.goods.toString();
          var newGoods=goods.replace(/   /g, "\r\n");
          _this.$data.lookform.lookName=response.data.name;
          _this.$data.lookform.lookTel=response.data.phone;
          _this.$data.lookform.lookPosition=response.data.campus;
          _this.$data.lookform.lookAddress=response.data.position;
          _this.$data.lookform.lookArriveTime=response.data.arrivedate;
          _this.$data.lookform.lookGoods=newGoods;
          _this.$data.lookform.lookTime=response.data.reservetime;
          _this.$data.lookform.lookMoney=response.data.deposit;
          if(response.data.status===0){_this.$data.lookform.lookStatus='订单失败';}
          else if(response.data.status===1){_this.$data.lookform.lookStatus='未付款';}
          else if(response.data.status===2){_this.$data.lookform.lookStatus='已付款';}
          else if(response.data.status===3){_this.$data.lookform.lookStatus='已完成';}
          else {_this.$data.lookform.lookStatus='订单状态在数据库中发生错误';}
        }).catch(function (error) {
          _this.$data.lookform={};
          console.log(error.response.data);
        })

      },

      //换页触发的函数
      currentChange:function(currentPage){
        this.currentPage = currentPage;
      },

      //导出成excel文件
      pullOut:function () {
        let _this=this;

        var tableData=_this.$data.tableData;
        var orderIDArray=[];
        for(var i=0;i<tableData.length;i++){
          orderIDArray.push(tableData[i].id);
        }
        console.log(orderIDArray);

        this.$axios({
          method:'get',
          url:'/order/newExcl?orderid='+orderIDArray,
        }).then(function (response) {
          //console.log(response.data);
          let responseURL=response.data.toString();
          console.log(responseURL);
          //访问服务器上的文件
          window.location.href=responseURL;
        }).catch(function (error) {
          console.log(error.response.data);
          console.log('error on loadAllOrders');
        })

      },
    }
  }
</script>

<style scoped>
  .adminOrder{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
