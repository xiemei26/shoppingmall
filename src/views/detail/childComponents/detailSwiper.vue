<template>
  <swiper class="detail_swiper">
    <swiper-item v-for="item in topimages">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  props: {
    topimages: {
      type: Array,
      default: [],
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.detail_swiper {
  height: 300px;
  overflow: hidden;
}
</style>