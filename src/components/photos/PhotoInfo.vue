<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time | dataFormat('YYYY-MM-DD hh:mm:ss')}}</span>
      <span>点击：{{photoinfo.click}}次</span>
    </p>
    <hr>

    <!-- 缩略图区域 -->
    <!-- <vue-preview :slides="slide1" @close="handleClose"></vue-preview> -->

    <div class="thumbs">
      <img
        class="preview-img"
        v-for="(item,index) in list"
        :key="index"
        :src="item.src"
        height="100"
        @click="$preview.open(index,list)"
      >
    </div>

    <!-- 图片内容区域 -->
    <div class="content">{{photoinfo.content}}</div>
    <!-- 评论子组件， 有一个现成的全局评论子组件-->
    <cmt-box :id="this.id"></cmt-box>
  </div>
</template>

<script>
// 1.导入评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到的图片id
      photoinfo: {}, //图片详情
      list: [] //缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      // 获取图片详情

      //   ("getPhotoInfo.json" + this.id)
      this.$http.get("getPhotoInfo.json").then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
    getThumbs() {
      // 获取缩略图
      //   ("getThumbs.json"+this.id)
      this.$http.get("getThumbs.json").then(result => {
        if (result.body.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          result.body.message.forEach(item => {
            item.w = 600;
            item.h == 400;
          });
          //   把完整的数据保存到 list 中
          this.list = result.body.message;
        }
      });
    }
  },
  components: {
    //   注册 评论 子组件
    "cmt-box": comment
  }
};
</script>
<style lang="scss"scoped>
.photoinfo-container {
  padding: 4px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs{
      img{
          margin: 10px;
          width: 100px;
          box-shadow: 0 0 8px #999;
      }
  }
}
</style>
