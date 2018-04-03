const webpack = require('webpack')
const config = require('../config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const entryObj = require('./entry')
const path = require('path')

let configPlugins = [
  new webpack.DefinePlugin({
    'process.env': require('../config/dev.env')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
  new webpack.NoEmitOnErrorsPlugin(),
  // copy custom static assets
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }
  ])
]

//根据入口js生成页面
Object.keys(entryObj).forEach(item => {
  console.log(item)
  configPlugins.push(new HtmlWebpackPlugin(
    {
      filename: '../dist/' + item + '.html',
      template: path.resolve(__dirname, '../index.html'),
      chunks: [item]
    }
  ))
})

module.exports = configPlugins
