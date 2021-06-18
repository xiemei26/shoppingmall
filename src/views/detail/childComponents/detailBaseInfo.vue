<template>
  <div v-if="Object.keys(goods).length != 0" class="detail-base-info">
    <div class="detail-info-title">{{ goods.title }}</div>
    <div class="detail-info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="detail-info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="detail-info-service">
      <span
        class="detail-info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style scoped>
.detail-base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}

.detail-info-title {
  color: #222;
}

.detail-info-price {
  margin-top: 10px;
}

.detail-info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}

.detail-info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}

.detail-info-price .discount {
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  margin-left: 5px;

  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -8px;
}

.detail-info-other {
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  justify-content: space-between;
}

.detail-info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.detail-info-service-item img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}

.detail-info-service-item span {
  font-size: 13px;
  color: #333;
}
</style>