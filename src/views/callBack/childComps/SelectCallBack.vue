<template>
  <div class="select-call-back">
    <div class="father-box">
      <!-- v-show="isShow == true" -->
      <el-card shadow="hover">
        <!-- 时间主搜索条件 -->
        <el-form :inline="true" :model="formDateTime" class="demo-form-inline">
          <el-form-item label="开始时刻:">
            <div class="block">
              <el-date-picker
                v-model="formDateTime.startDate"
                type="date"
                placeholder="选择日期"
                size="mini"
                style="width: 150px"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsStart"
                @change="timeOptions"
              >
              </el-date-picker>
              &nbsp;
              <el-time-picker
                v-model="formDateTime.startTime"
                placeholder="选择时间点"
                size="mini"
                style="width: 150px"
                value-format="HH:mm:ss"
              >
              </el-time-picker>
            </div>
          </el-form-item>
          <el-form-item label="结束时刻:" style="margin-left: 10px">
            <div class="block">
              <el-date-picker
                v-model="formDateTime.endDate"
                type="date"
                placeholder="选择日期"
                size="mini"
                style="width: 150px"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptionsEnd"
                @focus="timeOptionsEnd"
                ref="lastDiscoveryEndTime"
              >
              </el-date-picker>
              &nbsp;
              <el-time-picker
                v-model="formDateTime.endTime"
                placeholder="选择时间点"
                size="mini"
                style="width: 150px"
                value-format="HH:mm:ss"
              >
              </el-time-picker>
            </div>
          </el-form-item>
          <el-form-item class="select-filter">
            <el-divider direction="vertical"></el-divider>
            <el-button type="info" plain @click="filterClick" :disabled="onlyClickOne == true"
              ><img src="../../../assets/img/shaixuan.png" alt="筛选" />
              <span style="color: black">筛选</span></el-button
            >
          </el-form-item>
          <el-form-item class="select-btn">
            <el-button type="primary" @click="onSelect">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <br />
    <transition name="el-fade-in-linear">
      <div class="son-box" v-show="isShowSon == false">
        <el-card shadow="hover">
          <!-- 子盒子左边一列内容 -->
          <div class="left">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="任务号:">
                <el-input
                  v-model="formInputAlign.taskNum"
                  placeholder="请输入任务号"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="患者姓名:" style="margin-bottom: 0px">
                <el-input
                  v-model="formInputAlign.patientName"
                  placeholder="请输入患者姓名"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="center">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="司机">
                <el-input
                  v-model="formInputAlign.drive"
                  placeholder="请输入司机姓名"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="医生" style="margin-bottom: 0px">
                <el-input
                  v-model="formInputAlign.doctor"
                  placeholder="请输入医生姓名"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <!-- 子盒子右侧第一列内容 -->
          <div class="right1">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="分站:">
                <el-select
                  v-model="formSelectAlign.subStnValue"
                  clearable
                  placeholder="请选择"
                  @change="getSubStn"
                  @visible-change="showSubStn"
                >
                  <el-option
                    v-for="(item,index) in formSelectAlign.subStnOptions"
                    :key="item.value + index"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车辆:" style="margin-bottom: 0px">
                <el-select
                  v-model="formSelectAlign.ambulanceValue"
                  clearable
                  placeholder="请选择"
                  @change="getAmbulance"
                  @visible-change="showAmbulance"
                  filterable
                  allow-create
                >
                  <el-option
                    v-for="(item,index) in formSelectAlign.ambulanceOptions"
                    :key="item.value + index"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <!-- 子盒子右侧第2列内容 -->
          <div class="right2">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="电话号码:">
                <el-input
                  v-model="formInputAlign.phoneNum"
                  placeholder="请输入电话号码"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="状态:" style="margin-bottom: 0px">
                <el-select
                  v-model="formSelectAlign.msgStatusValue"
                  clearable
                  placeholder="请选择"
                  @change="getMsgStatus"
                >
                  <el-option
                    v-for="item in formSelectAlign.msgStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <!-- <el-form-item label="回访情况">
                <el-select
                  v-model="formSelectAlign.reviewSituatValue"
                  clearable
                  placeholder="请选择"
                  @change="getReviewSituat"
                >
                  <el-option
                    v-for="item in formSelectAlign.reviewSituatOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item> -->
            </el-form>
          </div>
          <!-- 子盒子右侧第3列内容 -->
          <div class="right3">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="护士">
                <el-input
                  v-model="formInputAlign.nurse"
                  placeholder="请输入护士姓名"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="现场地址" style="margin-bottom: 0px">
                <el-input
                  v-model="formInputAlign.senceAddress"
                  placeholder="请输入现场地址"
                  clearable
                ></el-input>
              </el-form-item>

              <!-- <el-form-item label="送往地址">
                <el-input v-model="formInputAlign.sendAddress" placeholder="请输入送往地址" clearable></el-input>
              </el-form-item> -->
            </el-form>
          </div>
        </el-card>
      </div>
    </transition>
    <br />
  </div>
</template>

