<template>
  <van-overlay :show="isLoading" :class-name="className" z-index="100">
    <div class="overlay_content">
      <van-loading size="24px" vertical color="#1989fa">{{ text }}</van-loading>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'LLoading',
  data() {
    return {
      isLoading: false,
      text: '加载中...',
      className: 'overlay',
    };
  },
  methods: {
    setText(text) {
      this.text = text;
    },
  },
};
</script>
<style lang="less" scoped>
.overlay_content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
