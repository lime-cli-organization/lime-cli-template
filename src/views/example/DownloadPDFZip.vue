<template>
  <div class="wrapper">
    <van-button type="info" @click="transform">PDF按钮</van-button>
    <div class="pdfDom" v-for="item in 10" :key="item">
      <div class="chart_wrapper">
        <LEcharts :id="`example1${item}`" :option="radarOption" type="radar" />
      </div>
    </div>
  </div>
</template>
<script>
import LEcharts from "@/components/System/LEcharts.vue";
export default {
  name: "DownloadPDFZip",
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
          { name: "Sales" },
          { name: "Administration" },
          { name: "Information Technology" },
          { name: "Customer Support" },
          { name: "Development" },
          { name: "Marketing" },
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
  },
  methods: {
    transform() {
      this.html2pdf(".pdfDom", `个人报告`);
    },
  },
};
</script>
<style>
.wrapper {
  padding-bottom: 50px;
}
.chart_wrapper {
  width: 375px;
  height: 350px;
}
</style>
