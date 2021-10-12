<template>
  <div class="home">
    <nav-slot>
      <template v-slot:left>回访系统</template>
      <template v-slot:right>
        <div class="right-content">
          <span>
            <el-tooltip placement="bottom" effect="light">
              <div slot="content" @click="userExit" style="cursor: pointer">
                退出
              </div>
              <el-button>{{ role }} | {{ "工号：" }} {{ workCode }}</el-button>
            </el-tooltip>
          </span>
          <img src="../../../assets/img/userImg.jpg" alt="" />
        </div>
      </template>
    </nav-slot>
    <left-menu />
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import NavSlot from "components/common/NavSlot";
import LeftMenu from "components/content/leftMenu/LeftMenu";
import store from "@/store/index.js";
import { getLogin } from "network/loginInfo";
export default {
  name: "Home",
  components: {
    NavSlot,
    LeftMenu,
  },
  data() {
    return {
      userInfo: { id: "", userInput: "", pswdInput: "" },
      isLogin: "",
      role: "",
      workCode: "",
    };
  },
  methods: {
    userExit() {
      this.$router.push("/login");
    },
  },
  created() {
    // console.log(this.$route.query);
    var routerParams = this.$route.query;
    this.userInfo.userInput = routerParams.userName;
    this.userInfo.pswdInput = routerParams.pwd;
    // console.log(this.userInfo.pswdInput)
    setTimeout(() => {
      if (this.userInfo.userInput != "" && this.userInfo.pswdInput != "") {
        getLogin(this.userInfo.userInput, this.userInfo.pswdInput).then(
          (data) => {
            // console.log(data);
            this.isLogin = data[0].x;
            this.role = data[0].y;
            if (this.isLogin == "1") {
              this.$router.push({
                path: "/home",
                query: {
                  userName: this.userInfo.userInput,
                  pwd: this.userInfo.pswdInput,
                },
              }); //符合条件登录
              this.$message({
                message: "您好！欢迎登录回访系统",
                type: "success",
              });
              localStorage.setItem("saveUser", this.role);
              localStorage.setItem("saveUserCode", "");
              localStorage.setItem("saveUserCode", this.userInfo.userInput);
              // console.log(localStorage.getItem("saveUserCode"));
              this.role = localStorage.getItem("saveUser");
              this.workCode = localStorage.getItem("saveUserCode");
            } else if (this.isLogin == "0") {
              this.$router.push("/erro");
              this.$alert("没有权限登录", "", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$message({
                    type: "info",
                    message: `提示: 请输入正确的权限用户`,
                  });
                },
              });
            } else {
              this.$router.push("/erro");
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
          }
        );
      } else if (
        this.userInfo.userInput == "" ||
        this.userInfo.pswdInput == ""
      ) {
        this.$router.push("/erro");
        this.$alert("用户名或密码不能为空", "", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `提示: 请输入正确用户名和密码`,
            });
          },
        });
      }
      // getLogin(this.userInfo.userInput, this.userInfo.pswdInput).then(
      //   (data) => {
      //     console.log(data);
      //     this.isLogin = data[0].x;
      //     this.role = data[0].y;
      //     // console.log(typeof this.isLogin);

      //     if (this.userInfo.userInput != "" && this.userInfo.pswdInput != "") {
      //       if (this.isLogin === "1") {
      //         this.$router.push({
      //           path: "/home",
      //           query: {
      //             userName: this.userInfo.userInput,
      //             pwd: this.userInfo.pswdInput,
      //           },
      //         }); //符合条件登录
      //         this.$message({
      //           message: "您好！欢迎登录回访系统",
      //           type: "success",
      //         });
      //         localStorage.setItem("saveUser", this.role);
      //         localStorage.setItem("saveUserCode", this.userInfo.userInput);
      //         console.log(localStorage.getItem("saveUserCode"));
      //       } else if (this.isLogin === "0") {
      //         this.$alert("没有权限登录", "", {
      //           confirmButtonText: "确定",
      //           callback: (action) => {
      //             this.$message({
      //               type: "info",
      //               message: `提示: 请输入正确权限用户`,
      //             });
      //           },
      //         });
      //       } else {
      //         this.$alert("此用户不存在，请重新输入", "", {
      //           confirmButtonText: "确定",
      //           callback: (action) => {
      //             this.$message({
      //               type: "info",
      //               message: `提示: 请输入正确用户名`,
      //             });
      //           },
      //         });
      //       }
      //       // this.$router.push({
      //       //     path: "/err",
      //       //   });
      //     } else if (
      //       this.userInfo.userInput == "" ||
      //       this.userInfo.pswdInput == ""
      //     ) {
      //       this.$alert("用户名或密码不能为空", "", {
      //         confirmButtonText: "确定",
      //         callback: (action) => {
      //           this.$message({
      //             type: "info",
      //             message: `提示: 请输入正确用户名`,
      //           });
      //         },
      //       });
      //       // console.log("用户名密码为空")
      //       // this.$router.push("/erro");
      //     }
      //   }
      // );
      // this.role = localStorage.getItem("saveUser");
      // this.workCode = localStorage.getItem("saveUserCode");
    }, 100);
    // this.userInfo.userInput = localStorage.getItem("saveUser");
  },
};
</script>

<style lang="less" scpoed>
.content {
  background: none repeat scroll 0 0 #ffffff;
  position: absolute;
  left: 180px;
  right: 0;
  top: 70px;
  bottom: 0;
  width: auto;
  padding: 0;
  box-sizing: border-box;
  overflow-y: scroll;
  // border: 1px solid red;
  height: 90%;
}
.right-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.right-content img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-left: 20px;
}
.right-content span .el-button {
  background: none;
  font-size: 18px;
}
</style>
