<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-bottom
        class="check-button"
        :is-checked="isSelectAll"
        @click="selectAll"
      ></check-bottom>
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calc">去支付({{ totalCount }})</div>
  </div>
</template>

<script>
import CheckBottom from "components/content/tickButton/TickButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckBottom,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
      //0是reduce函数的初始值
    },
    totalCount() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      return this.cartList.length
        ? this.cartList.every((item) => item.checked)
        : false;
    },
  },
  methods: {
    selectAll() {
      //   this.isSelectAll = !this.isSelectAll;  isSelectAll is readonly!!!
      if (this.isSelectAll) {
        this.cartList.forEach((element) => {
          element.checked = false;
          //   点击后要取反
        });
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.calc {
  margin-left: auto;
  text-align: center;
  background-color: darkorange;
  color: #eee;
  width: 80px;
}
</style>