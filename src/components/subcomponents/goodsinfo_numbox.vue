
<template>
  <!-- 问题：我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值-->
  <!-- 我们可以使用 watch 属性监听，来 监听 父组件传递过来的 max 值，不管 watch 会被触发几次
  ，但是 最后一次，肯定是一个 合法的 max 数值-->

  <!-- 商品详情页面的 购买商品数量  数字选择框 组件 -->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
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
      // 每当文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
      // console.log(this.$refs.numbox.value)
      // getcount 子组件向父组件传值的方法名
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  },
  props: ["max"],
  watch: {
    // 属性监听
    // 看MUI官方文档，numbox 数字选项框一个组件
    max: function(newVal, oldVal) {
      // 使用 JS API  设置 numbox 的最大值
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
