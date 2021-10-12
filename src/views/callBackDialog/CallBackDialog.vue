<template>
  <el-dialog
    v-bind="attributes"
    :visible.sync="isVisiableDialog"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="closeDialog"
    @open="openDialog"
  >
    <el-divider />
    <div style="height: 80vh" class="scrollbar">
      <el-scrollbar style="height: 100%">
        <div class="son">
          <el-collapse v-model="activeNames" @change="handleChangeAce">
            <el-collapse-item title="*受理信息" name="1">
              <el-row>
                <el-col :span="24">
                  <el-tabs
                    v-model="activeAceName"
                    type="card"
                    @tab-click="handleClick"
                  >
                    <el-tab-pane
                      v-for="(item, index) in curTabAceName"
                      :label="item.ordLable"
                      :key="'aec' + index"
                      :name="item.ord"
                    ></el-tab-pane>
                  </el-tabs>
                </el-col>
              </el-row>
              <div v-for="(item, index) in curTabAceName" :key="'aec' + index">
                <el-row v-if="activeAceName == item.ord">
                  <!-- {{ selectAcceptCS }} -->
                  <evt-detail :accept-time-data="acceptTimeData" />
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" @change="handleChangeTask">
            <el-collapse-item title="*任务信息" name="2">
              <el-row>
                <el-col :span="24">
                  <el-tabs
                    v-model="activeTaskName"
                    type="card"
                    @tab-click="handleTaskClick"
                  >
                    <el-tab-pane
                      v-for="(item, index) in curTabTaskName"
                      :key="'task' + index"
                      :label="item.ordLable"
                      :name="item.ord"
                    ></el-tab-pane>
                  </el-tabs>
                </el-col>
              </el-row>
              <div
                v-for="(item, index) in curTabTaskName"
                :key="'task' + index"
              >
                <el-row v-if="activeTaskName == item.ord">
                  <!-- {{selectTaskCS}} -->
                  <task-msg :task-time-data="taskTimeData" />
                </el-row>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!-- 外部链接按钮 -->
          <external-link-btn
            :accept-time-data="acceptTimeData"
            v-if="showComp"
          />
          <!-- 其他信息 -->
          <other-msg :task-time-data="taskTimeData" v-if="showComp" />
        </div>
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script>
import EvtDetail from "./ChildCompos/EvtDetail";
import TaskMsg from "./ChildCompos/TaskMsg";
import ExternalLinkBtn from "./ChildCompos/ExternalLinkBtn";
import OtherMsg from "./ChildCompos/OtherMsg";
import { getMsgAndCallBack } from "network/msgAndCallBack";

