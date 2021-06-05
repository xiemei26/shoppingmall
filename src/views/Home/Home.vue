<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center> 购物车 </template>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommend from "./childComponents/HomeRecommend";

import { getHomeMultidata } from "network/home.js";

export default {
  name: "home",
  data() {
    return {
      // data: {},
      banner: [],
      recommend: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
  },
  created() {
    getHomeMultidata()
      .then((res) => {
        // this.data = res.data;
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
</style>