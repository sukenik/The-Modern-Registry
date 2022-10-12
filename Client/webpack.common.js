const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const Dotenv = require('dotenv-webpack')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    entry: {
        app: './src/index.tsx'
    },
    plugins: [
        new CleanWebpackPlugin(),
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
        clean: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            'es2015',
                            'react'
                        ]
                    }
                },
                include: /node_modules\/react-dom/,
                use: ['react-hot-loader/webpack']
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
    }
};