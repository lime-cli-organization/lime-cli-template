<template>
  <div class="wrapper">
    <p>数据解析</p>
    <div class="type" v-for="item in mockData.json1" :key="item[0]">
      <van-button
        v-for="itm in item"
        :key="itm"
        type="primary"
        plain
        size="small"
      >
        {{ itm }}
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "TransformData",
  data() {
    return {
      types: [], // json2 中的动态属性名
      condition: {}, // 存在json1.length个属性，分别是前三项 color type mianliao
      mockData: {
        json1: [
          ["红色", "黄色", "蓝色"],
          ["S", "M"],
          ["棉的", "涤纶"],
        ],
        json2: [
          {
            color: "红色",
            type: "S",
            mianliao: "棉的",
            price: 100,
          },
          {
            color: "红色",
            type: "M",
            mianliao: "棉的",
            price: 200,
          },
          {
            color: "红色",
            type: "S",
            mianliao: "涤纶",
            price: 300,
          },
          {
            color: "红色",
            type: "M",
            mianliao: "涤纶",
            price: 400,
          },
          {
            color: "黄色",
            type: "S",
            mianliao: "棉的",
            price: 500,
          },
          {
            color: "黄色",
            type: "M",
            mianliao: "棉的",
            price: 600,
          },
          {
            color: "黄色",
            type: "S",
            mianliao: "涤纶",
            price: 700,
          },
          {
            color: "黄色",
            type: "M",
            mianliao: "涤纶",
            price: 800,
          },
          {
            color: "蓝色",
            type: "S",
            mianliao: "棉的",
            price: 900,
          },
          {
            color: "蓝色",
            type: "M",
            mianliao: "棉的",
            price: 1000,
          },
          {
            color: "蓝色",
            type: "S",
            mianliao: "涤纶",
            price: 1100,
          },
          {
            color: "蓝色",
            type: "M",
            mianliao: "涤纶",
            price: 1200,
          },
        ],
      },
    };
  },
  created() {
    console.log("ListDetail create");
  },
};
</script>
<style lang="less" scoped>
.type {
  margin-bottom: 12px;
  button {
    margin-left: 8px;
  }
}
</style>
