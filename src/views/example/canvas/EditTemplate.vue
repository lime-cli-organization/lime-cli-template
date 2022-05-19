<template>
  <div class="wrapper">
    <split-pane
      v-on:resize="resize"
      :min-percent="20"
      :default-percent="50"
      split="vertical"
    >
      <template slot="paneL">
        <textarea v-model="templateRead">这是一个框 </textarea>
      </template>
      <template slot="paneR">
        <div class="canvans_wrapper" id="canvasWrapper" ref="canvasWrapper">
          <canvas
            :width="canvasWidth"
            :height="canvasHeight"
            ref="canvas"
            id="canvas"
            @mousedown="drawBegin"
            @mousemove="drawing"
            @mouseup="drawEnd"
          >
            当前浏览器版本不支持 Canvas, 请升级.
          </canvas>
          <input
            v-for="item in checkboxArr"
            :key="item.id"
            class="checkbox"
            type="checkbox"
            v-model="item.isCheck"
            :style="`top:${item.top * scale}px; left:${item.top * scale}px`"
          />
        </div>
      </template>
    </split-pane>
  </div>
</template>
<script>
import { paperSlider, templateRead } from "@/apis/canvas";
import splitPane from "vue-splitpane";
export default {
  name: "EditTemplate",
  components: {
    splitPane,
  },
  data() {
    return {
      paperSlider,
      templateRead: templateRead.data,
      checkboxArr: [
        {
          top: 100,
          left: 100,
          id: 1128,
          isCheck: false,
        },
        {
          top: 10,
          left: 10,
          id: 1126,
          isCheck: true,
        },
        {
          top: 50,
          left: 50,
          id: 1124,
          isCheck: false,
        },
      ],
      canvasWidth: 0,
      canvasHeight: 0,
      startX: 0,
      startY: 0,
      rectWidth: 0,
      rectHeight: 0,
      canvas: null,
      scale: 1,
    };
  },
  mounted() {
    this.initCanvasWrapper = this.$refs.canvasWrapper.getBoundingClientRect();
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    let _this = this;
    window.addEventListener("resize", () => {
      _this.resize();
    });
    this.parseJson();
  },
  methods: {
    parseJson() {
      const { templateRead } = this;
      console.log(templateRead.split("\r\n"));
    },
    resize() {
      const canvasWrapper = this.$refs.canvasWrapper.getBoundingClientRect();
      this.canvasWidth = canvasWrapper.width;
      this.canvasHeight = canvasWrapper.height;
      this.scale = canvasWrapper.width / this.initCanvasWrapper.width;
    },
    drawBegin(e) {
      this.flag = true;
      let { offsetX, offsetY } = e;
      this.startX = offsetX;
      this.startY = offsetY;
    },
    drawing(e) {
      if (this.flag) {
        let { offsetX, offsetY } = e;
        this.rectWidth = Math.abs(offsetX - this.startX);
        this.rectHeight = Math.abs(offsetY - this.startY);
        if (this.rectWidth < 4 || this.rectHeight < 4) {
          this.rectWidth = 0;
          this.rectHeight = 0;
          return;
        } else {
          this.clear();
          let startX = this.startX > offsetX ? offsetX : this.startX;
          let startY = this.startY > offsetY ? offsetY : this.startY;
          this.drawRect(startX, startY, this.rectWidth, this.rectHeight);
        }
      }
    },
    drawEnd() {
      this.flag = false;
    },
    drawRect(x, y, width, height) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(x, y, width, height);
    },
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100vw;
  height: 800px;
  textarea {
    width: 100%;
    height: 100%;
    line-height: 2;
    border: none;
  }
  .canvans_wrapper {
    position: relative;
    height: 100%;
    border: 1px solid lightblue;
    .checkbox {
      position: absolute;
      z-index: 2;
    }
  }
}
</style>
