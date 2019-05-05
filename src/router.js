// 1.导入 vue-router 包
import VueRouter from 'vue-router'

// 导入 Tabbar 的四个对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

// 导入 新闻资讯 的路由组件
import NewsList from './components/news/NewsList.vue'
// 导入新闻详情 的路由组件
import NewsInfo from './components/news/NewsInfo.vue'

// 导入 图片 的路由组件
import PhotoList from './components/photos/PhotoList.vue'

//导入图片详细信息的组件
import PhotoInfo from './components/photos/PhotoInfo.vue'

// 导入 商品列表 路由
import GoodsList from './components/goods/GoodsList.vue'
// 导入 商品列表信息 路由组件
import GoodsInfo from './components/goods/GoodsInfo.vue'

// 导入商品图文介绍 组件
import GoodsDesc from './components/goods/GoodsDesc.vue'
// 导入 商品评论 组件
import GoodsComment from './components/goods/GoodsComment.vue'


// 3.创建路由对象
var router = new VueRouter({
    routes: [ //配置路由规则
        {
            // 路由重定向
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: HomeContainer
        },
        {
            path: '/member',
            component: MemberContainer
        },
        {
            path: '/shopcar',
            component: ShopcarContainer
        },
        {
            path: '/search',
            component: SearchContainer
        },
        {
            path: '/home/newslist',
            component: NewsList
        },
        {
            path: '/home/newsinfo/:id',
            component: NewsInfo
        },
        {
            path: '/home/photolist',
            component: PhotoList
        },
        {
            path: '/home/photoinfo:id',
            component: PhotoInfo
        },
        {
            path: '/home/goodslist',
            component: GoodsList
        },
        {
            path: '/home/goodsinfo/:id',
            component: GoodsInfo,
            name: 'goodsinfo' //为这个路由起个名字
        },
        {
            path: '/home/goodsdesc/:id',
            component: GoodsDesc,
            name:'goodsdesc'
        },
        {
            path:"/home/goodscomment/:id",
            component:GoodsComment,
            name:'goodscomment'
        }
    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类，默认的类叫做 router-link-class
})

// 把路由对象暴露出去
export default router;