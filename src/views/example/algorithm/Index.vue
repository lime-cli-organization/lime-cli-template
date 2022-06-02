<template>
  <div>
    <h4>sku</h4>
    <Sku1 />
    <h4>sku2</h4>
    <Sku2 />
    <h4>sku3</h4>
    <Sku3 />
  </div>
</template>
<script>
import Sku1 from "./Sku1";
import Sku2 from "./Sku2";
import Sku3 from "./Sku3";
export default {
  name: "Algorithm",
  components: {
    Sku1,
    Sku2,
    Sku3,
  },
};
</script>
<style lang="less" scoped>
h4 {
  font-size: 18px;
  line-height: 2;
  &:not(:first-of-type) {
    padding-top: 24px;
    margin-top: 24px;
    border-top: 2px solid grey;
  }
}
</style>