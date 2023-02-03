const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.js')
const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          filter: (source) => {
            return !source.includes('index.html')
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    // 清理无用 css, 不能针对 tailwindcss arbitrary value 做特殊处理，存在 bug, 暂不使用
    // new PurgeCSSPlugin({
    //   paths: globAll.sync([
    //     `${path.join(__dirname, '../src')}/**/*.tsx`,
    //     path.join(__dirname, '../public/index.html')
    //   ])
    // }),
    // gzip 压缩
    new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css,js压缩文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip', // 压缩格式,默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8 // 压缩率,默认值是 0.8
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'] // 删除 console.log
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          minChunks: 1,
          chunks: 'initial',
          minSize: 0,
          priority: 1
        },
        common: {
          name: 'commons',
          minChunks: 2,
          chunks: 'initial',
          minSize: 0
        }
      }
    }
  }
})
