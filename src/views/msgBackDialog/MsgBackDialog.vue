<template>
  <el-dialog
    v-bind="attributes"
    :visible.sync="visiableDialog"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <div style="height: 80vh" class="scrollbar">
      <el-scrollbar style="height: 100%">
        <div class="son">
          <el-divider />
          <el-row>
            <el-col :span="24">
              <div class="mytitle-header">
                <span>受理次数：</span>
              </div>
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
              <msg-evt-detail :accept-time-data="acceptTimeData" />
            </el-row>
          </div>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="24">
              <div class="mytitle-header">
                <span>任务次数：</span>
              </div>
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
          <div v-for="(item, index) in curTabTaskName" :key="'task' + index">
            <el-row v-if="activeTaskName == item.ord">
              <!-- {{ selectTaskCS }} -->
              <msg-task-detail :task-time-data="taskTimeData" />
            </el-row>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script>
import MsgEvtDetail from "./childMsgDialog/MsgEvtDetail.vue";
import MsgTaskDetail from "./childMsgDialog/MsgTaskDetail.vue";
import { getMsgAndCallBack } from "network/msgAndCallBack";

export default {
  name: "MsgBackDialog",
  components: { MsgEvtDetail, MsgTaskDetail },
  data() {
    return {
      visiableDialog: false,
      attributes: {
        top: "7vh",
        width: "1000px",
        title: "事件详情",
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
    };
  },
  methods: {
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
    //关闭弹框的事件,清除表单的所有数据
    closeDialog() {
      this.visiableDialog = false;
      this.acceptTimeData.splice(0, this.acceptTimeData.length); //关闭弹窗再一次清空数据
      this.acceptData.splice(0, this.acceptData.length);
      this.curTabAceName.splice(0, this.curTabAceName.length);
      this.activeAceName = "first"
      this.selectAcceptCS = "0"
      // console.log(this.curTabAceName)

      this.taskData.splice(0, this.taskData.length); //接收前再一次清空数据
      this.curTabTaskName.splice(0, this.curTabTaskName.length);
      this.taskTimeData.splice(0, this.taskTimeData.length);
      this.activeTaskName = "first";
      this.selectTaskCS = "0";

      // 关闭弹窗请求一次数据准备更新当前数据
      console.log(JSON.parse(localStorage.getItem("formDateTime")))
      getMsgAndCallBack(
        // this.formDateTime.startDate + " " + this.formDateTime.startTime,
        JSON.parse(localStorage.getItem("formDateTime")).startDate+ " " +JSON.parse(localStorage.getItem("formDateTime")).startTime,
        // this.formDateTime.endDate + " " + this.formDateTime.endTime,
        JSON.parse(localStorage.getItem("formDateTime")).endDate+ " " +JSON.parse(localStorage.getItem("formDateTime")).endTime,

        // this.formInputAlign.taskNum,
        JSON.parse(localStorage.getItem("formInputAlign")).taskNum,

        // this.subStnLable,
        localStorage.getItem("subStnLable"),

        // this.ambulanceLable,
        localStorage.getItem("ambulanceLable"),

        // this.formInputAlign.nurse,
        JSON.parse(localStorage.getItem("formInputAlign")).nurse,

        // this.formInputAlign.doctor,
        JSON.parse(localStorage.getItem("formInputAlign")).doctor,
        
        // this.formInputAlign.dirve,
        JSON.parse(localStorage.getItem("formInputAlign")).dirve,

        // this.formInputAlign.patientName,
        JSON.parse(localStorage.getItem("formInputAlign")).patientName,

        // this.msgStatusLable,
        localStorage.getItem("msgStatusLable"),

        // this.formInputAlign.senceAddress,
        JSON.parse(localStorage.getItem("formInputAlign")).senceAddress,

        // this.formInputAlign.phoneNum,
        JSON.parse(localStorage.getItem("formInputAlign")).phoneNum,
      ).then((data) => {
        // console.log(data)
          this.$bus.$emit("renewGetMsgData", data);

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
      this.visiableDialog = bol;
    });

    //接收受理
    this.$bus.$on("acceptData", (data) => {
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
    this.$bus.$on("taskData", (data) => {
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
      // console.log(this.taskTimeData);
    });
  },
};
</script>

<style lang="less" scoped>
@import url("~assets/style/dialog.less");
.son {
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  .mytitle-header {
    background-color: rgba(0, 150, 250, 0.03);
    height: 32px;
    line-height: 32px;
  }
  .mytitle-header span {
    margin-left: 10px;
    color: black;
    font-size: 15px;
    font-weight: bold;
  }
}
/deep/ .el-collapse-item__content {
  padding: 0;
}
/deep/ .el-tabs__header {
  margin: 0;
}
</style>
