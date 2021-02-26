const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const HappyPack = require('happypack');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const baseConfig = require('./base.config');
const TerserPlugin = require('terser-webpack-plugin');

let plugins = baseConfig.plugins.slice();
plugins.push(
    /**
     *  css单独打包
     */
    new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
    }));
plugins.push(new webpack.DllReferencePlugin({
    context:__dirname, // 与DllPlugin中的那个context保持一致
    /**
     下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
     这样webpack打包时，会检测此文件中的映射，不会把存在映射的包打包进bundle.js
     **/
    manifest: require(
        path.join(__dirname,'./../react-manifest.json'),
        path.join(__dirname,'./../reactDom-manifest.json'),
        path.join(__dirname,'./../antd-manifest.json'),
        path.join(__dirname,'./../antdDesign-manifest.json'),
    )
}),);

let buildDistConfig = {
    entry: baseConfig.entry,
    output: baseConfig.output,
    plugins: plugins,
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
        splitChunks: baseConfig.optimization.splitChunks,
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
};

module.exports = buildDistConfig;