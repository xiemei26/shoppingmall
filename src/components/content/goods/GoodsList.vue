<template>
  <div class="goods">
    <goods-item v-for="item in goods" :goodsitem="item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsItem,
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>