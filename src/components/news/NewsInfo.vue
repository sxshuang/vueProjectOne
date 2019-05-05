<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{newsinfo.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{newsinfo.add_time | dataFormat('YYYY-MM-DD hh-mm-ss')}}</span>
      <span>点击此时：{{newsinfo.click}}次</span>
    </p>
    <hr>
    <!-- 内容区域 -->
    <div class="container">{{newsinfo.content}}</div>
    <!-- 评论区子组件 -->
    <!-- 评论内容，传值，传的id 是新闻列表的Id,(父组件向子组件传值) -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
// 1.导入评论子组件
import comment from "../subcomponents/comment.vue";

// 导入 Toast 组件
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: this.$route.params.id, //将 URL 地址中传过来的 Id 值，挂载到 data上，方便以后调用
      newsinfo: {} //获取新闻对象
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      //获取新闻详情
      // ("getnewsinfo.json"+this.id)  后边this.id 不能加，没有后台数据
      this.$http.get("getnewsinfo.json").then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取新闻失败！");
        }
      });
    }
  },
  components: {
    //用来注册子组件的节点
    "comment-box": comment
  }
};
</script>
<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    // css3，flex布局，左右对齐
    display: flex;
    justify-content: space-between;
  }
  .container {
  }
}
</style>
