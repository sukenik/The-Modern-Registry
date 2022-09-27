const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.tsx",
    devtool: "source-map",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
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
        extensions: ['.ts', '.js', '.json', '.tsx']
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true
    },
    plugins: [new HtmlWebpackPlugin({
        favicon: 'Assets/favicon.ico',
        template: "public/index.html",
        hash: true,
        filename: "../dist/index.html"
    })]
}