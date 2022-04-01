<template>
  <div>
    <h1>This is a home page</h1>
    <van-button type="primary" @click="navigatorTo">list按钮</van-button>
    <LSelect
      :props="{
        value: 'id',
        label: 'name',
      }"
      separator="/"
      :filterable="true"
      @change="selectChange"
    />
  </div>
</template>

<script>
import LSelect from '@/components/System/LSelect.vue';
export default {
  name: 'Home',
  components: {
    LSelect,
  },
  created() {
    this.isFirstEnter = true;
  },
  beforeRouteEnter(to, from, next) {
    if (from.path !== '/home/list') {
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
        '================ 搜索条件初始化 & 数据请求 ================='
      );
    },
    navigatorTo() {
      this.$router.push({
        path: '/home/list',
      });
    },
    selectChange(value) {
      console.log(value);
    },
  },
};
</script>
