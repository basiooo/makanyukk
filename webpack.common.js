const WebpackPwaManifest = require('webpack-pwa-manifest')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default
const ImageminPngQuant = require('imagemin-pngquant')
const path = require('path')
const ImageminMozjpeg = require('imagemin-mozjpeg')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]bundle.js'
  },
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [{
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader'
      }
      ]
    },
    {
      test: /\.(jpg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      }]
    }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'src/public/icons/icon.png')
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/public/'),
        to: path.resolve(__dirname, 'dist/')
      }]
    }),
    new WebpackPwaManifest({
      name: 'MakanYukk',
      short_name: 'MakanYukk',
      orientation: 'portrait',
      start_url: '/index.html',
      description: 'Temukan berbagai restoran terbaik di Indonesia',
      display: 'standalone',
      theme_color: '#fafafa',
      background_color: '#fafafa',
      inject: true,
      ios: true,
      icons: [{
        src: path.resolve('src/public/icons/icon.png'),
        ios: 'default',
        sizes: [72, 96, 128, 144, 152, 192, 384, 512],
        type: 'image/png',
        purpose: 'any maskable',
        destination: path.join('assets', 'icons')

      }]
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/scripts/sw.js')
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 60,
          progressive: true
        }),
        ImageminPngQuant({
          quality: [0.5, 0.8]
        })
      ]
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 50000,
      maxSize: 100000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
