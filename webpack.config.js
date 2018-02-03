var path = require('path');
var webpack = require('webpack');

var isProduction = process.env.NODE_ENV === 'production';
var definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  },
});

module.exports = {
  devtool: 'eval',
  entry: isProduction ?
    [ './demo/src/index' ] :
    [
      'webpack-dev-server/client?http://localhost:3100',
      'webpack/hot/only-dev-server',
      './demo/src/index'
    ],
  output: {
    path: path.join(__dirname, 'demo/static'),
    filename: 'bundle.js',
    publicPath: isProduction ? 'static/' : '/static/'
  },
  plugins:  isProduction ?
    [
      new webpack.NoErrorsPlugin(),
      definePlugin,
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      })
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      definePlugin
    ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: isProduction ? ['babel'] : ['react-hot-loader/webpack', 'babel'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'demo/src')
      ]
    }
    ]
  },
  devServer: isProduction ? null : {
    quiet: true,
    publicPath: '/static/',
    port: 3100,
    contentBase: './demo/',
    hot: true,
    stats: {
      colors: true
    },
    historyApiFallback: true
  }
};