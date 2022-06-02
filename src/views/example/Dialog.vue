<template>
  <div class="wrapper">
    <van-button
      plain
      type="info"
      size="small"
      @click="isDialogVisible = !isDialogVisible"
      >toggle</van-button
    >
    <LDialog :visible.sync="isDialogVisible" />
  </div>
</template>

<script>
import LDialog from "@/components/System/LDialog.vue";
export default {
  name: "Dialog",
  components: {
    LDialog,
  },
  data() {
    return {
      isDialogVisible: false,
    };
  },
};
</script>

<style>
</style>