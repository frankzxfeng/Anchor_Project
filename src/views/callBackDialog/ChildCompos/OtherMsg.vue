<template>
  <div class="other-msg">
    <!-- 回复内容 -->
    <div class="recallInfo">
      <dialog-nav><template v-slot:left>短信回访信息</template></dialog-nav>
      <el-card shadow="hover">
        <el-form label-position="right" label-width="100px" :model="recallInfo">
          <el-form-item label="发送内容：">
            <el-input v-model="recallInfo.sendContent"></el-input>
          </el-form-item>
          <el-form-item label="回复内容：">
            <el-input v-model="recallInfo.replyContent"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!--急救部回访  -->
    <el-divider />

    <div class="emergencyReply">
      <dialog-nav>
        <template v-slot:left>急救部回访</template>
        <template v-slot:right>
          <el-button
            type="primary"
            @click="dcClick"
            v-show="isShowDCBtn == true"
            :disabled="isDCOperate == true"
            >调查</el-button
          >
          <el-button
            type="success"
            v-show="isShowDCBtn == false"
            style="border: 1px solid #FFFFFF"
            :disabled="isDCZOperate == false"
            >调查中</el-button
          >
          <el-button
            type="primary"
            @click="wcClick"
            v-show="isShowWCBtn == true"
            :disabled="isWCOperate == true"
            >完成</el-button
          >
          <el-button
            type="success"
            v-show="isShowWCBtn == false"
            style="border: 1px solid #FFFFFF"
            :disabled="isYWCOperate == false"
            >已完成</el-button
          >
        </template>
      </dialog-nav>
      <el-card shadow="hover">
        <div class="discontent">
          <span style="margin-left: 20px">不满意原因：</span>
          <el-checkbox-group
            v-model="checkboxGroup"
            @change="changeCheckedBox"
            style="margin-top: 20px; margin-left: 80px"
          >
            <span
              ><el-checkbox
                v-for="item in options"
                :label="item"
                :key="item"
                :disabled="isJJBOperate == false"
                >{{ item }}</el-checkbox
              ></span
            >
          </el-checkbox-group>
        </div>
        <div class="detail-msg" style="margin-top: 20px">
          <el-form label-position="right" label-width="95px" :model="detailMsg">
            <el-form-item label="详情信息:">
              <el-input
                v-model="detailMsg.returnMark"
                :disabled="isJJBOperate == false"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <!-- 党办终结 -->
    <el-divider />
    <div class="end">
      <dialog-nav>
        <template v-slot:left>党办终结</template>
        <template v-slot:right
          ><div>
            <el-button
              type="primary"
              @click="hfClick"
              v-show="isShowHFBtn == true"
              :disabled="isHFOperate == true"
              >评价</el-button
            >
            <el-button
              type="success"
              v-show="isShowHFBtn == false"
              style="border: 1px solid #FFFFFF"
              :disabled="isYHFOperate == true"
              >已评价</el-button
            >
          </div></template
        >
      </dialog-nav>
      <el-card shadow="hover" disabled>
        <div>
          <span>对急救部回访的评价：</span>
          <span>
            <el-radio
              v-model="radio"
              label="满意"
              :disabled="isDBOperate == true"
              @change="getValue()"
            ></el-radio>
          </span>
          <span>
            <el-radio
              v-model="radio"
              label="不满意"
              :disabled="isDBOperate == true"
              @change="getValue()"
            ></el-radio>
          </span>
        </div>

        <div style="margin-top: 20px">
          <span>备注：</span>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="textarea"
            :disabled="isDBOperate == true"
          >
          </el-input>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import DialogNav from "components/common/DialogNav";
import { getEvaluate } from "network/evaluate";
import { getInvestigation } from "network/investigation";
import { getCompleteInvestigation } from "network/completeInvestigation";

