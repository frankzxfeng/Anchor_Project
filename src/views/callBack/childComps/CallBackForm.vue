<template>
  <div class="call-back-form">
    <!-- <el-card shadow="always" v-show="isChecked == true">
      <el-checkbox v-model="isChecked" disabled style="color: black"
        >已选{{ len }}项</el-checkbox
      >
      <div class="right-btn">
        <el-button type="primary" @click="SendMsgClick">发送回访短信</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="primary" @click="exitSelection()">退出多选</el-button>
      </div>
    </el-card> -->
    <!-- <br /> -->
    <el-table
      class="table-style"
      ref="multipleTable"
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
      :row-key="rowKeys"
      border
      stripe
      @selection-change="handleSelectionChange"
      :default-sort = "{prop: 'acceptTime', order: 'descending'}"
    >
      <el-table-column fixed="left" type="selection" width="55">
      </el-table-column>
      <!-- <el-table-column fixed="left" type="index" label="序号" width="55"></el-table-column> -->
      <el-table-column fixed="left" label="状态" width="100">
        <template slot-scope="scope">
          <el-button
            @click="statusClick(scope.$index, scope.row)"
            size="mini"
            class="status-style"
            v-if="scope.row.state === '未发送'"
            >{{ scope.row.state }}</el-button
          >
          <el-button
            @click="statusClick(scope.$index, scope.row)"
            size="mini"
            class="status-style"
            v-else-if="scope.row.state === '已发送'"
            :style="{ color: '#95a5a6', border: '1px solid #95a5a6' }"
            >{{ scope.row.state }}</el-button
          >
          <el-button
            @click="statusClick(scope.$index, scope.row)"
            size="mini"
            class="status-style"
            v-else-if="scope.row.state === '一般'"
            :style="{ color: '#5f27cd', border: '1px solid #5f27cd' }"
            >{{ scope.row.state }}</el-button
          >

          <el-button
            @click="statusClick(scope.$index, scope.row)"
            size="mini"
            class="status-style"
            v-else-if="scope.row.state === '非常满意'"
            :style="{ color: '#B33771', border: '1px solid #B33771' }"
            >{{ scope.row.state }}</el-button
          >
          <el-button
            @click="statusClick(scope.$index, scope.row)"
            size="mini"
            class="status-style"
            v-else-if="scope.row.state === '满意'"
            :style="{ color: '#7d5fff', border: '1px solid #7d5fff' }"
            >{{ scope.row.state }}</el-button
          >
          <el-button
            @click="statusClick(scope.$index, scope.row)"
            size="mini"
            class="status-style"
            v-else-if="scope.row.state === '调查中'"
            :style="{ color: '#f3a683', border: '1px solid #f3a683' }"
            >{{ scope.row.state }}</el-button
          >
          <el-button
            @click="statusClick(scope.$index, scope.row)"
            size="mini"
            class="status-style"
            v-else-if="scope.row.state === '完成调查'"
            :style="{ color: '#63cdda', border: '1px solid #63cdda' }"
            >{{ scope.row.state }}</el-button
          >
          <el-button
            @click="statusClick(scope.$index, scope.row)"
            size="mini"
            class="status-style"
            v-else-if="scope.row.state === '完成评价'"
            :style="{ color: '#2ed573', border: '1px solid #2ed573' }"
            >{{ scope.row.state }}</el-button
          >
          <el-button
            @click="statusClick(scope.$index, scope.row)"
            size="mini"
            class="status-style"
            v-else
            :style="{ color: '#ff0000', border: '1px solid #ff0000' }"
            >{{ scope.row.state }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column fixed="left" label="处理" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.$index, scope.row)"
            size="mini"
            class="deal-style"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        fixed="left"
        prop="patientName"
        label="患者姓名"
        width="100"
      >
      </el-table-column>
      <el-table-column
        fixed="left"
        prop="acceptTime"
        label="首次受理时间"
        width="150"
        sortable
      >
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="100"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="100"> </el-table-column>
      <el-table-column prop="chiefComplaint" label="主诉" width="100" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="address" label="现场地址" width="150" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="sendAddress" label="送往地点" width="150" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="stationName" label="分站" width="150" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="driverName" label="司机" width="100"> </el-table-column>
    </el-table>
    <!-- 弹窗组件应用 -->
    <transition name="el-fade-in-linear">
    <call-back-detail />
    </transition>
    <div class="foot">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pageSize"
        :total="tableData.length"
        background
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CallBackDetail from "views/callBackDialog/CallBackDialog";
import { getAcceptInfo } from "network/acceptInfo"
import { getTaskInfo } from "network/taskInfo"
export default {
  components: { CallBackDetail },
  name: "CallBackForm",
  data() {
    return {
      tableData: [],
      isChecked: false,
      len: 0,
      isVisiableDialog: false, //默认弹出框不显示
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      evtCode: "",
    };
  },
  methods: {
    handleClick(index, row) {
      // console.log(index, row); //查看当前行内容
      this.evtCode = row.eventCode
      
      this.isVisiableDialog = true;
      // console.log(this.isVisiableDialog);
      this.$bus.$emit("isVisiableDialogEvt", this.isVisiableDialog); //将visiableDialog值传到CallBackDetail弹窗组件中
      getAcceptInfo(this.evtCode).then(data=>{//请求受理信息
        // console.log(data)
        this.$bus.$emit("callAcceptData", data);
      })
      getTaskInfo(this.evtCode).then(data=>{//请求任务信息
        // console.log(data)
        this.$bus.$emit("callTaskData", data);
      })
    },
    statusClick(index, row) {},
    handleSelectionChange(val) {
      this.multipleSelection = val; //存储所选条数
      if (val.length > 0) {
        this.isChecked = true;
        this.len = val.length; //选择的总条数
        this.$bus.$emit("isSelectMulti", this.isChecked); //向兄弟组件传递是否选中多条（选中多条true,否则false），在SelectMsgBack组件接收
      } else {
        this.isChecked = false;
        this.$bus.$emit("isSelectMulti", this.isChecked);
      }
    },
    rowKeys(row) {
      return row.FirstAcepTime;//当跳转到下一页是保存之前页面所选的内容----------------------------------
    },
    exitSelection(rows) {
      //退出多选
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    SendMsgClick() {},
    handleSizeChange: function (val) {
      this.pageSize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
  },
  mounted() {
    this.$bus.$on("getCallData", (data) => {
      // console.log(data)
      this.tableData = data
      if (data.length < 0) {
        this.tableData = data;
      } else {
        this.$bus.$on("renewGetCallData", (renewdata) => {
          // console.log(renewdata)
          this.tableData = renewdata;
        });
      }
    });
  },
};
</script>

<style lang="less" scoped>
.call-back-form {
  margin-right: 20px; // 表单和表格到右边的距离
  /deep/ .el-card__body {
    background-color: rgba(244, 245, 247, 1); // 设置卡片的背景色
  }
}
/deep/ .table-style {
  th {
    color: black;
    background: #e8e8e8;
  }
}
/deep/ .deal-style,
/deep/ .status-style {
  height: 25px;
  line-height: 25px;
  width: 70px;
  text-align: center;
  border-radius: 3px;
  // background: rgba(0, 100, 150, 0.1);
  border: 1px solid #409eff;
  color: #409eff;
  display: flex;
  span {
    height: 25px;
    line-height: 25px;
    width: 79px;
  }
}
/deep/ .status-style span {
  height: 25px;
  line-height: 25px;
  width: 70px;
}
/deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: black;
}
/deep/.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}
/deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #ffffff;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 0px;
}
.foot {
  height: 60px;
  line-height: 60px;
  margin-top: 20px;
}
</style>
