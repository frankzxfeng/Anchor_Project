<template>
  <div class="msg-task-detail">
    <el-card shadow="hover">
      <div class="form-two">
        <div class="box-one">
          <el-form
            label-position="right"
            label-width="100px"
            :model="formTaskAlign"
          >
            <el-form-item label="调度人员:">
              <el-input v-model="formTaskAlign.dispatcher"></el-input>
            </el-form-item>
            <el-form-item label="任务号:">
              <el-input v-model="formTaskAlign.taskNum"></el-input>
            </el-form-item>
            <el-form-item label="是否站内出动:">
              <el-input v-model="formTaskAlign.isStationOut"></el-input>
            </el-form-item>
            <el-form-item label="行驶公里:">
              <el-input v-model="formTaskAlign.mile"></el-input>
            </el-form-item>
            <el-form-item label="是否正常结束:">
              <el-input v-model="formTaskAlign.isnormalEnd"></el-input>
            </el-form-item>
            <el-form-item label="是否执行中:">
              <el-input v-model="formTaskAlign.isExecuting"></el-input>
            </el-form-item>
            <el-form-item label="急救公里:">
              <el-input v-model="formTaskAlign.emergencyMile"></el-input>
            </el-form-item>
            <el-form-item label="实际送往地点:">
              <el-input v-model="formTaskAlign.actualSendAddress"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="box-two">
          <el-form
            label-position="right"
            label-width="100px"
            :model="formTaskAlign"
          >
            <el-form-item label="出动分站:">
              <el-input v-model="formTaskAlign.subStation"></el-input>
            </el-form-item>
            <el-form-item label="用户流水:">
              <el-input v-model="formTaskAlign.userRiverNum"></el-input>
            </el-form-item>
            <el-form-item label="实际救治人数:">
              <el-input v-model="formTaskAlign.actualCureNUm"></el-input>
            </el-form-item>

            <el-form-item label="车辆编码:">
              <el-input v-model="formTaskAlign.ambulanceCode"></el-input>
            </el-form-item>
            <el-form-item label="所属中心:">
              <el-input v-model="formTaskAlign.belongCenter"></el-input>
            </el-form-item>
            <el-form-item label="改派前任务:">
              <el-input v-model="formTaskAlign.preReassignTask"></el-input>
            </el-form-item>
            <el-form-item label="异常结束原因:">
              <el-input v-model="formTaskAlign.abnormalReason"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="box-three">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="车辆状态:" width="180">
            </el-table-column>
            <el-table-column prop="dateTime" label="时间:" width="180">
            </el-table-column>
            <el-table-column prop="address" label="来源:"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MsgTaskDetail",
  props: {
    taskTimeData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      formTaskAlign: {
        dispatcher: "",
        taskNum: "",
        isStationOut: "",
        mile: "",
        isnormalEnd: "",
        isExecuting: "",
        emergencyMile: "",
        actualSendAddress: "",
        subStation: "",
        userRiverNum: "",
        actualCureNUm: "",
        ambulanceCode: "",
        belongCenter: "",
        preReassignTask: "",
        abnormalReason: "",
      },
      tableData: [
        {
          name: "生成任务时刻",
          dateTime: "",
          address: "",
        },
        {
          name: "接受命令时刻",
          dateTime: "",
          address: "",
        },
        {
          name: "出车时刻",
          dateTime: "",
          address: "",
        },
        {
          name: "到达现场时刻",
          dateTime: "",
          address: "",
        },
        {
          name: "离开现场时刻",
          dateTime: "",
          address: "",
        },
        {
          name: "到达医院时刻",
          nadateTimeme: "",
          address: "",
        },
        {
          name: "完成时刻",
          dateTime: "",
          address: "",
        },
        {
          name: "返回站中时刻",
          dateTime: "",
          address: "",
        },
      ],
    };
  },
  created() {
    setTimeout(() => {
    console.log(this.taskTimeData);
      this.formTaskAlign.dispatcher = this.taskTimeData[0].dispatcherName;
      this.formTaskAlign.taskNum = this.taskTimeData[0].taskCode;
      this.formTaskAlign.isStationOut = this.taskTimeData[0].isZNCD;
      if ((this.taskTimeData[0].isZNCD = "True")) {
        this.formTaskAlign.isStationOut = "是";
      } else {
        this.formTaskAlign.isStationOut = "否";
      }
      this.formTaskAlign.mile = this.taskTimeData[0].drivingKilometers;
      this.formTaskAlign.isnormalEnd = this.taskTimeData[0].isNormalEnd;
      if ((this.taskTimeData[0].isNormalEnd = "True")) {
        this.formTaskAlign.isnormalEnd = "是";
      } else {
        this.formTaskAlign.isnormalEnd = "否";
      }
      this.formTaskAlign.isExecuting = this.taskTimeData[0].isInExecution;
      if ((this.taskTimeData[0].isInExecution = "True")) {
        this.formTaskAlign.isExecuting = "是";
      } else {
        this.formTaskAlign.isExecuting = "否";
      }
      this.formTaskAlign.emergencyMile = this.taskTimeData[0].firstAidKilometers;
      this.formTaskAlign.actualSendAddress = this.taskTimeData[0].sendAddress;
      this.formTaskAlign.subStation = this.taskTimeData[0].stationName;
      this.formTaskAlign.userRiverNum = this.taskTimeData[0].userNum;
      this.formTaskAlign.actualCureNUm = this.taskTimeData[0].cureNum;
      this.formTaskAlign.ambulanceCode = this.taskTimeData[0].ambulanceCode;
      this.formTaskAlign.belongCenter = this.taskTimeData[0].centerCode;
      this.formTaskAlign.preReassignTask = this.taskTimeData[0].frontTaskCode;
      this.formTaskAlign.abnormalReason = this.taskTimeData[0].abnormalCode;
      this.tableData[0].dateTime = this.taskTimeData[0].generateTaskTime;
      this.tableData[1].dateTime = this.taskTimeData[0].receiveCommandTime;
      this.tableData[2].dateTime = this.taskTimeData[0].departureTime;
      this.tableData[3].dateTime = this.taskTimeData[0].arriveTime;
      this.tableData[4].dateTime = this.taskTimeData[0].leaveTime;
      this.tableData[5].dateTime = this.taskTimeData[0].arriveHospitalTime;
      this.tableData[6].dateTime = this.taskTimeData[0].completeTime;
      this.tableData[7].dateTime = this.taskTimeData[0].returnTime;
    }, 200);
  },
  mounted() {
    const ipt = document.querySelectorAll(
      ".msg-task-detail .el-form .el-form-item .el-input input"
    );
    for (var item of ipt) {
      item.disabled = true; //禁用输入框
    }
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-card {
  margin: 10px;
}
/deep/ .el-card .el-card__body {
  background-color: #ffffff;
  padding: 0px;
}
.msg-task-detail .form-two {
  display: flex;
  background: #ffffff;
  .box-one,
  .box-two {
    flex: 1;
    margin: 5px;
  }
  .box-three {
    flex: 2;
    margin: 5px;
  }
}
/deep/ .form-two .box-three .el-table {
  .el-table__header th {
    //表格样式
    color: black;
    background-color: rgba(200, 200, 200, 0.5);
  }
  .el-table__body .el-table__cell {
    padding: 0;
  }
  .el-table__cell .cell {
    height: 28px;
  }
}
</style>