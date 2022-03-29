<template>
  <div>
    <h1>This is an home list page</h1>
    <van-button type="info" @click="navigatorTo">detail按钮</van-button>
  </div>
</template>
<script>
export default {
  name: 'HomeList',
  data() {
    return {
      isFirstEnter: true,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/home') {
      to.meta.isBack = true;
    }
    next();
  },
  activated() {
    if (this.$route.meta.isBack || this.isFirstEnter) {
      this.init();
    }
    // 恢复成默认的false,避免isBack一直是true,导致下次无法获取数据
    this.$route.meta.isBack = false;
    // 恢复成默认的false,避免isFirstEnter一直是true,导致每次都获取新数据
    this.isFirstEnter = false;
  },
  methods: {
    init() {
      console.log(
        '================ list 搜索条件初始化 & 数据请求 ================='
      );
    },
    navigatorTo() {
      this.$router.push({
        path: '/home/list/detail',
      });
    },
  },
};
</script>
