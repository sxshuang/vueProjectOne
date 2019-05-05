<template>
  <div class="goodsdesc-container">
    <h3>{{info.title}}</h3>
    <hr>
    <!-- 这里边请求的数据内容带 html,所以用 v-html="" ,自己写的数据，就没有细改 -->
    <div class="content">{{info.content}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {} //图文数据
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      // ("getGoodsDesc.json" + this.$route.params.id)
      this.$http.get("getGoodsDesc.json").then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0];
        }
      });
    }
  }
};
</script>
<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>

