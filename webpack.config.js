'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/app.jsx')
  ],
  resolve: {
    root: [
      path.resolve(__dirname, "src"),
    ],
    modulesDirectories: [
      'node_modules',
      './src/components',
      './src/api'
    ],
    alias: {
      actions: 'actions/actions.js',
      reducers: 'reducers/reducers.js',
      configureStore: 'store/configureStore.js'
    },
    extensions: ['', '.js', '.jsx', '.css']
  },
  output: {
    path: path.join(__dirname, '/public/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
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
      loader: 'babel',
      query: {
        presets: ['env', 'react', 'stage-0']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  }
};
