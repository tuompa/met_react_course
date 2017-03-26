const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// TODO const ExtractTextPlugin = require('extract-text-webpack-plugin');

const API_HOST = JSON.stringify('TODO');

const config = require('./webpack.config.base');

module.exports = merge(config.base, {
  devtool: 'source-map',
  context: config.sourcePath,
  entry: {
    bundle: 'index.jsx',
  },
  output: {
    path: config.distPath,
    filename: config.outputFileNameTemplate,
    publicPath: config.outputPublicPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      API_HOST,
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: `${config.sourcePath}/index.html`,
      path: config.distPath,
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    //host must be set to enable accessing server from localhost:${PORT} when devServer running in docker
    port: process.env.PORT || 8000,
    contentBase: config.sourcePath,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 50,
      poll: 100,
    },
  },
});
