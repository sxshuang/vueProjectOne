<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 使用props向轮播图组件传参 -->
          <!-- :isfull 绑定属性，是传给子组件，来解决 轮播图样式，宽度谁用100%，谁不用100% -->
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
            销售价:
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <!-- 这个数字选择框，需要初始化，它和 顶部滑动条 一样，需要初始化，看MUI 官方文档 -->
          <p>
            购买数量:
            <numbox @getcount="getSelectCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析：如何实现购物车时候，拿到 选择的数量 -->
            <!-- 1.经过分析发现：按钮 属于 goodsinfo 页面，数字 属于 numberbox 组件 -->
            <!-- 2.由于涉及到了父子组件的嵌套，所以，无法直接在 goodslist 页面中 获取到
            选中的 商品数量值-->
            <!-- 3.怎么解决这个问题？？？涉及到了子组件向父组件传值(事件调用机制) -->
            <!-- 4.事件调用的本质：父向子传递方法，子调用这个方法，同时把 数据当做参数 传递
            给这个方法-->
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsinfo.add_time|dataFormat('YYYY-MM-DD hh:mm:ss')}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>

        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
// 导入 数字选择框 组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象中的 id 挂在到 data 上，方便后期调用
      lunbotu: [], //轮播图的数据
      goodsinfo: {}, //获取到商品的信息
      ballFlag: false, //控制小球隐藏显示的标识符
      selectCount: 1 //保存用户选中的商品数量，默认认为用户买一个
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      // ("getThumbs.json" + this.id)
      this.$http.get("getThumbs.json").then(result => {
        if (result.body.status === 0) {
          // 因为用的是公用的轮播图组件，但是请求的数据，并不一定都是一样，首页中图片链接是item.img
          // 但是，商品信息详情 里获取的是 src
          // 解决：先循环轮播图数组中每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img ，不认识 item.src
          result.body.message.forEach(function(item) {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      // 获取商品信息
      //   ("getGoodsInfo.json" + this.id)
      this.$http.get("getGoodsInfo.json").then(result => {
        if (result.body.status === 0) {
          // this.goodsinfo = result.body.message[0];
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      // 点击使用 编程式导航 跳转到 圈文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 点击 跳转到 评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      // {id:商品id,count:要购买的数量,price:商品的单价,selected:true}

      // 拼接出一个要保存到 store 中 car 数组里的 商品信息对象
      var goodsinfo = {
        id: this.id,
        count: this.selectCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      // 调用 store 中的 mutations 来将商品加入购物车
      this.$store.commit("addToCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "transilate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因：我们把 小球 最终 位移到的 位置，已经局限在了某
      // 一分辨率下 滚动条未滚动的情况下
      // 2. 只要分辨率 和 测试的时候不一样，或者 滚动条 有一定的滚动的距离之后，问题就出现了；
      // 3.因此，我们经过分析，得到结论：不能把 位置的横纵坐标 直接写死了，而是应该 根据不同情况
      // ，动态计算这个 坐标值；
      // 4. 经过分析，得出解题思路：先得到 购物车徽标 的横纵坐标，再得到 小球的 横纵坐标，然后让
      //  y 值 求差，x 值也求差，得到的记过，就是横纵坐标要位移的距离；
      // 5.如何 获取 徽标和小球 的位置？？？ domObject.getBoundingClientRect() 这方法嫩得到某个DOM 对象，得到到最顶部和最左部的距离

      //获取小球在页面中的位置
      var ballPosition = this.$refs.ball.getBoundingClientRect("ball");
      // 获取 徽标 在页面中的位置
      var badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect("badge");

      var xDist = badgePosition.left - ballPosition.left;
      var yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
      done(); //相当于aterEnter函数的引用
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectCount(count) {
      // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
      this.selectCount = count;
      console.log("父组件拿到子组件的数量值---" + this.selectCount);
    }
  },
  components: {
    swiper: swiper,
    numbox: numbox
  }
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  //   因为父元素用了 display:flex;,所以元素都会是横向排版，为了使
  //   图问介绍 和 商品评论按钮上下排版，所以要把他的flex 布局去掉
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>