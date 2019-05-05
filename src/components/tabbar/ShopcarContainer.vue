<template>
  <div class="shopcar-container">
    <div class="goods_list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt>
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 问题：如何从购物车中获取商品数量呢？？ -->
                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据，把 当前循环
                这条商品的 Id ，作为 对象 的属性名，count 值作为 对象的 属性值，这样，当把所有
                的商品循环一遍，就会得到一个对象：{2:2,3:1,4:2}-->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                <!-- 这里参数 i 是用来 删除 goodslist里的数据的，item.id是用来删除store里的数据的 -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>
              已勾选商品
              <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价
              <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  data() {
    return {
      goodslist: [] //购物车中所有商品的数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //   1.获取到 store 中所有的商品的 Id，然后拼接出来一个 用逗号分隔的 字符串
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      //   如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错(没有后台数据，所以如果idArr为空，则就没有数据)
      if (idArr.length <= 0) {
        return;
      }

      //   获取购物车商品列表
      //   ("getShopCarInfo.json" + idArr.join(","))
      this.$http.get("getShopCarInfo.json").then(result => {
        if (result.body.status === 0) {
          this.goodslist = result.body.message;
        }
      });
    },
    remove(id, index) {
      // 点击删除，把商品从 store 中根据 传递的 Id 删除，同时，把当前组件中的 goodslist 中，对应要删除的那个商品，使用 index 删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    selectedChanged(id, val) {
      // 每当点击 开关 把最新的 开关状态同步到 store 中
      //   console.log(id + "--" + val);
      this.$store.commit("updateGoodsSelected", { id: id, selected: val });
    }
  },
  components: {
    numbox: numbox
  }
};
</script>

<style scoped lang="scss">
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods_list {
    .mui-card-content-inner {
      display: flex;
      //   纵向居中
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
