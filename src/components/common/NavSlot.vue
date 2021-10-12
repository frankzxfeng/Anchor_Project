<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  height: 60px;
  line-height: 60px;
  text-align: left;
  background-color: rgba(222, 225, 230, 1);
  box-shadow: 0px 1px 0px 0px rgba(232, 232, 232, 1);
  .left,
  .right {
    flex: 1;
  }
  .left{
    font-weight: bold;
    font-size: 23px;
    margin-left: 2vw;
  }
  .right{
    font-size: 15px;
    text-align: center;
  }
  .center {
    flex: 2;
  }
}
</style>
