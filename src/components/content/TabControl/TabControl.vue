<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-control-items"
      :class="{ active: currentIndex === index }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabcon_click", index);
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #fff;
}
.tab-control-items {
  flex: 1;
}
.tab-control-items span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>