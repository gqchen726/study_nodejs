const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base.config');
const TerserPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
let plugins = baseConfig.plugins.slice();
plugins.push(
    /**
     * 第三方模块独立打包插件
     */
    new webpack.DllReferencePlugin({
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
plugins.push(
    new SpeedMeasurePlugin(),
);

let buildDistConfig = {
    entry: baseConfig.entry,
    output: baseConfig.output,
    plugins: plugins,
    module: baseConfig.module,
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