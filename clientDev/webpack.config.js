const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const WEBPACK_MODE = (process.env.NODE_ENV.trim() == "dev") ? "development" : "production"

// init config
module.exports = {

    // entry point
    entry: path.resolve(__dirname, 'src/index.js'),

    // output file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    // loaders
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/i, use: ['style-loader', 'css-loader'], },
        ]
    },

    // dev server
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3000
    },

    mode: WEBPACK_MODE

};