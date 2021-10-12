<template>
  <div class="left-menu-items">
    <el-menu
      :default-active="onRoutes"
      class="el-menu-vertical-demo"
      :router="true"
      active-text-color="#409eff"
    >
      <el-menu-item index="messageback">
        <i class="el-icon-message"></i>
        <span slot="title">短信回访</span>
      </el-menu-item>
      <el-menu-item index="callback">
        <i class="el-icon-phone-outline"></i>
        <span slot="title">电话回访</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "LeftMenuItem",
  methods: {},
  computed: {
    onRoutes() {
      //获取匹配的el-menu-item组件中index值,设置左边侧边栏高亮显示
      // console.log(this.$route.path.replace("/home", "messageback"))
      // return this.$route.path.replace("/home", "messageback");
      if (this.$route.path.replace("/", "") == "home") {
        return this.$route.path.replace("/home", "messageback");
      } else {
        return this.$route.path.replace("/", "");
      }
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
.left-menu-items {
  display: block;
  position: absolute;
  width: 160px;
  left: 0;
  bottom: 0;
  top: 70px;
}
.el-menu {
  height: 100%;
  line-height: 100%;
  background: rgb(255, 255, 255);
  // background: #6a89cc;
}
// 菜单项flex布局，并且垂直居中
.el-menu-item {
  margin-top: 20px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // border: 1px solid white;
}

// 设置图片文字大小
/deep/ i.el-icon-message,
/deep/ i.el-icon-phone-outline,
span {
  font-size: 25px;
  height: 25px;
  line-height: 25px;
  width: 120px;
  // border: 1px solid red;
}
span {
  font-size: 16px;
  text-align: center;
}
/deep/ .el-menu-item [class^="el-icon-"] {
  margin-right: 0px;
}
// 左侧栏点击移动效果
/deep/ .el-menu-item:hover {
  border: 1px solid rgba(48, 127, 253, 1);
  background-color: #ffffff;
}
/deep/ .el-menu-item.is-active {
  background: rgba(222, 225, 230, 1);
}
</style>
