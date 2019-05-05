<template>
  <div class="goods-list">
    <!-- 没有后台数据，如果有的话，:key="item.id",这里不用因为，在加载更多的时候，还是加载的原数据，id重复，控制台会报错 -->
    <!-- <router-link tag="div" class="good-item" v-for="(item,index) in goodslist" :key="index" :to="'/home/goodsinfo/'+item.id">
      <img :src="item.img_url">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>-->

    <!-- 在网页中有两种跳转方式： -->
    <!-- 方式1：使用 a 标签 跳转 -->
    <!-- 方式2：使用 window.location.href 的形式，叫做 编程式导航(js代码) -->
    <div
      class="good-item"
      v-for="(item,index) in goodslist"
      :key="index"
      @click="goDetail(item.id)"
    >
      <img :src="item.img_url">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    // data 是往自己组件内部，挂在一些私有数据的
    return {
      pageindex: 1, //分页的页数
      goodslist: [] //存放商品列表的数组
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 获取商品列表
      // ('getGoodsList.json?pageindex=' + this.pageindex)
      this.$http
        .get("getGoodsList.json?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            // this.goodslist = result.body.message;
            // 因为要加载更多，把加载的数据，拼接到第一次展示出来的数据后边
            this.goodslist = this.goodslist.concat(result.body.message);
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id) {
      // 使用 JS 的形式进行路由导航
      // vue-router 官网的 编程式导航
      //注意：一定要区分 this.$route 和 this.$router 这两个对象
      // 其中：this.$route  是路由【参数对象】，所有路由中的参数，params ， query 都属于它
      // 其中：this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 到吗，实现路由的 前进、后退
      // 、跳转到新的 URL 地址
      // 1.最简单的一种，直接写路径
      // this.$router.push("/home/goodsinfo/" + id);
      // 2.传递对象
      // this.$router.push({ path: "/home/goodsinfo/" + id });
      // 3.传递命名路由
      this.$router.push({ name: "goodsinfo", params: { id: id } });
      // console.log(this)
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  //让里边的元素两边贴边对齐
  justify-content: space-between;
  .good-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0px;
    padding: 2px;
    // 如果里边的标题是有两行字，或者三行字的话，Y轴方向，两行的整个排版是按流式布局从上往下
    // 依次排版，排完，灰色div不能正好挨到最低端，最低端会留空白。
    // 需求：不管怎样要让灰色div永远靠在最底部；
    // 方法一：子绝父相，bottom:0;
    // 方法二：css3,之前都是主轴左右两端对齐，现在改主轴，改正上下对齐
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 349px;
    img {
      width: 100%;
      height: 256.4px;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          // 字体上的划线
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
