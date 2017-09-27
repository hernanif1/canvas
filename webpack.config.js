let path = require('path')
var webpack = require('webpack')
var debug = process.env.NODE_ENV !== 'production'

module.exports = {
  // define entry point
  entry: './js/main.js',
  devtool: debug ? 'inline-sourcemap' : null,
  // define output point
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ] // loaders
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]

}
