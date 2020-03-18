const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "<%= toolNameCljs %>",
    libraryTarget: "var"
  },
  optimization: {
    minimize: true
	},
	module: {
    rules: [
      <%- CSSLoader %>
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
	externals: {
		react: 'window.React',
		'react-dom': 'window.ReactDOM'
	}
};
