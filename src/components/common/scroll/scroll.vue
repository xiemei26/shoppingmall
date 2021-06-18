<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probetype: {
      type: Number,
      default: 0,
    },
    pullupload: {
      type: Boolean,
      default: false,
    },
    observeDOM: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      //   mouseWheel: true,
      probeType: this.probetype,
      pullUpLoad: this.pullupload,
      observeDOM: this.observeDOM,
      keepAlive: true,
      observeImage: true,
      // observeImage是监测图片加载，防止出现下滑卡顿的现象
    });

    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      // console.log("scroll-item图片加载完成");
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style>
</style>