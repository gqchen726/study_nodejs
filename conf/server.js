const minimist = require('minimist');
const args = minimist(process.argv.slice(1));
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const env = args['env'];

let config = require('../webpack.config');
let compiler = webpack(config);
let isCompiled = true;

if ('dev-start' === env) {
    let port = config.devServer.port;
    new webpackDevServer(compiler,config.devServer).listen(
        port,
        config.devServer.host,
        () => {
            console.log(`start webpackDevServer listening ${port}`);
        }
    );
}


compiler.plugin('done', () => {
    if (isCompiled) {
        setTimeout( () => {
                console.log('compiler done!');
            },350
        )
    }
    isCompiled = false;
})
