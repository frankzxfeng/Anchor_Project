<template>
  <div class="login">
    <el-card class="box-card">
      <div class="login-box">
        <div class="box-content">
          <h2>回访系统</h2>
          <div class="userName-box">
            <i class="el-icon-user"></i>
            <el-input
              v-model="userInfo.userInput"
              placeholder="请输入用户名"
              clearable
            ></el-input>
          </div>
          <div class="passwd-box">
            <i class="el-icon-key"></i>
            <el-input
              placeholder="请输入密码"
              v-model="userInfo.pswdInput"
              show-password
              clearable
            ></el-input>
          </div>
          <div class="btn-box">
            <el-button type="primary" round @click="loginClick">登录</el-button>
          </div>
        </div>
      </div>
    </el-card>

    <!-- <span class="zhiTitle">最近发现时间</span>
    <span class="timeChange">
      <span class="timeChangeSpan">
        <el-date-picker
          class="zhiTime"
          type="date"
          v-model="form.lastDiscoveryStartTime"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptionsStart"
          @change="timeOptions"
        ></el-date-picker>
      </span>
      <span class="zhiCenter">—</span>
      <span class="timeChangeSpan">
        <el-date-picker
          class="zhiTime"
          type="date"
          v-model="form.lastDiscoveryEndTime"
          :picker-options="pickerOptionsEnd"
          value-format="yyyy-MM-dd"
          @focus="timeOptionsEnd"
          ref="lastDiscoveryEndTime"
        ></el-date-picker>
      </span>
    </span> -->
  </div>
</template>

<script>
import store from "@/store";
import { getDateTime } from "../../utils/timeFormat";
import { getLogin } from "network/loginInfo";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      userInfo: { id: "", userInput: "", pswdInput: "" },
      isLogin: "",
      role: "",
    };
  },
  methods: {
    loginClick() {
      //如果data.x=1表示可以登录,为0没有权限登录,data.y是登录角色
      // console.log(this.userInfo.userInput);
      // console.log(this.userInfo.pswdInput);
      getLogin(this.userInfo.userInput, this.userInfo.pswdInput).then(
        (data) => {
          // console.log(data);
          this.isLogin = data[0].x;
          this.role = data[0].y;
          // console.log(typeof this.isLogin);
        }
      );
      // //请求账户验证登录
      setTimeout(() => {
        if (this.userInfo.userInput != "" && this.userInfo.pswdInput != "") {
          if (this.isLogin == "1") {
            this.$router.push({
              path: "/home",
              query: {
                userName: this.userInfo.userInput,
                pwd: this.userInfo.pswdInput,
              },
            }); //符合条件登录
            // this.$message({
            //   message: "您好！欢迎登录回访系统",
            //   type: "success",
            // });
            localStorage.setItem("saveUser", this.role);//角色名
            localStorage.setItem("saveUserCode", this.userInfo.userInput);//当前角色工号
            // console.log(localStorage.getItem("saveUserCode"))
          } else if (this.isLogin == "0") {
            this.$alert("没有权限登录", "", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$message({
                  type: "info",
                  message: `提示: 请输入正确权限用户`,
                });
              },
            });
          } else {
            this.$alert("此用户不存在，请重新输入", "", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$message({
                  type: "info",
                  message: `提示: 请输入正确用户名`,
                });
              },
            });
          }
        } else if (
          this.userInfo.userInput == "" ||
          this.userInfo.pswdInput == ""
        ) {
          this.$alert("用户名或密码不能为空", "", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `提示: 请输入正确用户名`,
              });
            },
          });
        }
      }, 1500);
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100vw;
  background-image: url("~assets/img/loginbgimg.jpg");
  background-size: cover;
  .box-card {
    height: 430px;
    width: 350px;
    position: relative;
    float: right;
    top: 20vh;
    right: 15vw;
    display: flex; //使盒子垂直居中
    justify-content: center;
    align-items: center;
  }
}
.box-card {
  .login-box {
    text-align: center;
  }
}
/* 使得图标和输入框同行 */
.box-content .userName-box,
.box-content .passwd-box,
.box-content .btn-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3vh;
  // border: 1px solid red;
}
.el-icon-user,
.el-icon-key {
  font-size: 25px;
}
.el-button {
  width: 180px;
  margin-left: 30px;
}
</style>
