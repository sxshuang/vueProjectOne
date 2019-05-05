<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <!-- <span>发表时间：{{item.add_time | dataFormat}}</span>  这个是格式化时间的,后边参数也可以不要-->

              <span>发表时间：{{item.add_time | dataFormat('YYYY-MM-DD hh:mm:ss')}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// 按需导入 toast 组件
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      newslist: [] //新闻列表
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      //获取新闻列表
      this.$http.get("getnewslist.json").then(result => {
        if (result.body.status === 0) {
          // 如果没有失败，应该把数据保存到data身上
          this.newslist = result.body.message;
        } else {
          Toast("获取新闻列表!!!");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      //   css3中的 flex 布局
      display: flex;
      //   左右对齐
      justify-content: space-between;
    }
  }
}
</style>

