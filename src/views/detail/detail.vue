<template>
  <div id="goods-detail">
    <detail-nav-bar
      class="detail-nav"
      @themeclick="themeclick"
      ref="nav"
    ></detail-nav-bar>
    <b-scroll
      class="detail_content"
      ref="scroll"
      :probetype="3"
      :observeDOM="true"
      :pullupload="true"
      @scroll="getPositionY"
    >
      <detail-swiper :topimages="topimages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail_info="detail_info"
        @detailimg_load="detailimg_load"
      ></detail-goods-info>
      <detail-params-info
        :goods_param="goods_param"
        ref="param"
      ></detail-params-info>
      <detail-comment-info
        :commentinfo="commentinfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </b-scroll>
    <back-top @click="backtop_click" v-show="backtop_show"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :show="show" />
  </div>
</template>

<script>
// 组件
import DetailNavBar from "./childComponents/detailNavBar.vue";
import DetailSwiper from "./childComponents/detailSwiper.vue";
import DetailBaseInfo from "./childComponents/detailBaseInfo.vue";
import DetailShopInfo from "./childComponents/detailShopInfo.vue";
import DetailGoodsInfo from "./childComponents/detailGoodsInfo.vue";
import DetailParamsInfo from "./childComponents/detailParamsInfo.vue";
import DetailCommentInfo from "./childComponents/detailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComponents/detailBottomBar.vue";
import Toast from "components/common/toast/Toast.vue";

import BScroll from "components/common/scroll/scroll.vue";

// 获取数据
import { getDetailData, getRecommendData } from "network/detail.js";
// 构造函数
import { Goods, Shop, GoodsParam } from "network/detail.js";
// 函数
import { debounce } from "common/utils.js";
// mixin
import { backTopMixin } from "common/mixin.js";

export default {
  name: "Detail",
  data() {
    return {
      iid: 0,
      topimages: [],
      goods: {},
      shop: {},
      detail_info: {},
      goods_param: {},
      commentinfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      message: "",
      show: false,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetailData(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      this.topimages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);

      this.detail_info = data.detailInfo;
      // console.log(this.detail_info);

      this.goods_param = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      if (data.rate.cRate !== 0) {
        this.commentinfo = data.rate.list[0];
        // console.log(data.rate.list[0]);
        // console.log(this.commentinfo);
      }
    });
    getRecommendData().then((res) => {
      this.recommend = res.data.list;
      // console.log(res.data.list);
    });
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 300);
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    BScroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast,
  },
  mixins: [backTopMixin],
  methods: {
    themeclick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200);
    },
    detailimg_load() {
      this.getThemeTopYs();
    },
    getPositionY(position) {
      let positionY = -position.y;
      // console.log(positionY );
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      this.listenBackTop(position);
    },
    addToCart() {
      // console.log("买买买");
      const product = {};
      product.image = this.topimages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.$store.dispatch("addCart", product).then((res) => {
        this.show = true;
        this.message = res;

        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 1500);
      });
    },
  },
};
</script>

<style>
#goods-detail {
  position: relative;
  z-index: 12;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 13;
  background-color: #fff;
}

.detail_content {
  height: calc(100% - 44px - 49px);
}
</style>