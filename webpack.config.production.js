const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./webpack.config.base');

const API_HOST = JSON.stringify('TODO');

module.exports = merge(config.base, {
  context: config.sourcePath,
  entry: {
    bundle: 'index.jsx',
    vendor: config.vendorLibs,
    publicPath: config.outputPublicPath,
  },
  output: {
    path: config.distPath,
    filename: '[name].[hash].js',
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
