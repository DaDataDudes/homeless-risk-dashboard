'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    bundle: ['babel-polyfill', './src/client/index.js']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel' 
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass?outputStyle=expanded&' +
        'includePaths[]=' +
        (encodeURIComponent(
          path.resolve(process.cwd(), './node_modules')
        )) +
        '&includePaths[]=' +
        (encodeURIComponent(
          path.resolve(process.cwd(),
          './node_modules/grommet/node_modules'))
        )
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  devServer: {
    hot: true,
    contentBase: './dist'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};