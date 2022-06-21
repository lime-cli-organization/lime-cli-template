<template>
  <div>
    <div class="select_wrapper">
      <LSelect @change="changeSelect" @clear="clearSelect"></LSelect>
    </div>
  </div>
</template>

<script>
// name > components > mixins > props > data > computed > watch > filter > 钩子函数 > methods
import LSelect from "@/components/System/LSelect.vue";
export default {
  name: "Select",
  components: {
    LSelect,
  },
  methods: {
    changeSelect(data) {
      console.log(data);
    },
    clearSelect() {
      console.log("clear");
    },
  },
};
</script>

<style lang="less" scoped>
.select_wrapper {
  width: 400px;
  height: 68px;
}
</style>