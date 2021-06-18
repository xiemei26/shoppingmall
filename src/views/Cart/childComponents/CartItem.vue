<template>
  <div id="shop-item">
    <div class="item-selector">
      <tick-button
        @click="checkClick"
        :isChecked="iteminfo.checked"
      ></tick-button>
    </div>
    <div class="item-img">
      <img :src="iteminfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ iteminfo.title }}</div>
      <div class="item-desc">{{ iteminfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ iteminfo.price }}</div>
        <div class="item-count right">×{{ iteminfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TickButton from "components/content/tickButton/TickButton.vue";
export default {
  name: "CartItem",
  props: {
    iteminfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    TickButton,
  },
  methods: {
    checkClick() {
      this.iteminfo.checked = !this.iteminfo.checked;
    },
  },
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}

.item-img img {
  /* width: 88px; */
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>