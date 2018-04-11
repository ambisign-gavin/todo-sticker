const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const AppHTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/index.html`,
    filename: __dirname + '/dist/app.html',
    inject: 'body',
    chunks: ['app'],
});

const NoteHTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/src/note/index.html`,
    filename: __dirname + '/dist/note.html',
    inject: 'body',
    chunks: ['note'],
});

module.exports = {
    target: 'electron-main',
    node: {
        __dirname: false
    },
    entry: {
        main: './src/main.js',
        app: './src/index.js',
        note: './src/note/index.js',
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
                exclude: /(node_modules|bower_components)/,
                enforce: 'pre',
                loader: 'eslint-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
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
        NoteHTMLWebpackPluginConfig
    ]
};