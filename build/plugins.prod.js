const webpack = require('webpack')
const config = require('../config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const entryObj = require('./entry')
const path = require('path')
const utils = require('./utils')

const env = require('../config/prod.env')

let configPlugins = [
  // 每次生成dist前先清空dist目录下的的内容
	new CleanWebpackPlugin(['dist'], {
		root: path.resolve(__dirname, '../')
	}),
  // http://vuejs.github.io/vue-loader/en/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': env
  }),
  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false
      }
    },
    sourceMap: config.build.productionSourceMap,
    parallel: true
  }),
  // extract css into its own file
  new ExtractTextPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css'),
    // Setting the following option to `false` will not extract CSS from codesplit chunks.
    // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
    // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
    // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
    allChunks: true,
  }),
  // Compress extracted CSS. We are using this plugin so that possible
  // duplicated CSS from different components can be deduped.
  new OptimizeCSSPlugin({
    cssProcessorOptions: config.build.productionSourceMap
      ? { safe: true, map: { inline: false } }
      : { safe: true }
  }),

  // keep module.id stable when vendor modules does not change
  new webpack.HashedModuleIdsPlugin(),
  // enable scope hoisting
  new webpack.optimize.ModuleConcatenationPlugin(),
  // split vendor js into its own file
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks (module) {
      // any required modules inside node_modules are extracted to vendor
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(
          path.join(__dirname, '../node_modules')
        ) === 0
      )
    }
  }),
  // extract webpack runtime and module manifest to its own file in order to
  // prevent vendor hash from being updated whenever app bundle is updated
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  // This instance extracts shared chunks from code splitted chunks and bundles them
  // in a separate chunk, similar to the vendor chunk
  // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: 'app',
    async: 'vendor-async',
    children: true,
    minChunks: 3
  }),

  // copy custom static assets
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }
  ])
]

//根据入口js生成页面
Object.keys(entryObj).forEach(item => {
  console.log(item)
  configPlugins.push(new HtmlWebpackPlugin(
    {
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // see https://github.com/ampedandwired/html-webpack-plugin
      filename: '../dist/' + item + '.html',
      template: path.resolve(__dirname, '../index.html'),
      chunks: ['manifest', 'vendor', item],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }
  ))
})

module.exports = configPlugins
