<template>
  <div class="cmt-container">
    <hr>
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入评论的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in comments" :key="index">
        <div
          class="cmt-title"
        >第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat("YYYY-MM-DD hh:mm:ss")}}</div>
        <div class="cmt-body">{{item.content === "undefined"?"此用户很懒，啥都不说":item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
// 导入 mint-ui 中的 Toast组件
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页数据
      comments: [], //这是所有的评论数据
      msg: "" //评论输入的内容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      //获取评论
      // ("getcomment.json"+this.id + "?pageindex=" +this.pageIndex)
      this.$http.get("getcomment.json").then(result => {
        if (result.body.status === 0) {
          // this.comments = result.body.message;
          // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据 拼接上 新数据
          // 上边那个，每次新一页会覆盖旧一页的数据
          this.comments = this.comments.concat(result.body.message);
        } else {
          Toast("获取评论信息列表！！");
        }
      });
    },
    getMore() {
      //加载更多
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      // 这一块功能的代码，传参各种需要看后台那个提交评论数据

      //校验是否为空内容
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空！！！");
      }
      //发表提交评论
      // 参数1：请求的URL 地址
      // 参数2：提交给 服务器的数据对象 { content:this.msg}
      // 参数3：定义提交时候，表单中数据的格式 { emulateJSON:json}

      //  .post("postcomment.json" + this.$route.params.id, {
      //     content: this.msg.trim()
      //   })
      // 如果有后台数据，上边这段代码才是正确的写法，因为没有后台，所以我自己写的数据，只能get请求，而且不能传路由对象的id
      this.$http
        .get("postcomment.json", {
          content: this.msg.trim()
        })
        .then(function(result) {
          if (result.body.status === 0) {
            // 1.拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
          }
        });
    }
  },
  props: ["id"]
};
</script>
<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
