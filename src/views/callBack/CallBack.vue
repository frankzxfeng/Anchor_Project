<template>
  <div class="call-back">
     <el-row>
      <el-col :span="24">
          <select-call-back />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
          <call-back-form />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SelectCallBack from "./childComps/SelectCallBack";
import CallBackForm from "./childComps/CallBackForm";

export default {
  name: "CallBack",
  components: { SelectCallBack, CallBackForm },
};
</script>

<style lang="less" scoped>
</style>
