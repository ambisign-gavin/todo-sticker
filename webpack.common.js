const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const AppHTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    filename: __dirname + '/dist/app.html',
    inject: 'body',
    chunks: ['app'],
});

const StickerHTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/sticker/html/index.html`,
    filename: __dirname + '/dist/sticker.html',
    inject: 'body',
    chunks: ['sticker'],
});

module.exports = {
    target: 'electron-main',
    node: {
        __dirname: false
    },
    entry: {
        main: './src/main.js',
        app: './src/index.js',
        sticker: './src/sticker/html/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.js', '.json']
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components|__tests__|__mocks__)/,
                loader: 'babel-loader'
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            // Scss
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            //less
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        AppHTMLWebpackPluginConfig,
        StickerHTMLWebpackPluginConfig
    ]
};