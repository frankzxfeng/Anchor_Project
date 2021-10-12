<template>
  <div class="dialog-nav">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'DialogNav'
}
</script>

<style lang="less" scoped>
  .dialog-nav {
    display: flex;
    height: 35px;
    line-height: 35px;
    text-align: left;
    background: rgba(0, 150, 250, 0.05);
  }
  .left, .right {
    flex: 1;
    margin-left: 10px;
    color:black;
    font-size: 15px;
    font-weight: bold;
  }
  .center {
    flex: 2;
  }
</style>
