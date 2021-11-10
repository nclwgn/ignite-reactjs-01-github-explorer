const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  // Configures environment for development build,
  // which makes it a little faster but less optimized than production
  mode: isDevelopment ? 'development' : 'production',
  // Defines the source map, which allows displaying source code while in the browser
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  // Always using path.resolve for pathname resolving instead of hardcoded
  // paths, which are OS based
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // Refers to Javascript and React JS files
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // Configures live reload devServer
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    }
  },
  // Also 'compiles' the index.html file, referencing the bundle.js file
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  // Refex configuration for files that should be included
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};