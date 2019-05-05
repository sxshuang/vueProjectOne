<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for 循环的话。一定要用 key -->
      <!-- 将来，谁使用此 轮播图组件，谁为我们传递 lunbotuList -->
      <!-- 此时，lunbotuList 应该是 父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <!-- 定义一个full属性样式，true应用这个样式，false不用，就解决 首页轮播图 和 商品详情轮播图 的图片宽度问题了 -->
        <img :src="item.img" alt :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 分析：为什么商品评论中的轮播图有瑕疵 -->
  <!-- 1. 首页中的轮播图，它的宽高。都是 100% 的宽度 -->
  <!-- 2. 在商品详情页面中，轮播图的 图片，如果也使用 宽高 100%的话，页面不好看 -->
  <!-- 3. 商品详情页面中的轮播图，期望 高度是 100%，但是宽度为 自适应 -->
  <!-- 4. 经过分析，得到 问题的原因：首页中的轮播图，和 详情中的轮播图，分歧点是：宽度到底是100%
  还是 自适应-->
  <!-- 5. 既然这两个轮播图，其他方面都是你没有冲突，只是宽度有 分歧，那么，我们可以定义一个属性
  ，让 使用轮播图的 调用者，手动指定 是否 100% 的宽度-->
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["lunbotuList", "isfull"]
};
</script>
<style lang="scss" scoped>
/* // 这是引用 mint-ui 中的轮播图swipe组件，引用过后需要加一个高 */
.mint-swipe {
  height: 200px;
  //   scss 语法：& 符号的使用，完成交集选择器
  .mint-swipe-item {
    text-align: center;
    // &:nth-child(1) {
    //   background-color: greenyellow;
    // }
    // &:nth-child(2) {
    //   background-color: green;
    // }
    // &:nth-child(3) {
    //   background-color: blueviolet;
    // }
    img {
      //   width: 100%;
      height: 100%;
    }
  }
  //     .mint-swipe-item:nth-child(2) {
  //     background-color: green;
  //   }
  //     .mint-swipe-item:nth-child(3) {
  //     background-color: red;
  //   }
}
.full {
  width: 100%;
}
</style>

