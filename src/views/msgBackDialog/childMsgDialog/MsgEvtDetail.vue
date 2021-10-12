<template>
  <div class="msg-evt-detail">
    <el-card shadow="hover">
      <div class="form-one">
        <!-- 第一个表单第一个盒子 -->
        <div class="box-one">
          <el-form
            label-position="right"
            label-width="80px"
            :model="formAcceptAlign"
          >
            <el-form-item label="事件编码:">
              <el-input v-model="formAcceptAlign.evtCode"></el-input>
            </el-form-item>
            <el-form-item label="事件类型:">
              <el-input v-model="formAcceptAlign.evtType"></el-input>
            </el-form-item>
            <el-form-item label="呼叫电话:">
              <el-input v-model="formAcceptAlign.callNum"></el-input>
            </el-form-item>
            <el-form-item label="派车时刻:">
              <el-input v-model="formAcceptAlign.dispatchTime"></el-input>
            </el-form-item>
            <el-form-item label="占用台号:">
              <el-input v-model="formAcceptAlign.deskNum"></el-input>
            </el-form-item>
            <el-form-item label="是否标注:">
              <el-input v-model="formAcceptAlign.biaoZhu"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 第一个表单第一个盒子 -->
        <div class="box-two">
          <el-form
            label-position="right"
            label-width="100px"
            :model="formAcceptAlign"
          >
            <el-form-item label="表单完成标志:">
              <el-input v-model="formAcceptAlign.finishFlag"></el-input>
            </el-form-item>
            <el-form-item label="事件名称:">
              <el-input v-model="formAcceptAlign.evtName"></el-input>
            </el-form-item>
            <el-form-item label="病情:">
              <el-input v-model="formAcceptAlign.illStatus"></el-input>
            </el-form-item>
            <el-form-item label="执行次数:">
              <el-input v-model="formAcceptAlign.executeTmies"></el-input>
            </el-form-item>
            <el-form-item label="区域:">
              <el-input v-model="formAcceptAlign.area"></el-input>
            </el-form-item>
            <el-form-item label="预约时刻:">
              <el-input v-model="formAcceptAlign.appointmentTime"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 第一个表单第一个盒子 -->
        <div class="box-three">
          <el-form
            label-position="right"
            label-width="100px"
            :model="formAcceptAlign"
          >
            <el-form-item label="是否落单:">
              <el-input v-model="formAcceptAlign.isAlone"></el-input>
            </el-form-item>
            <el-form-item label="受理中心:">
              <el-input v-model="formAcceptAlign.acceptCenter"></el-input>
            </el-form-item>
            <el-form-item label="受理时刻:">
              <el-input v-model="formAcceptAlign.acceptTime"></el-input>
            </el-form-item>
            <el-form-item label="撤销受理数:">
              <el-input v-model="formAcceptAlign.cancelAceptNum"></el-input>
            </el-form-item>
            <el-form-item label="是否挂起:">
              <el-input v-model="formAcceptAlign.isHangUp"></el-input>
            </el-form-item>
            <el-form-item label="事故类型:">
              <el-input v-model="formAcceptAlign.accidentType"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 第一个表单第一个盒子 -->
        <div class="box-four">
          <el-form
            label-position="right"
            label-width="100px"
            :model="formAcceptAlign"
          >
            <el-form-item label="是否测试:">
              <el-input v-model="formAcceptAlign.isTest"></el-input>
            </el-form-item>
            <el-form-item label="事件来源:">
              <el-input v-model="formAcceptAlign.evtOrigin"></el-input>
            </el-form-item>
            <el-form-item label="调度员:">
              <el-input v-model="formAcceptAlign.dispatcher"></el-input>
            </el-form-item>
            <el-form-item label="终止任务数:">
              <el-input v-model="formAcceptAlign.breakTaskNum"></el-input>
            </el-form-item>
            <el-form-item label="挂起时刻:">
              <el-input v-model="formAcceptAlign.HangUpTime"></el-input>
            </el-form-item>
            <el-form-item label="事故等级:">
              <el-input v-model="formAcceptAlign.accidentLevel"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MsgEvtDetail",
  props: {
    //接收父组件传过来的个受理次数数据
    acceptTimeData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      formAcceptAlign: {
        evtCode: "",
        evtType: "",
        callNum: "",
        dispatchTime: "",
        deskNum: "",
        biaoZhu: "",
        finishFlag: "",
        evtName: "",
        illStatus: "",
        executeTmies: "",
        area: "",
        appointmentTime: "",
        isAlone: "",
        acceptCenter: "",
        acceptTime: "",
        cancelAceptNum: "",
        isHangUp: "",
        accidentType: "",
        isTest: "",
        evtOrigin: "",
        dispatcher: "",
        breakTaskNum: "",
        HangUpTime: "",
        accidentLevel: "",
      },
    };
  },
  created() {
    setTimeout(() => {
      console.log(this.acceptTimeData);
      this.formAcceptAlign.evtCode = this.acceptTimeData[0].eventCode;
      this.formAcceptAlign.evtType = this.acceptTimeData[0].accidentType;
      this.formAcceptAlign.callNum = this.acceptTimeData[0].callPhone;
      this.formAcceptAlign.dispatchTime = this.acceptTimeData[0].appointmentTime;
      this.formAcceptAlign.deskNum = this.acceptTimeData[0].deskNumber;
      // this.formAcceptAlign.biaoZhu = this.acceptTimeData[0].whetherToMark;
      if ((this.acceptTimeData[0].whetherToMark = "True")) {
        this.formAcceptAlign.biaoZhu = "是";
      } else {
        this.formAcceptAlign.biaoZhu = "否";
      }
      // this.formAcceptAlign.finishFlag = this.acceptTimeData[0].completionFlag;
      if ((this.acceptTimeData[0].completionFlag = "True")) {
        this.formAcceptAlign.finishFlag = "是";
      } else {
        this.formAcceptAlign.finishFlag = "否";
      }
      this.formAcceptAlign.evtName = this.acceptTimeData[0].eventName;
      this.formAcceptAlign.illStatus = this.acceptTimeData[0].chiefComplaint;
      this.formAcceptAlign.executeTmies = this.acceptTimeData[0].implementNumber;
      this.formAcceptAlign.area = this.acceptTimeData[0].region;
      this.formAcceptAlign.appointmentTime = this.acceptTimeData[0].appointmentTime;
      this.formAcceptAlign.isAlone = this.acceptTimeData[0].whetherLD;
      this.formAcceptAlign.acceptCenter = this.acceptTimeData[0].centerName;
      this.formAcceptAlign.acceptTime = this.acceptTimeData[0].acceptTime;
      this.formAcceptAlign.cancelAceptNum = this.acceptTimeData[0].revokeAcceptNum;
      // this.formAcceptAlign.isHangUp = this.acceptTimeData[0].whetherGQ;
      if ((this.acceptTimeData[0].whetherGQ = "True")) {
        this.formAcceptAlign.isHangUp = "是";
      } else {
        this.formAcceptAlign.isHangUp = "否";
      }
      this.formAcceptAlign.accidentType = this.acceptTimeData[0].eventType;
      // this.formAcceptAlign.isTest = this.acceptTimeData[0].whetherTest;
      if ((this.acceptTimeData[0].whetherTest = "True")) {
        this.formAcceptAlign.isTest = "是";
      } else {
        this.formAcceptAlign.isTest = "否";
      }
      this.formAcceptAlign.evtOrigin = this.acceptTimeData[0].eventSource;
      this.formAcceptAlign.dispatcher = this.acceptTimeData[0].dispatcherName;
      this.formAcceptAlign.breakTaskNum = this.acceptTimeData[0].terminateTaskNum;
      this.formAcceptAlign.HangUpTime = this.acceptTimeData[0].GQTime;
      this.formAcceptAlign.accidentLevel = this.acceptTimeData[0].accidentLevel;
    }, 200);
  },

  mounted() {
    const ipt = document.querySelectorAll(
      ".msg-evt-detail .el-form .el-form-item .el-input input"
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
.msg-evt-detail .form-one {
  display: flex;
  background: #ffffff;
  .box-one,
  .box-two,
  .box-three,
  .box-four {
    flex: 1;
    width: 100%;
    margin: 5px;
  }
}
</style>