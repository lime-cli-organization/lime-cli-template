<template>
  <div class="tabbar">
    <div
      class="tab_item"
      :class="currentActive === item.path ? 'tab_active' : ''"
      v-for="item in data"
      :key="item.path"
      @click="navigatorTo(item)"
    >
      <img
        :src="currentActive === item.path ? item.activePath : item.defaultPath"
        :alt="item.title"
      />
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    data: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      currentActive: "", // 导航active状态path
    };
  },
  watch: {
    $route: {
      handler(to) {
        this.data.forEach((element) => {
          if (to.path === element.path) {
            this.currentActive = element.path;
          }
        });
      },
      immediate: true,
    },
  },
  created() {
    if (!this.currentActive) {
      this.currentActive = this.data[0].path;
    }
  },
  methods: {
    navigatorTo(item) {
      // 重复路由跳转vue-router报错
      if (item.path === this.$route.path) {
        return;
      }
      this.$router.push({
        path: item.path,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tabbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  z-index: 99;
  border-top: 1px solid #eeeeee;
  background-color: white;
}
.tab_item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  &.tab_active {
    color: #1296db;
  }
  img {
    width: 25px;
    height: 25px;
    top: 5px;
    padding-bottom: 4px;
    position: absolute;
  }
  span {
    position: absolute;
    top: 33px;
  }
}
</style>
