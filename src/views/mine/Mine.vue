<template>
  <div class="mine">
    <h1>This is a mine page</h1>
    <van-button type="primary" @click="navigatorTo">主要按钮</van-button>
  </div>
</template>
<script>
export default {
  name: 'Mine',
  methods: {
    navigatorTo() {
      this.$router.push({
        path: '/about',
      });
    },
  },
};
</script>
