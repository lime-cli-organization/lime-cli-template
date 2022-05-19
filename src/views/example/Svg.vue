<template>
  <div>
    svg
    <LSvg iconName="home" color="#ff7f50" />
    <LSvg iconName="home" color="#00008b" />
  </div>
</template>
<script>
import LSvg from "@/components/System/LSvg.vue";
export default {
  name: "SvgTest",
  components: {
    LSvg,
  },
};
</script>