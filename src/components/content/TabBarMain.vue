<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/home.svg" /> </template
      ><template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" />
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/category.svg" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/category_active.svg" />
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/shopcart.svg" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/shopcart_active.svg" />
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/profile.svg" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" />
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "../common/tabbar/TabBarView.vue";
import TabBarItem from "../common/tabbar/TabBarComponent.vue";
export default {
  name: "TabBarMain",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>