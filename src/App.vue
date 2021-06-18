<template>
  <div id="nav">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <tab-bar-main class="tab-bar-main"></tab-bar-main>
  </div>
</template>

<script>
import TabBarMain from "./components/content/TabBarMain";

export default {
  name: "app",
  components: {
    TabBarMain,
  },
};
</script>

<style>
@import "./assets/css/base.css";
@import "./assets/css/normalize.css";
.tab-bar-main {
  position: fixed;
  bottom: 0;
  z-index: 10;
}
</style>
