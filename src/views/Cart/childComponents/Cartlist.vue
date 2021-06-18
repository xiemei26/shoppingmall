<template>
  <div class="cart-list">
    <cart-item
      v-for="(item, index) in cartList"
      key="index"
      :iteminfo="item"
    ></cart-item>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style>
</style>