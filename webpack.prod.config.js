const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: path.join(__dirname,'./src/index.js'),
    output: {
        path: path.join(__dirname,'./dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader?cacheDirectory=true',
                ],
                include: path.join(__dirname, './src'),
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         {loader: 'css-loader'},
            //         // MiniCssExtractPlugin.loader,
            //     ],
            //     exclude: path.join(__dirname, './node_modules')
            // },
            {
                test: /\.less$/,
                use:  [
                    // "style-loader",
                    {loader: 'css-loader'},
                    {loader: 'less-loader'},
                    MiniCssExtractPlugin.loader,
                ],
                exclude: /node_modules/
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
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({    //css的提取
                    fallback: "style-loader",
                    use: "css-loader"
                }),
                exclude: /node_modules/
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({   //css的提取
                    fallback: "style-loader",
                    use: ['sass-loader','postcss-loader']
                }),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // 打包的可视化分析服务
        // new bundleAnalyzerPlugin(),
        /**
         *  剥离CSS文件
         */
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        }),
        /**
         *  动态引入css，less，js等文件
         */
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: './src/index.html'
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
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true
        })
    ],
    devtool: false,
    cache: true
}