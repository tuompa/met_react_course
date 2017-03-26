const path = require('path');
const autoprefixer = require('autoprefixer');

const SRC_PATH = path.join(__dirname, 'src');

const getPostCssPlugins = () => [
  autoprefixer({ browsers: [
    '>1%',
    'last 4 versions',
    'Firefox ESR',
    'not ie < 9', // React doesn't support IE8 anyway
  ] }),
];

const baseConfig = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'src'),
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
        include: path.join(SRC_PATH, './images'),
        use: 'url-loader?limit=10000&name=assets/[name].[hash:8].[ext]',
        //If the file is greater than the limit (10000 in bytes) the file-loader is used and all query parameters are passed to it.
      },
      {
        test: [/\.scss$/, /\.css$/],
        exclude: /node_modules/,
        use: [
          'style-loader',
            // Using source maps breaks urls in the CSS loader
            // https://github.com/webpack/css-loader/issues/232
            // This comment solves it, but breaks testing from a local network
            // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
            // 'css-loader?sourceMap',
          'css-loader',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
};

module.exports = {
  getPostCssPlugins: getPostCssPlugins,
  vendorLibs: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk'],
  outputFileNameTemplate: '[name].[hash].js',
  outputPublicPath: '/',
  base: baseConfig,
  sourcePath: path.join(__dirname, 'src'),
  distPath: path.join(__dirname, 'dist'),
  modulesPath: path.join(__dirname, 'node_modules'),
};
