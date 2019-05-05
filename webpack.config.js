// 由于 webpack 是基于 Node 进行构建的，所以，webpack配置文件中，任何合法的Node 代码都是支持的

var path = require('path')

// 在内存中，根据指定模板页面，生成一份内存中的首页，同时自动把打包好的bundle.js注入到页面底部
// 配置插件，需要在导出的对象中，挂在一个 plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin')


// const { VueLoaderPlugin } = require('vue-loader');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打
// 包的文件的 入口 和 出口，此时，他们会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出
// 的这个 配置对象，然后根据这个对象，进行打包构建
module.exports = {
    entry: path.join(__dirname, './src/main.js'), //入口文件路径
    output: { //指定输出选项
        path: path.join(__dirname, './dist'), //输出路径
        filename: 'bundle.js' //指定输出文件的名称

    },
    plugins: [ //所有webpack 插件的配置节点
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //指定模板文件路径
            filename: 'index.html' //设置生成的内存页面的名称
        })

    ],
    module: { //配置所有第三方 loader 模块的规则 rules
        rules: [ //匹配规则
            {
                //处理 css 文件的loader
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // 处理 .less 文件的 loader
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 处理 .scss 文件的 loader
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                // 处理 图片文件
                test: /\.(jpg|gif|png|jpeg)$/,
                use: 'url-loader?limit=232041&name=[hash:8]-[name].[ext]' //处理图片路径的 loader
                // limit 给定的值，是图片的大小，单位是 byte(字节),如果我们引用的 图片，大于或等于给定的
                // limit 值，则不会被转为base64格式的字符串，如果图片小于给定的 limit 值，则会被转为base64的字符串
                // name=[name].[ext] ,表示 转换过的 名字还用原来的名字，后缀还是原来的后缀
                // 方式命名一样，可以放一个hash值，最多32位，这表示取前8位
            },
            {
                // 处理 字体文件的 loader
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/ //配置 Babel 来转换高级的ES6语法
            },
            {
                test: /\.vue$/,
                use: 'vue-loader' //处理 .vue 文件的loader
            }

        ]

    },
    resolve: {
        alias: { //设置 Vue 被导入时候的包的路径
            // "vue$": "vue/dist/vue.js"
        }
    }

}