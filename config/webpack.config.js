const path = require('path')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../app/js'),
  dist: path.join(__dirname, '../dist'),
  css: path.join(__dirname, '../app/css'),
  img: path.join(__dirname, '../static/img')
}

module.exports = {
  devtool: 'eval',
  entry: [ PATHS.src ],
  output: {
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      css: PATHS.css,
      img: PATHS.img
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new CleanPlugin(['bundle.js', 'bundle.js.map', 'style.css', 'style.css.map'], PATHS.dist)
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "presets": ["es2015", "react", "stage-1"],
          cacheDirectory: true
        }
      },
      {
        test: /\.react.css$/,
        loader: 'react-css-components'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  }
}