export default {
  name: "OtherMsg",
  components: { DialogNav },
  props: {
    taskTimeData: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      checkboxGroup: [],
      fxJSon:"{'服务态度','收费疑问','等车时间','行车不规范','抬抱','误回','其他'}",
      options: [
        "服务态度",
        "收费疑问",
        "等车时间",
        "行车不规范",
        "抬抱",
        "误回",
        "其他",
      ],
      isJJBOperate: false,
      isDBOperate: false,
      isShowDCBtn: true,
      isShowWCBtn: true,
      isShowHFBtn: true,
      isDCOperate: false,
      isDCZOperate: false,
      isWCOperate: false,
      isYWCOperate: false,
      isHFOperate: false,
      isYHFOperate: true,
      taskState: 0,
      radio: "满意",
      radioLable: "满意",
      recallInfo: {
        sendContent: "",
        replyContent: "",
      },
      returnResult: "",

      detailMsg: {
        returnMark: "",
      },
      reason: "",
      taskCode: "",
      textarea: "",
    };
  },
  methods: {
    changeCheckedBox(val) {
      console.log(this.checkboxGroup);
      console.log(this.reason);
      this.reason = val.toString();
      // console.log(this.reason);
    },
    dcClick() {
      this.$confirm("是否确定选项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //急救部请求上传所选内容
          console.log(localStorage.getItem("saveUserCode"));
          console.log(sessionStorage.getItem("getevtCode"));

          getInvestigation(
            localStorage.getItem("saveUserCode"), //急救部操作调查按钮
            sessionStorage.getItem("getevtCode")
          ).then((data) => {
            console.log(data);
            if (data[0].y == "操作成功") {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.isShowDCBtn = false; //显示已调查按钮
              this.isWCOperate = false;
              this.isJJBOperate = true;
            } else {
              this.$message({
                type: "success",
                message: "操作失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
          this.isShowDCBtn = true;
          // this.checkboxGroup.splice(0, this.checkboxGroup.length);
        });
    },
    wcClick() {
      console.log(localStorage.getItem("saveUser"));
      this.$confirm("是否确定选项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getCompleteInvestigation(
            localStorage.getItem("saveUserCode"), //急救部操作完成按钮
            sessionStorage.getItem("getevtCode"),
            this.reason,
            this.detailMsg.returnMark
          ).then((data) => {
            console.log(data);
            if ((data[0].y = "操作成功")) {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.isShowWCBtn = false;
              this.isJJBOperate = false;
            } else {
              this.$message({
                type: "success",
                message: "操作失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
          this.isShowWCBtn = true;
        });
    },
    getValue() {
      this.radioLable = this.radio;
      console.log("radioLable：" + this.radioLable); // 打印的值，就是被选中的radio的值，1,2
    },
    hfClick() {
      this.$confirm("是否确定选项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setTimeout(() => {
            console.log(localStorage.getItem("saveUserCode"));
            console.log(sessionStorage.getItem("getevtCode"));
            console.log(this.radioLable);
            console.log(this.textarea);
            getEvaluate(
              localStorage.getItem("saveUserCode"), //党部操作回访结果
              sessionStorage.getItem("getevtCode"),
              this.radioLable,
              this.textarea
            ).then((data) => {
              //发送评价的内容
              console.log(data);
              if (data[0].y == "操作成功") {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              }
              this.isShowHFBtn = false;
            });
          }, 600);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
          this.isShowHFBtn = true;
        });
    },
  },
  created() {
    setTimeout(() => {
      console.log(this.taskTimeData);
      this.taskState = parseInt(this.taskTimeData[0].taskState); //获取任务状态
      console.log(this.taskState);
      // console.log(this.taskTimeData[0].replyContent);

      //短信回访内容

      // 急救部操作结果
      // 1.调查按钮
      // if(this.recallInfo.replyContent=="3"){}
      if (this.taskTimeData[0].taskState == "") {
        this.isDCOperate = true;
        this.isWCOperate = true;
      }
      // if (this.taskTimeData[0].replyContent == "0") {
      //   this.isDCOperate = true;
      //   this.isWCOperate = true;
      // }
      if (this.taskState <= 0) {
        this.isDCOperate = true;
      }
      if (this.taskState > 0 && this.taskState < 2) {
        this.isDCOperate = false;
      }
      if (this.taskState >= 2 && this.taskState < 3) {
        this.isDCOperate = false;
        this.isJJBOperate = false;
      }
      if (this.taskState >= 3) {
        this.isShowDCBtn = false;
        this.isJJBOperate = true;
      }
      // 2.调查完成按钮
      if (this.taskState < 3) {
        this.isWCOperate = true;
      }
      if (this.taskState >= 3) {
        this.isWCOperate = false;
      }
      if (this.taskState >= 4) {
        this.isShowWCBtn = false;
        this.isJJBOperate = false;
      }
      this.recallInfo.sendContent = this.taskTimeData[0].sendContent;
      this.recallInfo.replyContent = this.taskTimeData[0].replyContent;
      this.returnResult = this.taskTimeData[0].returnResult;
      // console.log(this.returnResult.split(","));
      this.checkboxGroup.splice(0, this.checkboxGroup.length);
      for (let i = 0; i < this.returnResult.split(",").length; i++) {
        this.checkboxGroup.push(this.returnResult.split(",")[i]);
      }
      // this.checkboxGroup = this.returnResult.split(",");
      this.detailMsg.returnMark = this.taskTimeData[0].returnMark;

      // 党办操作结果
      this.radioLable = this.taskTimeData[0].returnEvaluate;
      // 3.回访按钮
      if (this.taskState < 4) {
        this.isHFOperate = true;
      }
      if (this.taskState >= 4) {
        this.isHFOperate = false;
      }
      if (this.taskState >= 5) {
        this.isShowHFBtn = false;
      }
      this.textarea = this.taskTimeData[0].DBReturnMark;
    }, 500); //必须要设置延时时间
  },
  mounted() {
    setTimeout(() => {
      console.log(localStorage.getItem("saveUser"));

      if (localStorage.getItem("saveUser") == "急救科") {
        this.isHFOperate = true;
        this.isDBOperate = true;
      }
      if (localStorage.getItem("saveUser") == "党办") {
        this.isWCOperate = true;
        this.isJJBOperate = false;
      }
    }, 900); //必须设置间隔时间
  },
};
</script>

<style lang="less" scoped>
.el-divider {
  background-color: rgb(0, 150, 255);
}
/deep/ .recallInfo .el-card,
/deep/ .emergencyReply .el-card,
/deep/ .end .el-card {
  margin: 0.5vw;
  .el-card__body {
    background: #ffffff;
    padding: 10px;
  }
}
.discontent span {
  margin: 10px;
}
.end span {
  margin: 10px;
}
</style>
