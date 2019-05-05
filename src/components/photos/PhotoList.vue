<template>
  <div>
    <!-- 这是顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <!-- 下边设置的三元表达式只是为全部加active类属性，但是在页面中，点击谁谁变色，跟路由没关系，是MUI scroll滑动的属性颜色控制 -->
          <a
            :class="['mui-control-item',item.id===0?' mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photoinfo' + item.id">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
// 1.导入MUI 的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [], //所有图片分类的列表
      list: [] //图片列表数组
    };
  },
  created() {
    this.getAllcatefory();
    // 默认进入页面，就主动请求所有图片列表的数据
    this.getPhotoListByCateId(0);
  },
  methods: {
    getAllcatefory() {
      // 获取所有的图片分类
      this.$http.get("getPhotoCates.json").then(result => {
        if (result.body.status === 0) {
          // 在后台数据中，message中没有 全部这个，前端需要手动添加到数组中作为第一个
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        } else {
        }
      });
    },
    getPhotoListByCateId(cateId) {
      // 根据分类Id 获取图片列表
      // ("getPhotoList.json" + cateId) 没有后台数据，有后台数据这样写，获取分类的Id，渲染对应的图片
      this.$http.get("getPhotoList.json").then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        } else {
        }
      });
    }
  },

  mounted() {
    // 当组件中的 DOM 结构被渲染好，并放到页面中后，会执行这个钩子函数
    //如果要操作元素，最早要在 mounted 中，因为这时候 DOM 元素是最新的

    // 2.初始化滑动控件(放的位置会重要，不能直接放到导入mui.js后面)
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-x;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>

