const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HappyPack  = require('happypack');
let baseConfig = {
    entry: path.join(__dirname,'./../src/index.js'),
    output: {
        path: path.join(__dirname,'./../dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        /**
         * 剥离css单独打包
         */
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
        }),
        /**
         * 动态引入css、js等文件
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
                    'babel-loader?cacheDirectory=true',
                ],
                include: path.join(__dirname, './../src'),
                exclude: path.join(__dirname, './../node_modules')
            },
            {
                test: /\.(css|less)$/,
                use: [
                    // 加载器的位置顺序异常重要，webpack会按照顺序加载加载器编译打包文件
                    // {loader: 'style-loader'},
                    {
                        loader:MiniCssExtractPlugin.loader,
                    },
                    {loader: 'css-loader'},
                    {loader: 'less-loader'},
                    // {loader: 'sass-loader'},
                    // {loader: 'postcss-loader'},
                ],
                exclude: path.join(__dirname, './../node_modules')
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
                exclude: path.join(__dirname, './../node_modules')
            },

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
    },
    devtool: false,
    cache: true,
    // 监测代码的改变，代码改变时自动打包
    watch: true,
};

module.exports = baseConfig;