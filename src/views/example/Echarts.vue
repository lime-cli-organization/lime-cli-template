<template>
  <div>
    echarts
    <div class="chart_wrapper">
      <LEcharts id="example1" :option="radarOption" type="radar" />
    </div>
    <div class="chart_wrapper">
      <LEcharts id="example2" :option="lineOption" type="line">
        <template slot="empty"> 妹有数据啊 </template>
      </LEcharts>
    </div>
  </div>
</template>
<script>
import LEcharts from "@/components/System/LEcharts.vue";
export default {
  name: "Echarts",
  components: {
    LEcharts,
  },
  data() {
    return {
      radarOption: {},
    };
  },
  created() {
    let radarOption = {
      radar: {
        indicator: [
          { name: "Sales", max: 6500 },
          { name: "Administration", max: 16000 },
          { name: "Information Technology", max: 30000 },
          { name: "Customer Support", max: 38000 },
          { name: "Development", max: 52000 },
          { name: "Marketing", max: 25000 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: "Allocated Budget",
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: "Actual Spending",
            },
          ],
        },
      ],
    };
    this.radarOption = radarOption;

    let lineOption = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
        },
      ],
    };
    this.lineOption = lineOption;
  },
};
</script>
<style lang="less" scoped>
.chart_wrapper {
  width: 375px;
  height: 350px;
}
</style>