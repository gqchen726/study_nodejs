const minimist = require('minimist');
const args = minimist(process.argv.slice(1));
const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = require('../webpack.dev.config');

let port = args['port'];
let isCompiled = true;
let compiler = webpack(config);
new webpackDevServer(compiler,config.devServer).listen(
    port,
    'localhost',
    function () {
        console.log(`start webpackDevServer listening ${port}`);
    }
);

compiler.plugin('done', () => {
    if (isCompiled) {
        setTimeout( () => {
                console.log('compiler done!');
            },350
        )
    }
    isCompiled = false;
})
