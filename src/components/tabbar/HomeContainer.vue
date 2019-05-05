<template>
  <div>
    <!-- 这是轮播图区域 (单独抽离出去了)-->
    <!-- :lunbotuList="lunbotuList" 这是父组件向子组件传参，绑定的属性，在子组件中props数组定义一下， -->
    <!-- :isfull 绑定属性，是传给子组件，来解决 轮播图样式，宽度谁用100%，谁不用100% -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

    <!-- 利用 MUI中的 九宫格 到 六宫格 的改造 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/新闻.png" alt>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/图片.png" alt>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/商品购买.png" alt>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/留言反馈.png" alt>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/视频专区.png" alt>
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/联系我们.png" alt>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
// 导入mint-ui toast 弹窗
import { Toast } from "mint-ui";
// 导入轮播图组件
import swiper from "../subcomponents//swiper.vue";

export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      //获取轮播图
      this.$http.get("lunbo.json").then(result => {
        // console.log(result.body.message);
        if (result.body.status === 0) {
          // 成功的
          this.lunbotuList = result.body.message;
        } else {
          // 失败
          Toast("获取轮播图失败");
        }
      });
    }
  },
  components: {
    swiper: swiper
  }
};
</script>

<style scoped lang="scss">
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>
