<template>
  <div class="task-msg">
    <el-card shadow="hover">
      <div class="form-one">
        <div class="box-one">
          <el-form
            label-position="right"
            label-width="100px"
            :model="formTaskAlign"
          >
            <el-form-item label="调度人员:">
              <el-input v-model="formTaskAlign.dispatcher"></el-input>
            </el-form-item>
            <el-form-item label="任务编号:">
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
          </el-form>
        </div>
        <div class="box-three">
          <el-form
            label-position="right"
            label-width="100px"
            :model="formTaskAlign"
          >
            <el-form-item label="车辆标识:">
              <el-input v-model="formTaskAlign.ambulanceSign"></el-input>
            </el-form-item>
            <el-form-item label="医生:">
              <el-input v-model="formTaskAlign.doctor"></el-input>
            </el-form-item>
            <el-form-item label="护士:">
              <el-input v-model="formTaskAlign.nurse"></el-input>
            </el-form-item>
            <el-form-item label="出动方式:">
              <el-input v-model="formTaskAlign.outMethod"></el-input>
            </el-form-item>
            <el-form-item label="出车结果:">
              <el-input v-model="formTaskAlign.outResult"></el-input>
            </el-form-item>
            <el-form-item label="异常结束原因:">
              <el-input v-model="formTaskAlign.abnormalReason"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="box-four">
          <el-form
            label-position="right"
            label-width="100px"
            :model="formTaskAlign"
          >
            <el-form-item label="司机:">
              <el-input v-model="formTaskAlign.driver"></el-input>
            </el-form-item>
            <el-form-item label="担架工:">
              <el-input v-model="formTaskAlign.stretcher"></el-input>
            </el-form-item>
            <el-form-item label="急救半径:">
              <el-input v-model="formTaskAlign.radius"></el-input>
            </el-form-item>
            <el-form-item label="急救公里:">
              <el-input v-model="formTaskAlign.emergencyMile"></el-input>
            </el-form-item>
            <el-form-item label="急救员:">
              <el-input v-model="formTaskAlign.firstAider"></el-input>
            </el-form-item>
            <el-form-item label="实际送往地点:">
              <el-input v-model="formTaskAlign.actualSendAddress"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div class="box-five">
        <el-table
          :data="tableData"
          class="table-style"
          border
          style="width: 100%"
        >
          <el-table-column prop="name" label="车辆状态:" width="180">
          </el-table-column>
          <el-table-column prop="dateTime" label="时间:" width="180">
          </el-table-column>
          <el-table-column prop="address" label="来源:"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TaskMsg",
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
        subStation: "",
        userRiverNum: "",
        actualCureNUm: "",
        ambulanceCode: "",
        belongCenter: "",
        preReassignTask: "",
        abnormalReason: "",
        actualSendAddress: "",

        ambulanceSign: "",
        doctor: "",
        nurse: "",
        outMethod: "",
        outResult: "",
        driver: "",
        stretcher: "",
        radius: "",
        emergencyMile: "",
        firstAider: "",
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
  methods: {},
  created() {
    setTimeout(() => {
      // console.log(this.taskTimeData);
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

      this.formTaskAlign.ambulanceSign = this.taskTimeData[0].ambulanceIdentification;
      this.formTaskAlign.doctor = this.taskTimeData[0].doctorName;
      this.formTaskAlign.nurse = this.taskTimeData[0].nurseName;
      this.formTaskAlign.outMethod = this.taskTimeData[0].stationName;
      this.formTaskAlign.outResult = this.taskTimeData[0].abnormalCode;
      this.formTaskAlign.driver = this.taskTimeData[0].driverName;
      this.formTaskAlign.stretcher = this.taskTimeData[0].stretcherMan;
      this.formTaskAlign.radius = "";
      this.formTaskAlign.emergencyMile = this.taskTimeData[0].firstAidKilometers;
      this.formTaskAlign.firstAider = this.taskTimeData[0].rescuer;
      this.tableData[0].dateTime = this.taskTimeData[0].generateTaskTime;
      this.tableData[1].dateTime = this.taskTimeData[0].receiveCommandTime;
      this.tableData[2].dateTime = this.taskTimeData[0].departureTime;
      this.tableData[3].dateTime = this.taskTimeData[0].arriveTime;
      this.tableData[4].dateTime = this.taskTimeData[0].leaveTime;
      this.tableData[5].dateTime = this.taskTimeData[0].arriveHospitalTime;
      this.tableData[6].dateTime = this.taskTimeData[0].completeTime;
      this.tableData[7].dateTime = this.taskTimeData[0].returnTime;
    }, 500);
  },
  mounted() {
    const ipt = document.querySelectorAll(
      ".task-msg .el-form .el-form-item .el-input input"
    );
    for (var item of ipt) {
      item.disabled = true; //禁用输入框
    }
  },
};
</script>

<style lang="less" scoped>
/deep/ .box-card {
  margin: 0.5vw;
  background-color: #ffffff;
  .el-card__body {
    padding: 10px;
    background-color: #ffffff !important;
  }
  .el-card__body .box-bottom {
    background-color: #ffffff;
  }
}
/deep/ .el-collapse-item__content {
  padding: 0;
}
/deep/ .el-card {
  margin: 10px;
}
/deep/ .el-card .el-card__body {
  background-color: #ffffff;
  padding: 0;
}
.form-one {
  display: flex;
  background: #ffffff;
  .box-one,
  .box-two,
  .box-three,
  .box-four {
    flex: 1;
    margin: 5px;
  }
}
/deep/ .box-five .el-table__body {
  .el-table__row .el-table__cell {
    //表格样式
    padding: 0;
  }
  tr {
    height: 28px;
  }
}
</style>
