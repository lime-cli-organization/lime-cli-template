<template>
  <div class="wrapper">
    <div v-for="item in propList" :key="item.title">
      {{ item.title }}
      <van-button
        :type="selectGoods[item.title] === itm.name ? 'primary' : 'default'"
        plain
        size="small"
        v-for="itm in item.list"
        :key="itm.name"
        :disabled="!itm.able"
        @click="changeProp(item.title, itm.name, itm.able)"
        >{{ itm.name }}</van-button
      >
    </div>
    {{ selectGoods }}
    <div v-for="(item, index) in propList" :key="index + 'a'">
      {{ item.title }}
      <span v-for="(itm, idx) in item.list" :key="idx + 'b'">
        {{ itm.name }}{{ itm.able }}|</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Sku3",
  data() {
    return {
      propList: [
        { title: "颜色", list: ["红色", "紫色", "白色", "黑色"] },
        { title: "套餐", list: ["套餐一", "套餐二", "套餐三", "套餐四"] },
        { title: "内存", list: ["64G", "128G", "256G"] },
      ],
      goodsList: [
        { id: 1608188117178, specs: ["红色", "套餐一", "128G"], price: 2000 },
        { id: 1608188117181, specs: ["红色", "套餐二", "128G"], price: 2000 },
        { id: 1608188117185, specs: ["红色", "套餐三", "256G"], price: 4000 },
        { id: 1608188117215, specs: ["黑色", "套餐一", "256G"], price: 3000 },
        { id: 1608188117216, specs: ["黑色", "套餐二", "64G"], price: 1000 },
        { id: 1608188117196, specs: ["紫色", "套餐三", "128G"], price: 2500 },
        { id: 1608188117197, specs: ["紫色", "套餐三", "256G"], price: 4000 },
        { id: 1608188117200, specs: ["紫色", "套餐四", "256G"], price: 3000 },
        // { id: 1608188117201, specs: ["白色", "套餐一", "64G"], price: 1000 },
      ],
      selectGoods: {}, // 选择的数据对象
      resGoods: {}, // 结果数组
    };
  },
  created() {
    let { propList } = this;
    propList.forEach((item) => {
      this.selectGoods[item.title] = "";
    });
    console.log(this.selectGoods);
    this.propList = propList.map((item) => {
      return {
        title: item.title,
        list: item.list.map((its) => {
          return {
            name: its,
            able: this.isAble(item.title, its),
          };
        }),
      };
    });
  },
  methods: {
    isAble(key, value) {
      var copySelectGood = JSON.parse(JSON.stringify(this.selectGoods));
      copySelectGood[key] = value;
      let flag = this.goodsList.some((item) => {
        let i = 0;
        for (let k in copySelectGood) {
          if (copySelectGood[k] && item.specs.includes(copySelectGood[k])) {
            i++;
          } else if (!copySelectGood[k]) {
            i++;
          }
        }
        return i == this.propList.length;
      });
      return flag;
    },
    changeProp(key, value, able) {
      if (!able) return;
      if (this.selectGoods[key] === value) {
        this.selectGoods[key] = "";
      } else {
        this.selectGoods[key] = value;
      }
      this.propList.forEach((item) => {
        item.list.forEach((itm) => {
          itm.able = this.isAble(item.title, itm.name);
        });
      });
      this.reflectData();
    },

    reflectData() {
      const { selectGoods, goodsList } = this;
      const condition = [
        selectGoods["颜色"],
        selectGoods["套餐"],
        selectGoods["内存"],
      ];
      console.log(condition);
      const res = goodsList.filter(
        (item) => item.specs.toString() == condition.toString()
      );
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.van-button {
  margin: 8px;
}
</style>