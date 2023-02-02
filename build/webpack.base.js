const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(mjs|ts|tsx)$/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
                decorators: false,
                dynamicImport: true
              },
              target: 'es2015',
              transform: {
                react: {
                  refresh: isDev, // 开发环境下开启 react-refresh
                  runtime: 'automatic'
                }
              }
            },
            minify: isDev
          }
        }
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, '../src'),
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // loader 从右往左执行
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 文件输出目录和命名
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]' // 文件输出目录和命名
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.mjs', '.json', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, '../node_modules')], // 指定第三方模块的查找目录
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true
    })
    // 定义环境变量
    // new webpack.DefinePlugin({
    //   'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    // })
  ],
  cache: {
    type: 'filesystem' // 使用文件系统缓存
  }
}
