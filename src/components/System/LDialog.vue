<template>
  <div class="l_dialog" v-if="visible">
    <div class="l_dialog_content">
      <div class="l_dialog_header">
        <div class="title">这是一个标题</div>
        <LSvg iconName="close_fill" color="#dcdfe6" @click.native="close" />
      </div>
      <div class="l_dialog_body">这是一个内容</div>
      <div class="l_dialog_footer">
        <button class="btn cancel" @click="close">取消</button>
        <button class="btn confirm" @click="confirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
import LSvg from "@/components/System/LSvg.vue";
export default {
  name: "LDialog",
  components: {
    LSvg,
  },
  props: {
    visible: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
    confirm() {
      this.$emit("update:visible", false);
      this.$emit("comfirm");
    },
  },
};
</script>

<style lang="less" scoped>
.l_dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
}
.l_dialog_content {
  width: 80%;
  background-color: white;
  margin: 15% auto;
}
.l_dialog_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px;
  border-bottom: 1px solid #e4e7ed;
  .title {
    font-size: 16px;
    font-weight: bold;
  }
}
.l_dialog_body {
  padding: 20px 0;
}
.l_dialog_footer {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid #e4e7ed;
  .btn {
    background-color: transparent;
    border: none;
    outline: none;
    width: 40%;
    padding: 10px;
    &.confirm {
      border: 1px solid @primary;
      color: white;
      background-color: @primary;
    }
    &.cancel {
      border: 1px solid rgb(248, 248, 248);
      color: #998;
      background-color: rgb(241, 243, 244);
    }
  }
}
</style>