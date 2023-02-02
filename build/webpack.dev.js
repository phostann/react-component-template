const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3000, // 使用默认端口
    compress: false, // 开发环境不启用 gzip 压缩
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../public')
    }
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new ReactRefreshWebpackPlugin()]
})
