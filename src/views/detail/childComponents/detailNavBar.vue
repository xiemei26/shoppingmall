<template>
  <nav-bar>
    <template v-slot:left>
      <div class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
    </template>

    <template v-slot:center>
      <div class="title">
        <div
          v-for="(item, index) in title"
          class="title-item"
          @click="titleclick(index)"
          :class="{ active: index === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </template>
  </nav-bar>
</template>
 
<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components: { NavBar },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleclick(index) {
      this.currentIndex = index;
      this.$emit("themeclick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.back img {
  vertical-align: middle;
}
</style>