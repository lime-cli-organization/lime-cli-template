<template>
  <div class="wrapper">
    <br />
    detail
  </div>
</template>
<script>
export default {
  name: "AliveList",
  data() {
    return {
      isFirstEnter: true,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log("================ detail 数据请求 =================");
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
