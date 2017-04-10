const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.join(__dirname,'src');
const distPath = path.join(__dirname,'dist');
const sourcePath = path.join(__dirname,'src');
const getPostCssPlugins = ()=>[
  autoprefixer({browsers: [
    '>1%',
    'last 4 versions',
    'Firefox ESR',
    'not ie < 9', // React doesn't support IE8 anyway
  ],}),
];

const baseConfig = {
  resolve: {
    extensions: ['.js','.jsx',],
    modules: [
      path.resolve(__dirname,'node_modules'),
      sourcePath,
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        include: path.join(SRC_PATH,'./images'),
        use: 'url-loader?limit=10000&name=assets/[name].[hash:8].[ext]',
        //If the file is greater than the limit (10000 in bytes) the file-loader is used and all query parameters are passed to it.
      },
      {
        test: [/\.scss$/,/\.css$/,],
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            // Using source maps breaks urls in the CSS loader
            // https://github.com/webpack/css-loader/issues/232
            // This comment solves it, but breaks testing from a local network
            // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
            // 'css-loader?sourceMap',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: getPostCssPlugins(),
              },
            },
            'sass-loader?sourceMap', //TODO sourceMap should be removed at some point from production build
          ],}),
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({filename: getPath=>getPath('css/[name][hash].css').replace('css/js','css'),
      allChunks: true,}),
    new HtmlWebpackPlugin({
      template: `${sourcePath}/index.html`,
      path: distPath,
      filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = {
  distPath,
  sourcePath,
  vendorLibs: ['axios', 'firebase', 'react','react-dom','redux','react-redux','redux-thunk','react-addons-css-transition-group','react-flip-move'],
  outputPublicPath: '/',
  base: baseConfig,
  modulesPath: path.join(__dirname,'node_modules'),
};
