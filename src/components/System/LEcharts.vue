<template>
  <div class="l_echarts" :id="id">
    <div v-if="isDataEmpty" class="chart_empty" key="empty">
      <slot name="empty">{{ isDataEmpty }}{{ empty }}</slot>
    </div>
    <div v-else class="my_charts" :type="type" key="data"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { merge, isEmpty } from "lodash";
export default {
  name: "LEcharts",
  props: {
    type: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
    option: {
      type: Object,
      require: true,
    },
    empty: {
      default: () => {
        return "暂无数据！";
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    isDataEmpty() {
      const { option } = this;
      if (isEmpty(option)) {
        return true;
      }
      return false;
    },
  },
  watch: {
    option: {
      deep: true,
      handler(newVal) {
        if (isEmpty(newVal)) {
          this.echarts && this.echarts.clear();
        }
        this.init();
      },
    },
  },
  mounted() {
    if (!isEmpty(this.option)) {
      this.init();
      window.addEventListener("resize", () => {
        this.chart.resize();
      });
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        if (!isEmpty(this.option)) {
          this.echarts = echarts.init(
            document.querySelector(`#${this.id} .my_charts`)
          );
          let baseOpton = {};
          switch (this.type) {
            case "line":
              baseOpton = {
                grid: {
                  left: 50,
                  right: 20,
                  bottom: 50,
                },
              };
              break;
            case "bar":
              break;
            case "radar":
              break;
          }
          this.echarts.setOption(merge(baseOpton, this.option));
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.l_echarts,
.chart_wrapper,
.my_charts {
  width: 100%;
  height: 100%;
}
.chart_empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
}
</style>