# 这是一个NB的项目

## 细心学习每一行

### 做一名合格的程序员

## 开源协议之间的区别，百度



## 用传统方式(命令行)把修改过后的代码上传到码云？？？
1. git add .
2. git commit -m "这是提交信息"
3. git push


用vsCode集成的Git工具，提交代码



## 添加返回，前进这个返回按钮
1. 在顶部添加一个 `< 返回` 按钮
2. 给他注册一个事件
3. 触发事件所做的，this.$router.go()
  + 看vue-router 官方文档

 

 ## 制作首页App组件
 1. 完成 Header 区域，使用的是 Mint-UI 中的 Header组件
 2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
  + 在制作 购物车小图标的时候，操作会相对多一些
  + 先把 扩展图标的 css 样式，拷贝到 项目中
  + 拷贝 扩展字体库 .ttf 文件，到项目中
  + 为购物车小图标添加如下样式：mui-icon-extra mui-icon-extra-cart
 3. 要在 中间区域放置一个 router-view 来来时路由匹配的组件

 ## 改造 tabbar 为 router-link

 ## 设置路由高亮，利用路由里的参数 linkActiveClass属性，自定义一个名字

 ## 单击 tabbar 中的路由链接，展示对应的路由组件

 ## 制作首页轮播图数据
 1. 获取数据，使用 vue-resource 获取数据
 2. 使用 vue-resource 的 this.$http.get 获取数据
 3. 获取到的数据，要保存到 data 身上
 4. 使用 v-for 循环渲染 每个 item 项

 ## 改造九宫格 区域的样式

 ## 改造 新闻资讯 路由链接
 1. 绘制界面（使用 MUI 中的 media-list 中的HTML）
 2. 使用 vue-resource 获取数据
 3. 渲染真实数据
 


 ## 实现新闻资讯列表 点击跳转到新闻详情
 1. 把列表的每一项改造为 router-link ，同时，在跳转的时候，应该提供唯一的 ID 标识符
 2. 创建新闻详情组件页面， NewsInfo.vue
 3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来


 ## 实现我们 新闻详情 的页面布局 和 数据渲染

 ## 单独封装一个 comment.vue 评论子组件
 1. 先创建一个 单独的 comment.vue 组件模板
 2. 在需要使用 comment 组件的 页面中 ，先手动 导入 comment 组件
    + `import comment from './comment.vue'`
 3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
 4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可


 ## 获取所有的评论数据 显示到页面中
 

 ##  实现点击加载更多评论的功能
 1. 为加载更多按钮，绑定点击事件，在事件中，请求
 2. 点击加载更多，让 pageIndex++ ，然后重新调用 this.getComments() 方法重新获取最新一页的数据
 3. 为了防止 新数据 覆盖 老数据 的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据调用 数据的 concat 方法，拼接上 新数组


 ## 发表评论
 1. 把文本框做双向数据绑定
 2. 为发表按钮绑定一个事件
 3. 校验评论内容是否为空，如果为空，则Toast 提示用户 评论内容不能为空
 4. 通过 vue-resource 发送一个请求，把评论提交给 服务器
 5. 发表评论OK后，重新刷新列表，为了查看最新的评论
   + 如果调用 getComments 方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论获取不到
   + 换一种思路：当评论成功后，在客户端，手动拼接出一个 最新的评论对象，然后 调用 数组的 unshift 方法，把最新的评论，追加到 data 中 comments 的开头,这样，就能 完美实现刷新评论列表的需求

## 改造图片分享 按钮 为 路由的链接并显示对应的组件页面

## 绘制 图片列表 组件结构并美化样式
1. 制作 顶部的滑动条
2. 制作 底部的图片列表

### 制作顶部滑动条的坑们：
1. 需要借助 MUI 中的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS 组件，需要被初始化一下：
 + 导入 mui.js 
 + 调用官方提供的 方式 去初始化：(scroll(区域滚动))
 ```
 mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
 ```
4. 我们在初始化 滑动条 的时候，导入的 mui.js ，但控制台报错了：`Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode` 
 + 经过我们合理推测，觉得，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是，webpack 打包好的 bundle.js 中，默认启用了严格模式，所以，这两者冲突了；
 + 解决方案：
   1. 把 mui.js 中的 非严格 模式的代码 改掉；但是不现实，毕竟mui.js是人家写的
   2. 把 webpack 打包时候的严格模式禁用掉；
 + 最终，我们选择了 plan B 移除严格模式：使用这个插件
   cnpm i babel-plugin-transform-remove-strict-mode -D
   然后在 .babelrc 中配置：
   ```
      {
        "plugins": ["transform-remove-strict-mode"]
      }
   ```
5. 刚进入 图片分享页面的时候，滑动条无法正常工作，经过我们认真的分析，发现，如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我们把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中；
6. 当滑动条，调试OK 后，发现 tabbar 无法正常工作，这是或，我们需要把每个 tabbar 按钮的样式中 `mui-tab-item` 重新改下名字；


7. 获取所有图片分类，并渲染列表


### 制作图片列表区
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 `lazy-load`
2. 根据 `lazy-load` 的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了图片列表的懒加载 和 样式美化



## 实现了 点击图片 跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要 使用 tag 标签 属性指定要渲染为 哪种元素，因为样式用的是 li



## 实现详情页面的布局 和 美化，同时获取数据，渲染页面


## 实现 图片详情中 缩略图的功能
1. 使用 插件 vue-preview 这个缩略图插件
2. 获取所有的图片列表，然后使用 v-for 指令 渲染数据
3. 注意： img 标签上的 class 不能去掉
4. 注意： 每个 图片数据对象中 必须有 width 和 height 属性


## 绘制 商品列表 页面基本结构并美化


## 尝试在手机上 去进行项目的预览和测试
1. 要保证自己的手机可以正常运行；
2. 要保证 手机 和 开发项目的电脑 处于 同一个 WIFI 环境中，也就是说 手机 可以访问到 电脑 IP
3. 打开自己的 项目中 package.json 文件，在 dev 脚本中 ，添加一个 --host 指令，把当前 电脑的 WIFI IP地址，设置为 --host 的指令值,--host IP地址；
  + 如何查看自己电脑所处 WIFI 的IP呢，在 cmd 终端中运行 `ipconfig` ， 查看 无线网的 IP 地址