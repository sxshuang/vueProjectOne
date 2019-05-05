
<template>
  <!-- 商品详情页面的 购买商品数量  数字选择框 组件 -->
  <div class="mui-numbox" data-numbox-min="1" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      @change="countChanged"
      ref="numbox"
      readonly
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>

  <!-- 分析：子组件什么时候把数据传递给父组件？？？ -->
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  // 这个数字选择框，需要初始化，他也是一个JS组件，和 顶部滑动条 一样，都需要初始化一下
  mounted() {
    //   初始化我们的数字选择框组件
    mui(".mui-numbox").numbox();
    // console.log(this.max) 父向子传数据，通过绑定属性，但是输出是 undefined，原因：因为是异步获取数据，还没有获取到数据，就打印出来了，所以是undefined
  },
  methods: {
    countChanged() {
      // 数量改变了
      //   console.log(this.$refs.numbox.value);

      //   每当数量值改变，则立即把最新的数量同步到 购物车的 store中，覆盖之前的数量值
      this.$store.commit("updateGoodsInfo", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      });
    }
  },
  props: ["initcount", "goodsid"]
};
</script>
<style lang="scss" scoped>
</style>
