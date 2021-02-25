const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = {
    entry: path.join(__dirname,'./src/index.js'),
    output: {
        path: path.join(__dirname,'./dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        // 打包的可视化分析服务
        // new bundleAnalyzerPlugin(),
        /**
         *  css单独打包
         */
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
        }),
        /**
         *  动态引入css，less，js等文件
         */
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: './src/index.html',
            // 压缩 html，默认 false 不压缩
            minify: {
                collapseWhitespace: true, // 去除回车换行符以及多余空格
                removeComments: true, // 删除注释
            }
        }),
        /**
         * 动态引入manifest.json
         */
        new webpack.DllReferencePlugin({
            context:__dirname, // 与DllPlugin中的那个context保持一致
            /**
             下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
             这样webpack打包时，会检测此文件中的映射，不会把存在映射的包打包进bundle.js
             **/
            manifest: require(path.join(__dirname,'./react-manifest.json'),path.join(__dirname,'./antd-manifest.json'))
        }),
        // 从一个或多个包中提取文本到单独的文件中。
        // 已弃用，官方不建议使用此插件独立打包css文件，建议使用MiniCssExtractPlugin独立打包css文件
        // new ExtractTextPlugin({
        //     filename: '[name].bundle.css',
        //     allChunks: true
        // })
        /**
         * 缓存加速二次构建速度
         */
        // new HardSourceWebpackPlugin({
        //     cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
        //     configHash: function (webpackConfig) {
        //         // node-object-hash on npm can be used to build this.
        //         return require('node-object-hash')({ sort: false }).hash(webpackConfig);
        //     },
        //     environmentHash: {
        //         root: process.cwd(),
        //         directories: [],
        //         files: ['package-lock.json', 'yarn.lock'],
        //     },
        //     info: {
        //         // 'none' or 'test'.
        //         mode: 'none',
        //         // 'debug', 'log', 'info', 'warn', or 'error'.
        //         level: 'debug',
        //     },
        //     cachePrune: {
        //         maxAge: 2 * 24 * 60 * 60 * 1000,
        //         sizeThreshold: 50 * 1024 * 1024
        //     },
        // }),
        // js代码压缩插件
        // new UglifyJsPlugin(),
        // 默认情况下，它仅影响按需块
        // new webpack.optimize.splitChunks()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader?cacheDirectory=true',
                ],
                include: path.join(__dirname, './src'),
                exclude: path.join(__dirname, './node_modules')
            },
            {
                test: /\.css$/,
                use: [
                    // 加载器的位置顺序异常重要，webpack会按照顺序加载加载器编译打包文件
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader'},
                ],
                exclude: path.join(__dirname, './node_modules')
            },
            // {
            //     test: /\.less$/,
            //     use:  [
            //          MiniCssExtractPlugin.loader,
            //         // "style-loader",
            //         {loader: 'css-loader'},
            //         {loader: 'less-loader'},
            //     ],
            //     exclude: path.join(__dirname, './node_modules')
            // },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000 * 100
                        }
                    }
                ],
                exclude: path.join(__dirname, './node_modules')
            },
            // 此配置已弃用，已按照官方建议修改，
            // css文件的独立打包不再使用ExtractTextPlugin，而是使用MiniCssExtractPlugin插件
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({    //css的提取
            //         fallback: "style-loader",
            //         use: "css-loader"
            //     }),
            //     exclude: path.join(__dirname, './node_modules')
            // },

            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({   //css的提取
            //         fallback: "style-loader",
            //         use: ['sass-loader','postcss-loader']
            //     }),
            //     // include: [
            //     //     path.resolve(__dirname, './src')
            //     // ],
            //     // use: [
            //     //     //'style-loader',
            //     //     MiniCssExtractPlugin.loader,
            //     //     'css-loader',
            //     //     'postcss-loader',
            //     //     'sass-loader'
            //     // ],
            //     exclude: path.join(__dirname, './node_modules')
            // }
        ]
    },
    devtool: false,
    cache: true,
    watch: true,
    optimization: {
        nodeEnv: 'production'
    }
}