const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new Dotenv({
      path: `./development.env`
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: 'react-hot-loader'
      }
    ]
  }
});