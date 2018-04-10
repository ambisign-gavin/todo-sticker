const merge = require('webpack-merge');
const common = require('./webpack.common');
var webpack = require('webpack');

module.exports = merge(common,
    {
        devtool: 'inline-source-map',
        devServer: {
            hot: true,
            port: 3000
        },
        output: {
            publicPath: 'http://localhost:3000/static/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }
);