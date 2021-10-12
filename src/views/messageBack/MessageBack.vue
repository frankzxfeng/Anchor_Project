<template>
  <div class="message-back">
    <el-row>
      <el-col :span="24">
          <slelect-msg-back />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <msg-back-form />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MsgBackForm from "./childComps/MsgBackForm.vue";
import SlelectMsgBack from "./childComps/SlelectMsgBack.vue";
export default {
  components: { SlelectMsgBack, MsgBackForm },
  name: "MessageBack",
};
</script>

<style lang="less" scoped>
.message-back{
margin-left: 0px;
}
</style>
