const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "<%= toolName %>",
    libraryTarget: "var"
  },
  optimization: {
    minimize: true
  }
};
