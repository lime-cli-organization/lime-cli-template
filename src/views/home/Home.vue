<template>
  <div class="wrapper">
    <van-cell title="日历" is-link to="/example/calendar" />
    <van-cell title="日历" is-link to="/example/calendar" />
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
    this.isFirstEnter = true;
  },
  beforeRouteEnter(to, from, next) {
    if (from.path !== "/home/list") {
      to.meta.isBack = true;
    }
    next();
  },
  activated() {
    if (this.$route.meta.isBack || this.isFirstEnter) {
      this.init();
    }
    this.$route.meta.isBack = false;
    this.isFirstEnter = false;
  },
  methods: {
    init() {
      console.log(
        "================ 搜索条件初始化 & 数据请求 ================="
      );
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  padding: 20px;
}
.van-cell {
  margin: 0 0 12px;
  align-items: center;
  justify-content: space-between;
  color: #323233;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  border-radius: 40px;
  background: #f7f8fa;
}
.van-cell__title {
  text-align: left;
}
</style>
