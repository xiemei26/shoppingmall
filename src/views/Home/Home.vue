<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <template v-slot:center> 购物车 </template>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabcon_click="tabcon_click"
      ref="tabcontrol1"
      v-show="is_tabfixed"
    ></tab-control>

    <b-scroll
      class="content"
      ref="scroll"
      :probetype="3"
      :observeDOM="true"
      :pullupload="true"
      @scroll="scroll_pos"
      @pullingUp="loadmore"
    >
      <home-swiper
        :banner="banner"
        @homeswiper_imgload="homeswiper_imgload"
      ></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <home-feature></home-feature>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabcon_click="tabcon_click"
        ref="tabcontrol2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </b-scroll>
    <back-top @click="backtop_click" v-show="backtop_show"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommend from "./childComponents/HomeRecommend";
import HomeFeature from "./childComponents/HomeFeature";
import TabControl from "components/content/TabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import BScroll from "components/common/scroll/scroll.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils.js";
import { backTopMixin } from "common/mixin.js";

export default {
  name: "home",
  data() {
    return {
      // data: {},
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      current_type: "pop",

      tab_offsettop: 0,

      saveY: 0,
      itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.current_type].list;
    },
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    BScroll,
  },
  mixins: [backTopMixin],
  mounted() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    //因为debounce有返回值，所以用refresh来接收
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  methods: {
    // ---------事件监听相关方法-------------
    tabcon_click(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.current_type = "pop";
          break;
        case 1:
          this.current_type = "new";
          break;
        case 2:
          this.current_type = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    scroll_pos(position) {
      this.listenBackTop(position);
    },
    loadmore() {
      console.log("上拉加载更多");
      this.getHomeGoods(this.current_type);
    },
    homeswiper_imgload() {
      // console.log(this.$refs.tabcontrol2.$el.offsetTop);
      this.tab_offsettop = this.$refs.tabcontrol2.$el.offsetTop;
    },

    // -------------网络请求相关方法------------
    getHomeMultidata() {
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
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then((res) => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page++;

          this.$refs.scroll.finishPullUp();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  unmounted() {
    console.log("destroyed");
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#home {
  /* margin-top: 44px; */
  /* overflow: auto; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  width: 100%;
  color: white;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
  /* 用了better-scroll之后，首页导航栏不用fixed定位，下面的内容也可以滚动了 */
  /* position: sticky;
  top: 0; */
}

.tab-control {
  position: relative;
  /* top: 44px;  sticky是时候才用到这个属性 */
  z-index: 9;
}

.content {
  height: calc(100% - 49px);
  overflow: scroll;
  /* 要用better-scroll必须要给高度，这是两种给高度的方式
  /* position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
}
</style>