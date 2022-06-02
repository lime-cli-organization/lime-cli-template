<template>
  <div class="wrapper">
    <div class="type" v-for="(value, key) in menuInfo" :key="key">
      {{ value.title }}
      <van-button
        v-for="(item, index) in value.arr"
        :key="item.value"
        :type="value.activeIdx === index ? 'primary' : 'defaullt'"
        plain
        :disabled="item.disabled"
        size="small"
        @click="itemClick(item, key, index)"
      >
        {{ item.value }}</van-button
      >
    </div>
    <div v-for="(item, index) in resList" :key="index">{{ item }}</div>
    <br />
    filterList
    <div v-for="item in filterList" :key="item.key + 'a'">{{ item }}</div>
  </div>
</template>
<script>
export default {
  name: "TransformData",
  data() {
    return {
      menuInfo: {
        size: {
          activeIdx: -1,
          title: "大小",
          arr: [
            {
              value: "XS",
              disabled: false,
            },
            {
              value: "S",
              disabled: false,
            },
            {
              value: "M",
              disabled: false,
            },
            {
              value: "L",
              disabled: false,
            },
          ],
        },
        color: {
          activeIdx: -1,
          title: "颜色",
          arr: [
            {
              value: "红色",
              disabled: false,
            },
            {
              value: "绿色",
              disabled: false,
            },
            {
              value: "蓝色",
              disabled: false,
            },
            {
              value: "黑色",
              disabled: false,
            },
          ],
        },
        material: {
          activeIdx: -1,
          title: "面料",
          arr: [
            {
              value: "涤纶",
              disabled: false,
            },
            {
              value: "纯棉",
              disabled: false,
            },
            {
              value: "棉麻",
              disabled: false,
            },
          ],
        },
      },
      // 库存
      infoArr: [
        {
          color: "红色",
          size: "S",
          material: "棉麻",
          num: 50,
          price: 84,
        },
        {
          color: "黑色",
          size: "M",
          material: "涤纶",
          num: 50,
          price: 84,
        },
        {
          color: "黑色",
          size: "L",
          material: "涤纶",
          num: 30,
          price: 84,
        },
        {
          color: "蓝色",
          size: "L",
          material: "涤纶",
          num: 20,
          price: 84,
        },
        {
          color: "蓝色",
          size: "L",
          material: "纯棉",
          num: 20,
          price: 84,
        },
      ],
      // 筛选条件数组
      filterList: [],
      // 结果数组
      resList: [],
    };
  },

  mounted() {
    this.filterData();
  },
  methods: {
    itemClick(item, key, index) {
      const { filterList, menuInfo } = this;
      const filterIndex = filterList.findIndex((item) => item.key === key);
      if (menuInfo[key].activeIdx === index) {
        this.menuInfo[key].activeIdx = -1;
        if (filterIndex > -1) {
          this.filterList.splice(filterIndex, 1);
        }
      } else {
        if (!item.disabled) {
          this.menuInfo[key].activeIdx = index;
          if (filterIndex > -1) {
            this.filterList.splice(filterIndex, 1, {
              key,
              value: item.value,
            });
          } else {
            this.filterList.push({
              key,
              value: item.value,
            });
          }
        }
      }
      this.filterData();
    },
    filterData() {
      const { infoArr, filterList, menuInfo } = this;
      this.resList = [...infoArr];
      for (let i = 0; i < filterList.length; i++) {
        const filterItem = filterList[i];
        this.resList = [
          ...this.resList.filter(
            (item) => item[filterItem.key] === filterItem.value
          ),
        ];
      }
      Object.keys(menuInfo).forEach((key) => {
        this.menuInfo[key].arr.forEach((item) => {
          const it = this.resList.find(
            (subItem) => subItem[key] === item.value
          );
          item.disabled = it ? false : true;
        });
      });
    },
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
