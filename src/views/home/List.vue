<template>
  <div class="wrapper">
    <h1>This is an home list page</h1>
    <van-button type="info" @click="navigatorTo">detail按钮</van-button>
    <br />
    <div class="pdfDom">
      111111111111111这是一个 数据1 这是一个 数据1
      <p>111111111111111这是一个 数据1 这是一个 数据1</p>
      <p>111111111111111这是一个 数据1 这是一个 数据1</p>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
      <h1>111111111111111这是一个 数据1 这是一个 数据1</h1>
    </div>
    <div class="pdfDom">22222222222222这是一个 数据2 这是一个 数据3</div>
    <div class="pdfDom">333333333333333这是一个 数据2 这是一个 数据4</div>
    <div class="pdfDom">444444444444444444这是一个 数据2 这是一个 数据5</div>
    <van-button type="info" @click="transform">PDF按钮</van-button>
    <div>
      <template v-for="item in canvas">{{ item }}</template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeList',
  data() {
    return {
      isFirstEnter: true,
      canvas: [],
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
    transform() {
      this.html2pdf('.pdfDom', `个人报告`);
    },
    navigatorTo() {
      this.$router.push({
        path: '/home/list/detail',
      });
    },
  },
};
</script>
<style>
.wrapper {
  padding-bottom: 50px;
}
h1 {
  font-size: 36px;
}
</style>