<script>
import { getDropListLable } from "@/utils/dropListLable.js";
import { getDateTime } from "@/utils/timeFormat.js";
import { getMsgAndCallBack } from "network/msgAndCallBack";
import { getStationName } from "network/getStationName";
import { getAmbulance, getAllAmbulance } from "network/getAmbulance";
export default {
  name: "SelectCallBack",
  data() {
    return {
      onlyClickOne: false,
      pickerOptionsStart: {
        //开始的时间
        disabledDate(time) {
          // return time.getTime() > Date.now() - 8.64e7 || time.getTime() < Date.now() - 60 * 24 * 60 * 60 * 1000
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      pickerOptionsEnd: {},
      isShow: true,
      isShowSon: true,
      subStnLable: "",
      msgStatusLable: "",
      ambulanceLable: "",
      ambulanceLicence: " ",
      reviewSituatLable: "",
      formDateTime: {
        startDate: "", //获取前一天的日期
        startTime: "08:00:00",
        endDate: "",
        endTime: "08:00:00",
      },
      formInputAlign: {
        taskNum: "",
        patientName: "",
        phoneNum: "",
        senceAddress: "",
        sendAddress: "",
        doctor: "",
        nurse: "",
        drive: "",
      },
      formSelectAlign: {
        // 分站选择
        subStnValue: "",
        subStnOptions: [
          {
            value: "",
            label: "",
          },
        ],
        // 短信状态选择
        msgStatusValue: "",
        msgStatusOptions: [
          {
            value: "",
            label: "",
          },
          {
            value: "0",
            label: "未发送",
          },
          {
            value: "1",
            label: "已发送",
          },
          // {
          //   value: "2",
          //   label: "非常满意",
          // },
          {
            value: "3",
            label: "满意",
          },
          {
            value: "4",
            label: "不满意",
          },
          {
            value: "5",
            label: "调查中",
          },
          {
            value: "6",
            label: "完成调查",
          },
          {
            value: "7",
            label: "完成评价",
          },
        ],
        // 车辆选择
        ambulanceValue: "",
        ambulanceOptions: [
          {
            value: "",
            label: "",
          },
        ],
        // 回访状态
        // reviewSituatnValue: "",
        // reviewSituatOptions: [
        //   {
        //     value: "",
        //     label: "",
        //   },
        //   {
        //     value: "1",
        //     label: "不满意",
        //   },
        //   {
        //     value: "2",
        //     label: "已发送",
        //   },
        //   {
        //     value: "3",
        //     label: "未发",
        //   },
        //   {
        //     value: "4",
        //     label: "非常满意",
        //   },
        //   {
        //     value: "5",
        //     label: "一般",
        //   },
        // ],
      },
    };
  },
  methods: {
    timeOptions() {
      this.formDateTime.endDate = ""; // 当开始时间改变时 就让结束时间清空
    },
    timeOptionsEnd() {
      // 若不填开始时间的值，先选择结束时间就提示用户填写开始时间
      if (
        this.formDateTime.startDate == "" ||
        this.formDateTime.startDate == null
      ) {
        // 不让弹出结束时间框
        this.$refs.lastDiscoveryEndTime.pickerVisible = false;
        return this.$message.warning("请填写开始时间");
      } else {
        // 若开始时间填写 结束时间的弹出选择时间框正常显示
        this.$refs.lastDiscoveryEndTime.pickerVisible = true;
      }
      let that = this;
      // 结束时间是在开始时间的基础上去建立可选范围
      this.pickerOptionsEnd = {
        disabledDate(time) {
          let dataLast = new Date(that.formDateTime.startDate).getTime();
          return (
            // 不超过一个月且不能选当天且可以选和开始时间一样的日期
            // time.getTime() > dataLast + 31 * 24 * 60 * 60 * 1000 || time.getTime() < dataLast - 8.64e7 || time.getTime() > Date.now() - 8.64e7
            //取30天以内
            time.getTime() < dataLast ||
            time.getTime() > dataLast + 30 * 24 * 60 * 60 * 1000
          );
        },
      };
    },
    filterClick() {
      this.onlyClickOne = true;
      this.isShowSon = false;
      // getStationName().then((data) => {
      //   data = data.map((v) => {
      //     return { value: v.x, label: v.y };
      //   });
      //   // console.log(data);
      //   for (let i = 0; i < data.length; i++) {
      //     this.formSelectAlign.subStnOptions.push(data[i]);
      //   }
      //   // console.log(this.formSelectAlign.subStnOptions);
      // });
    },
    onSelect() {
      this.onlyClickOne = false;//点击查询取消限制筛选按钮
      this.isShowSon = true;
      //请求电话回访数据
      localStorage.setItem("formDateTimeCall","");
      localStorage.setItem("formInputAlignCall","");
      localStorage.setItem("subStnLableCall","");
      localStorage.setItem("ambulanceLableCall","");
      localStorage.setItem("msgStatusLableCall","");
      localStorage.setItem("formDateTimeCall",JSON.stringify(this.formDateTime));
      localStorage.setItem("formInputAlignCall",JSON.stringify(this.formInputAlign));
      localStorage.setItem("subStnLableCall",this.subStnLable,);
      localStorage.setItem("ambulanceLableCall",this.ambulanceLable,);
      localStorage.setItem("msgStatusLableCall",this.msgStatusLable,);

      // console.log(JSON.parse(localStorage.getItem("formDateTimeCall")).startDate)
      // console.log(JSON.parse(localStorage.getItem("formInputAlignCall")))

      getMsgAndCallBack(
        this.formDateTime.startDate + " " + this.formDateTime.startTime,
        this.formDateTime.endDate + " " + this.formDateTime.endTime,
        this.formInputAlign.taskNum,
        this.subStnLable,
        this.ambulanceLable,
        this.formInputAlign.nurse,
        this.formInputAlign.doctor,
        this.formInputAlign.drive,
        this.formInputAlign.patientName,
        this.msgStatusLable,
        this.formInputAlign.senceAddress,
        this.formInputAlign.phoneNum
      ).then((data) => {
        // console.log(data)
        this.$bus.$emit("getCallData", data);
        // if (data.length > 0) {
        //   this.$bus.$emit("getCallData", data);
        // }else{
        //   this.$message({
        //         type: "success",
        //         message: "无数据，请重新选择条件进行查询!",
        //       });
        // }
      });
    },
    getSubStn(val) {
      if (this.formSelectAlign.ambulanceValue) {
        //重新选择分站时，如果车辆下拉列表有值则将其清空
        this.formSelectAlign.ambulanceValue = "";
      }
      this.formSelectAlign.ambulanceOptions.splice(
        1,
        this.formSelectAlign.ambulanceOptions.length
      ); //重新选择分站时,恢复车辆选项到默认值（也就是清空push进来的对象）
      var options = this.formSelectAlign.subStnOptions;
      // console.log(options);
      var res = getDropListLable(options, val);
      // console.log(res);
      this.subStnLable = val;
      // console.log(val)
      //获取分站中的车辆
      getAmbulance(val).then((data) => {
        // console.log(data);
        data = data.map((v) => {
          return { value: v.x, label: v.y };
        });
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.formSelectAlign.ambulanceOptions.push(data[i]);
        }
        // console.log(this.formSelectAlign.ambulanceOptions);
      });
    },
    showSubStn(){//点击分站下拉框时请求分站数据
      if (this.formSelectAlign.ambulanceValue) {
        //重新选择分站时，如果车辆下拉列表有值则将其清空
        this.formSelectAlign.ambulanceValue = "";
      }
      this.formSelectAlign.ambulanceOptions.splice(
        1,
        this.formSelectAlign.ambulanceOptions.length
      ); //重新选择分站时,恢复车辆选项到默认值（也就是清空push进来的对象）
      this.formSelectAlign.subStnOptions.splice(
        1,
        this.formSelectAlign.subStnOptions.length
      );
      getStationName().then((data) => {
        data = data.map((v) => {
          return { value: v.x, label: v.y };
        });
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.formSelectAlign.subStnOptions.push(data[i]);
        }
        // console.log(this.formSelectAlign.subStnOptions);
      });
    },
    showAmbulance() {
      // console.log(this.formSelectAlign.subStnValue)
      // console.log(this.formSelectAlign.ambulanceOptions)
      if (this.formSelectAlign.subStnValue=="" && this.formSelectAlign.ambulanceValue=="") {//如果没有选择分站
        this.formSelectAlign.ambulanceOptions.splice(
        1,
        this.formSelectAlign.ambulanceOptions.length
      );
      // console.log(this.formSelectAlign.ambulanceOptions)
        getAllAmbulance(this.ambulanceLicence).then((data) => {
          // console.log(data);
          data = data.map((v) => {
            return { value: v.x, label: v.y };
          });
          // console.log(data);
          for (let i = 0; i < data.length; i++) {
            this.formSelectAlign.ambulanceOptions.push(data[i]);
          }
        });
      }
    },
    getMsgStatus(val) {
      // var options = this.formSelectAlign.msgStatusOptions;
      // var res = getDropListLable(options, val);
      // console.log(res);
      this.msgStatusLable = val;
      // console.log(this.msgStatusLable);
    },
    getAmbulance(val) {
      var options = this.formSelectAlign.ambulanceOptions;
      var res = getDropListLable(options, val);
      // console.log(res);
      // this.ambulanceLable = res;
      this.ambulanceLicence = res;
      this.ambulanceLable = val;
    },
    getReviewSituat(val) {
      var options = this.formSelectAlign.reviewSituatOptions;
      var res = getDropListLable(options, val);
      // console.log(res);
      this.reviewSituatLable = res;
    },
  },
  created() {
    this.$bus.$on("isSelectMulti", (data) => {
      this.isShow = !data;
      this.isShowSon = true;
    });
    //页面加载时给日期时间搜索框添加默认值
    var arrTime = getDateTime();
    // console.log(arr)
    this.formDateTime.startDate = arrTime[0];
    this.formDateTime.endDate = arrTime[1];
  },
};
</script>

<style lang="less" scoped>
@import "~assets/style/selectTime.less";
</style>
