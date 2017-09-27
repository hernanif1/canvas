let path = require('path')
var debug = process.env.NODE_ENV !== 'production'

module.exports = {
  // define entry point
  entry: './js/main.js',
  devtool: debug ? 'inline-sourcemap' : false,
  // define output point
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
