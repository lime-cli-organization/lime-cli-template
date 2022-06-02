<template>
  <div>
    <p>0.1 + 0.2 = {{ sum }}</p>
    <p>0.1 / 0.2 = {{ divide }}</p>
    <p>tomorrow:{{ tomorrow }}</p>
  </div>
</template>

<script>
import math from "@/utils/math";
export default {
  name: "External",
  data() {
    return {
      sum: 0,
      divide: 0,
      tomorrow: "",
    };
  },
  created() {
    this.sum = math.add(0.1, 0.2);
    this.divide = math.divide(0.1, 0.3);

    this.tomorrow = this.dayjs(new Date()).add(1, "days").format("YYYY-MM-DD");

    const arr = [1, 2, 3, 4, 4, 3, 2, 5, 6];
    console.log(this.topSum(arr, 2, 3));
  },
  methods: {
    /**
     * arr排序后找出第k和第m大的数字之和
     * @param { array }  arr
     * @param { number } k
     * @param { number } m
     * @returns arr排序后第k和第m大的数字之和
     * eg: [1, 1, 1, 4, 4, 2] K=2;M=3 => sum = 4*2+2*1
     */
    topSum(arr, k, m) {
      const map = new Map();
      arr.map((item) => {
        map.get(item) ? map.set(item, map.get(item) + 1) : map.set(item, 1);
      });
      const sorted = Array.from(map).sort((a, b) => b[1] - a[1]);
      console.log(sorted);
      return k * 1 + m * 1;
    },
  },
};
</script>
<style lang="less" scoped>
p {
  line-height: 2;
}
</style>
