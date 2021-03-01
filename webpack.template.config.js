const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const HappyPack = require('happypack');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
            // minify: {
            //     collapseWhitespace: true, // 去除回车换行符以及多余空格
            //     removeComments: true, // 删除注释
            // },
        }),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://cdn.bootcdn.net/ajax/libs/react/17.0.1/cjs/react-jsx-dev-runtime.production.min.js',
        //             global: 'React'
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.1/cjs/react-dom-server.browser.production.min.js',
        //             global: 'ReactDom'
        //         },
        //     ]
        // }),
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
        //     // test: /mini-css-extract-plugin[\\/]dist[\\/]loader/
        // }),
        /**
         * js代码压缩插件
         *  webpack4以下使用
         *  webpack4弃用其而改用optimization.minimize来压缩js代码
         */
        // new UglifyJsPlugin(),
        // 打包速度分析
        // new SpeedMeasurePlugin(),
        new HappyPack({
            id: 'jsx',
            loaders: ['babel-loader?cacheDirectory=true']
        }),
        new HappyPack({
            id: 'style',
            // loaders: ['style-loader', 'css-loader','less-loader'],
            loaders: [
                {
                    loader:MiniCssExtractPlugin.loader,
                },
                {loader: 'css-loader'},
                {loader: 'less-loader'},
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'happypack/loader?id=jsx',
                ],
                // options:{
                //     plugins:['syntax-dynamic-import']
                // },
                include: path.join(__dirname, './src'),
                exclude: path.join(__dirname, './node_modules')
            },
            {
                test: /\.(css|less)$/,
                use: [
                    // 加载器的位置顺序异常重要，webpack会按照顺序加载加载器编译打包文件
                    // 'style-loader',
                    // MiniCssExtractPlugin.loader,
                    // {loader: 'css-loader'},
                    'happypack/loader?id=style'
                ],
                exclude: path.join(__dirname, './node_modules')
            },
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
        ]
    },
    optimization: {
        // 默认情况下，它仅影响按需块
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        },
        minimize: true,
        minimizer: [new TerserPlugin({
            test: /\.js(\?.*)?$/i,    //匹配参与压缩的文件
            parallel: true,    //使用多进程并发运行
            terserOptions: {    //Terser 压缩配置
                output:{comments: false},
                compress: {
                    warnings: false, // 删除警告
                    drop_debugger: true, // 删除调试
                    drop_console: true, // 删除console
                    pure_funcs: ['console.log'] // 删除console
                }
            },
            extractComments: true,    //将注释剥离到单独的文件中
            sourceMap: true, // Must be set to true if using source-maps in production

        })],
        // webpack打包环境
        nodeEnv: 'production',
    },
    devtool: false,
    cache: true,
    // 监测代码的改变，代码改变时自动打包
    // watch: true,
}