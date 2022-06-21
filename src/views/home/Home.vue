<template>
  <div class="wrapper">
    <van-cell title="日历" is-link to="/example/calendar" />
    <van-cell title="Select-TODO" is-link to="/example/select" />
    <van-cell title="Dialog" is-link to="/example/dialog" />
    <van-cell title="Skeleton" is-link to="/example/skeleton" />
    <van-cell title="PDF压缩下载" is-link to="/example/downloadPDFZip" />
    <van-cell title="数据解析" is-link to="/example/algorithm" />
    <van-cell title="答题-全量" is-link to="/example/exercise/visibleControl" />
    <van-cell title="答题-页面一题" is-link to="/example/exercise/topic/1" />
    <van-cell title="页面缓存" is-link to="/example/keepalive/list" />
    <van-cell title="Svg" is-link to="/example/svg" />
    <van-cell title="Echarts" is-link to="/example/echarts" />
    <van-cell title="Swiper" is-link to="/example/swiper" />
    <van-cell title="math.js,day.js" is-link to="/example/external" />
    <van-cell title="动画" is-link to="/example/animation" />
    <van-cell title="Canvas" is-link to="/example/canvas/editTemplate" />
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
    this.isFirstEnter = true;
  },
  beforeRouteEnter(to, from, next) {
    if (from.path !== "/example/keepalive/list") {
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
