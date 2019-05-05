// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 定义全局过滤器，格式化时间

import moment from 'moment' //2.导入时间 插件
// 第一个参数，是固定的给定的时间字符串，然后按照后边哪种格式给格式化出来
Vue.filter('dataFormat', function (dataStr, pattern = "YYY-MM-DD HH:mm:ss") {
    // 1.先安装 运行依赖 moment 时间插件
    return moment(dataStr).format(pattern)
    //固定格式：表示，把给定好的字符串，通过format 属性，转换成想要的，
    //  3.然后在 NewsList.vue 中，在时间后通过管道符 后加 过滤器名称

})


// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)

// 设置请求根路径,一定在安装vue-resource之后配置(因为请求的数据根路径都一样，之后请求只写对应的数据接口地址就行)
Vue.http.options.root = '../../../src/infomation';

// 全局设置 post 时候表单数据格式组织形式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;


// 按需导入 mint-ui 中的 组件
// import {
//     Header,
//     Swipe,
//     SwipeItem,
//     Button,
//     Lazyload
// } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

// 按需导入 的话，懒加载(灰色的转圈) 会出问题，所以全局导入
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入MUI扩展图标的样式
import './lib/mui/css/icons-extra.css'

// 安装导入预览图片插件
// https://github.com/LS1231/vue-preview 
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 配置 Vuex 的步骤
// 1.运行 cnpm i vuex -S
// 2.导入包
import Vuex from 'vuex'
// 3.注册vuex到vue中
Vue.use(Vuex);



// 每次刚进入，网站，肯定会调用 main.js ，在刚调用的时候，先从本地存储中，把 购物车的数据读取出来，
// 放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')
// 4.new Vuex.Store() 实例，得到一个数据仓储对象
var store = new Vuex.Store({
    state: {
        // 大家可以.把这个 state 想象成组件中的 data，专门用来存储数据的
        // 如果在 组件中 ，想要访问 store 中的数据，只能通过 this.$store.state.*** 来访问
        // this.$store.state.***
        car: car //将购物车中商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象
        // 暂时将商品对象，设计成这个样式：
        // {id:商品id,count:要购买的数量,price:商品的单价,selected:true}

    },
    mutations: {
        // this.$store.commit('方法名称',按需传递唯一的参数)
        addToCar(state, goodsinfo) {
            // 点击加入购物车，把商品信息，保存到 store 中的 car 上
            // 分析：
            // 1.如果购物车中，之前就已经有这个对应的商品了，那么值更新数量
            // 2.如果没有，则直接把 商品数据 push 到 car 中即可

            // 假设，在购物车中没有找到对应的商品
            var flag = false;

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    // 如果找到了，就不用遍历继续找了，已找到就return一下，终止some循环
                    flag = true
                    return true
                }
            })

            //如果最终循环完毕，得到的flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }
            // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车 中商品的数量值
            // 分析：
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当修改完商品的数量，把最新的购物车数据保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            // 根据 Id，从store 中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            // 将 删除完毕后的最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            // 把最新的所有购物车商品的状态 保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        // this.$store.getters.***
        // 相当于 计算属性computed ，页相当于 过滤器filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o;
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, //勾选数量
                amount: 0, //勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o

        }
    }
})


// 1.3 导入自己的 router.js 模块
import router from './router.js'


// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(app)
    },
    // 1.4 挂在router 到vm实例上
    router: router,
    // 5.配置vuex第五步，将 vuex 创建的 store 挂载到 vm 实例上,只要挂载vm上，任何组件都能使用 store 来存取数据
    store: store //状态管理对象
})