const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// TODO const ExtractTextPlugin = require('extract-text-webpack-plugin');

const API_HOST = JSON.stringify('TODO');

const config = require('./webpack.config.base');
console.warn('IF YOU ARE HAVING PROBLEMS WITH REFRESHING TO NESTED PATH:S SET PUBLIC PATH LIKE SO: "output: {... publicPath: config.outputPublicPath, ...}');
module.exports = merge(config.base, {
  context: config.sourcePath,
  entry: {
    bundle: 'index.jsx',
    vendor: config.vendorLibs,
  },
  output: {
    path: config.distPath,
    filename: config.outputFileNameTemplate,
  },
  plugins: [
    new CleanWebpackPlugin([config.distPath]),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_HOST: JSON.stringify(API_HOST),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: `${config.sourcePath}/index.html`,
      path: config.distPath,
      filename: 'index.html',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  ],
});
