const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base.config.js');
let devStartConfig = {
    entry: baseConfig.entry,
    output: baseConfig.output,
    module: baseConfig.module,
    devServer: {
        host:'localhost',   //服务器的ip地址
        port:3031,  //端口
        open:true,  //自动打开页面
    },
    plugins: baseConfig,
    optimization:{
        nodeEnv: 'development'
    }
};

module.exports = devStartConfig;