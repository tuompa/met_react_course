const webpack = require('webpack');
const merge = require('webpack-merge');

const API_HOST = JSON.stringify('TODO');

const config = require('./webpack.config.base');

module.exports = merge(config.base, {
  devtool: 'source-map',
  context: config.sourcePath,
  entry: {
    bundle: 'index.js',
  },
  output: {
    path: config.distPath,
    filename: '[name].js',
    publicPath: config.outputPublicPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      API_HOST,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    // host must be set to enable accessing server from localhost:${PORT} when devServer running in docker
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000,
    contentBase: config.sourcePath,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 200,
    },
  },
});
