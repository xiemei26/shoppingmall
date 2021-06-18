<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <template v-slot:center> 购物车({{ cartLength }})</template>
    </nav-bar>
    <b-scroll
      :probetype="3"
      :observeDOM="true"
      :pullupload="true"
      class="cart-scroll"
      ref="scroll"
    >
      <cart-list></cart-list>
    </b-scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childComponents/Cartlist.vue";
import CartBottomBar from "./childComponents/CartBottomBar.vue";

import { mapGetters } from "vuex";
import BScroll from "components/common/scroll/scroll.vue";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BScroll,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.cart-scroll {
  height: calc(100% - 49px - 44px - 40px);
  overflow: hidden;
}
</style>