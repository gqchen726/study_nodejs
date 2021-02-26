const webpack = require('webpack');
new webpack.ProvidePlugin({
    $: 'axios',
});