<template>
  <div class="left-menu">
    <left-menu-item/>
  </div>
</template>

<script>
import MessageBack from "views/messageBack/MessageBack.vue";
import LeftMenuItem from "./childComps/LeftMenuItem";

export default {
  name: "LeftMenu",
  components: {
    LeftMenuItem,
    MessageBack,
  },
};
</script>
 <style lang="less" scoped>
</style>
