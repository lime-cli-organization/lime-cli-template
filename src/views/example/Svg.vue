<template>
  <div>
    svg
    <LSvg iconName="home" color="#ff7f50" className="external_class" />
    <LSvg iconName="home" color="#00008b" />
  </div>
</template>
<script>
import LSvg from "@/components/System/LSvg.vue";
export default {
  name: "Svg",
  components: {
    LSvg,
  },
};
</script>
<style lang="less" scoped>
.external_class {
  width: 48px;
  height: 48px;
}
</style>