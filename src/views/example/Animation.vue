<template>
  <div class="wrapper">
    <div class="box1">
      <strong>hover</strong>
    </div>
  </div>
</template>
<script>
export default {
  name: "Animation",
};
</script>
<style lang="less" scoped>
.wrapper {
  min-height: 100vh;
}
.box1 {
  display: block;
  position: relative;
  width: 80vw;
  box-sizing: border-box;
  line-height: 70px;
  padding: 10px;
  margin: 30px auto;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
  border-radius: 2px;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 0 6px 20px 0 rgb(0 0 0 / 8%);
    transform: translateY(-5px);
  }
}
</style>