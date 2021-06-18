<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="homeswiper_imgload" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    homeswiper_imgload() {
      if (!this.isLoaded) {
        console.log("homeswiper_imgload 加载完成");
        this.$emit("homeswiper_imgload");
        this.isLoaded = true;
        // 控制事件只发出一次
      }
    },
  },
};
</script>

<style>
</style>