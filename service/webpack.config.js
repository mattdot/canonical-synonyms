var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
  entry: APP_DIR + '/scripts/index.jsx',
  output: {
    path: BUILD_DIR + '/scripts',
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
          test : /\.css$/,
          include : APP_DIR,
          use: [
              {loader : 'css-loader'},
              {loader : 'style-loader'}
              
          ]
          
      }
    ]
  },
  devtool : "source-map"
};

module.exports = config;