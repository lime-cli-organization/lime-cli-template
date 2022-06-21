<template>
  <div class="wrapper">
    <br />
    <van-button type="info" @click="navigatorTo" size="small">
      detail按钮
    </van-button>
    <div class="list_wrapper">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item.id" :title="item.name" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getList } from "@/apis/test";
export default {
  name: "AliveList",
  data() {
    return {
      isFirstEnter: true,
      finished: false,
      loading: false,
      refreshing: false,
      page: 1,
      list: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/home") {
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
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    async onLoad() {
      if (this.refreshing) {
        this.page = 1;
        this.list = [];
        this.refreshing = false;
      }
      const { total, data: list } = await getList({
        name: null,
        level: "undefined",
        realName: "",
        page: this.page,
        areaId: 0,
      });
      this.list = this.list.concat(list);
      this.loading = false;
      this.page++;
      if (this.list.length >= total) {
        this.finished = true;
      }
    },
    init() {
      console.log(
        "================ list 搜索条件初始化 & 数据请求 ================="
      );
    },
    navigatorTo() {
      this.$router.push({
        path: "/example/keepalive/detail",
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
  font-size: 18px;
  padding: 18px;
  line-height: 36px;
}
/* .list_wrapper {
  height: 300px;
  overflow: scroll;
} */
</style>
