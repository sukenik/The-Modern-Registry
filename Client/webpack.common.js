const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const Dotenv = require('dotenv-webpack')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    entry: {
        app: './src/index.tsx'
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: 'Assets/favicon.ico',
            template: 'public/index.html',
            hash: true,
            filename: '../dist/index.html',
            title: 'Production'
        }),
        new Dotenv({
            path: './.env'
        }),
        new NodePolyfillPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.png$/,
                use: 'file-loader'
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.tsx'],
        fallback: {
            "fs": false
        }
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true
    },
};