export default {
  name: "MsgBackDetail",
  components: { EvtDetail, TaskMsg, ExternalLinkBtn, OtherMsg },
  data() {
    return {
      showComp: true,
      isVisiableDialog: false,
      attributes: {
        top: "7vh",
        width: "1000px",
        title: "回访单",
        center: false,
      },
      acceptData: [], //存全部的受理数
      acceptTimeData: [], //存一次的受理数
      selectAcceptCS: "0", //所选的第几次受理
      taskData: [], //存全部的任务数
      taskTimeData: [], //存一次的任务数
      selectTaskCS: "0", //所选的第几次任务
      // tabAceName: ["first", "second"],
      curTabAceName: [],
      tabAceName: [
        { ord: "first", ordLable: "第一次受理" },
        { ord: "second", ordLable: "第二次受理" },
        { ord: "third", ordLable: "第三次受理" },
        { ord: "forth", ordLable: "第四次受理" },
        { ord: "fifth", ordLable: "第五次受理" },
        { ord: "sixth", ordLable: "第六次受理" },
        { ord: "seventh", ordLable: "第七次受理" },
        { ord: "eighth", ordLable: "第八次受理" },
        { ord: "nineth", ordLable: "第九次受理" },
      ],
      curTabTaskName: [],
      tabTaskName: [
        { ord: "first", ordLable: "第一次任务" },
        { ord: "second", ordLable: "第二次任务" },
        { ord: "third", ordLable: "第三次任务" },
        { ord: "forth", ordLable: "第四次任务" },
        { ord: "fifth", ordLable: "第五次任务" },
        { ord: "sixth", ordLable: "第六次任务" },
        { ord: "seventh", ordLable: "第七次任务" },
        { ord: "eighth", ordLable: "第八次任务" },
        { ord: "nineth", ordLable: "第九次任务" },
      ],
      activeAceName: "first",
      activeTaskName: "first",
      activeNames: ["2"],
    };
  },
  methods: {
    handleChangeAce(val) {
      // console.log(val);
    },
    handleChangeTask(val) {
      // console.log(val);
    },
    handleClick(tab, event) {
      this.selectAcceptCS = tab.index;
      this.acceptTimeData.splice(0, 1);
      this.acceptTimeData = this.acceptData.slice(
        this.selectAcceptCS,
        this.selectAcceptCS + 1
      );
    },
    handleTaskClick(tab, event) {
      this.selectTaskCS = tab.index;
      this.taskTimeData.splice(0, 1);
      this.taskTimeData = this.taskData.slice(
        this.selectTaskCS,
        this.selectTaskCS + 1
      );
    },
    openDialog(){
    this.showComp = true;
    this.visiableDialog = true;
    },
    closeDialog() {
      this.showComp = false;
      this.visiableDialog = false;
      this.acceptTimeData.splice(0, this.acceptTimeData.length); //关闭弹窗再一次清空数据
      this.acceptData.splice(0, this.acceptData.length);
      this.curTabAceName.splice(0, this.curTabAceName.length);
      this.activeAceName = "first";
      this.selectAcceptCS = "0";
      // console.log(this.curTabAceName)
      this.taskData.splice(0, this.taskData.length); //接收前再一次清空数据
      this.curTabTaskName.splice(0, this.curTabTaskName.length);
      this.taskTimeData.splice(0, this.taskTimeData.length);
      this.activeTaskName = "first";
      this.selectTaskCS = "0";

      // 关闭弹窗请求一次数据准备更新当前数据
      // console.log(JSON.parse(localStorage.getItem("formDateTimeCall")))
      console.log(JSON.parse(localStorage.getItem("formInputAlignCall")).drive)
      
      getMsgAndCallBack(
        // this.formDateTime.startDate + " " + this.formDateTime.startTime,
        JSON.parse(localStorage.getItem("formDateTimeCall")).startDate+ " " +JSON.parse(localStorage.getItem("formDateTimeCall")).startTime,
        // this.formDateTime.endDate + " " + this.formDateTime.endTime,
        JSON.parse(localStorage.getItem("formDateTimeCall")).endDate+ " " +JSON.parse(localStorage.getItem("formDateTimeCall")).endTime,

        // this.formInputAlign.taskNum,
        JSON.parse(localStorage.getItem("formInputAlignCall")).taskNum,

        // this.subStnLable,
        localStorage.getItem("subStnLableCall"),

        // this.ambulanceLable,
        localStorage.getItem("ambulanceLableCall"),

        // this.formInputAlign.nurse,
        JSON.parse(localStorage.getItem("formInputAlignCall")).nurse,

        // this.formInputAlign.doctor,
        JSON.parse(localStorage.getItem("formInputAlignCall")).doctor,
        
        // this.formInputAlign.dirve,
        JSON.parse(localStorage.getItem("formInputAlignCall")).drive,

        // this.formInputAlign.patientName,
        JSON.parse(localStorage.getItem("formInputAlignCall")).patientName,

        // this.msgStatusLable,
        localStorage.getItem("msgStatusLableCall"),

        // this.formInputAlign.senceAddress,
        JSON.parse(localStorage.getItem("formInputAlignCall")).senceAddress,

        // this.formInputAlign.phoneNum,
        JSON.parse(localStorage.getItem("formInputAlignCall")).phoneNum,
      ).then((data) => {
        console.log(data)
          this.$bus.$emit("renewGetCallData", data);

        // if (data.length > 0) {
        //   this.$bus.$emit("getMsgData", data);
        // }else{
        //   this.$message({
        //         type: "success",
        //         message: "无数据，请重新选择条件进行查询!",
        //       });
        // }
      });
    },
  },
  created() {
    this.$bus.$on("isVisiableDialogEvt", (bol) => {
      // console.log(bol);
      this.isVisiableDialog = bol;
    });

    //接收受理
    this.$bus.$on("callAcceptData", (data) => {
      this.acceptData.splice(0, this.acceptData.length); //接收前清空
      this.curTabAceName.splice(0, this.curTabAceName.length);
      this.acceptTimeData.splice(0, this.acceptTimeData.length);
      this.activeAceName = "first";
      this.selectAcceptCS = "0";
      this.acceptData = data;
      // console.log(this.acceptData);
      var acceptTime = data.length;
      if (acceptTime > 0) {
        this.curTabAceName = this.tabAceName.slice(0, acceptTime); //判断用来显示几次受理
      }
      this.acceptTimeData = this.acceptData.slice(
        this.selectAcceptCS,
        this.selectAcceptCS + 1
      );
      // console.log(this.acceptTimeData);
    });

    //接收任务
    this.$bus.$on("callTaskData", (data) => {
      // console.log(data)
      this.taskData.splice(0, this.taskData.length); //接收前清空
      this.curTabTaskName.splice(0, this.curTabTaskName.length);
      this.taskTimeData.splice(0, this.taskTimeData.length);
      this.activeTaskName = "first";
      this.selectTaskCS = "0";

      this.taskData = data;
      // console.log(this.taskData);
      var taskTime = data.length;
      if (taskTime > 0) {
        this.curTabTaskName = this.tabTaskName.slice(0, taskTime);
      }
      this.taskTimeData = this.taskData.slice(
        this.selectTaskCS,
        this.selectTaskCS + 1
      );
      sessionStorage.setItem("getevtCode", this.taskTimeData[0].taskCode);
      // console.log(sessionStorage.getItem("getevtCode"));
      // console.log(this.taskTimeData);
    });
  },
};
</script>

<style lang="less" scoped>
@import url("~assets/style/dialog.less");
/deep/ .el-tabs__header {
  margin: 0;
}
/deep/ .el-collapse-item__content {
  padding: 0;
}
.son {
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
}
/deep/ .el-collapse-item__header {
  //设置折叠面板的头部样式
  background-color: rgba(0, 150, 250, 0.05);
  font-size: 15px;
  font-weight: bold;
  color: black;
  height: 35px;
  line-height: 35px;
}
</style>
