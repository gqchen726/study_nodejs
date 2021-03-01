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
        contentBase: '../../dist',
        open: true,
        port: 3031,
        hot: true,
        hotOnly: true,
        historyApiFallback: true,
        publicPath: '/'
    },
    plugins: baseConfig.plugins,
    optimization:{
        splitChunks: baseConfig.optimization.splitChunks,
        nodeEnv: 'development'
    },
    devtool: 'eval-source-map',
    cache: true,
};

module.exports = devStartConfig;