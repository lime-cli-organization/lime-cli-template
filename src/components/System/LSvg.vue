<template>
  <!-- 图标只能为单色填充设置颜色才生效 设置color默认为主题色  -->
  <svg :class="svgClass">
    <use
      :xlink:href="`#icon-${this.iconName}`"
      :style="`color:${this.color}; fill:${this.color}; stroke:${this.color}`"
    />
  </svg>
</template>

<script >
export default {
  name: "LSvg",
  props: {
    iconName: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#409eff",
    },
  },
  computed: {
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>
<style scoped>
.svg-icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  stroke: currentColor;
  overflow: hidden;
}
</style>
