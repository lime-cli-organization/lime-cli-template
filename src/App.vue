<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <TabBar v-if="!$route.meta.hideTab" :data="tabList" />
  </div>
</template>
<script>
// name > components > mixins > props > data > computed > watch > filter > 钩子函数 > methods
import TabBar from '@/components/System/TabBar.vue';
export default {
  components: { TabBar },
  data() {
    return {
      currentActive: '/home',
      tabList: [
        {
          path: '/home',
          defaultPath: require('@/assets/tabbar/home.svg'),
          activePath: require('@/assets/tabbar/home_active.svg'),
          title: '首页',
        },
        {
          path: '/mine',
          defaultPath: require('@/assets/tabbar/home.svg'),
          activePath: require('@/assets/tabbar/home_active.svg'),
          title: '我的',
        },
      ],
    };
  },
  computed: {
    isPageLoading() {
      return this.$store.state.app.isPageLoading;
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
