<template>
  <div>
    <swiper class="banner" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, index) in bannerList" :key="index">
        <div
          class="banner_bg"
          :style="`background:url(${item.src}) center center no-repeat`"
        ></div>
        <img :src="item.src" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "MySwiper",
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      bannerList: [
        {
          src: require("@/assets/banner/banner1.png"),
        },
        {
          src: require("@/assets/banner/banner2.png"),
        },
        {
          src: require("@/assets/banner/banner3.png"),
        },
      ],
      swiperOption: {
        autoplay: true,
        speed: 500,
        loop: true,
        pagination: {
          el: ".swiper-pagination", //分页器
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom">${
              index + 1
            }</span>`;
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.banner {
  width: 100vw;
  height: 600px;
  .swiper-slide {
    display: flex;
    align-items: center;
    position: relative;
    .banner_bg {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-size: 100%;
      background-position: center center;
      background-repeat: no-repeat;
      filter: blur(100px);
    }
    img {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: auto;
    }
  }
  /deep/ .swiper-pagination-bullet-custom {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #007aff;
    opacity: 0.7;
    background: rgba(53, 53, 53, 0.2);
    transition: all 0.25s;
    &.swiper-pagination-bullet-active {
      opacity: 1;
      color: white;
      background: #007aff;
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    width: 56px;
    height: 44px;
  }
}
</style>