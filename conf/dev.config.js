const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');


let config = {
    entry: path.join(__dirname,'./../src/index.js'),
    output: {
        path: path.join(__dirname,'devDist'),
        filename: 'main.dev.bundle.js'
    },
    cache: false,
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, './../src')
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './../src'),
        // compress: true,
        port: 3031,
    },

};

// let devConfig = Object.assign(config);
module.exports = config;