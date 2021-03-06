const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  // Configures environment for development build,
  // which makes it a little faster but less optimized than production
  mode: isDevelopment ? 'development' : 'production',
  // Defines the source map, which allows displaying source code while in the browser
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  // Always using path.resolve for pathname resolving instead of hardcoded
  // paths, which are OS based
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // Refers to Javascript and React JS files
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  // Configures live reload devServer
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    hot: true,
  },
  // Also 'compiles' the index.html file, referencing the bundle.js file
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  // Refex configuration for files that should be included
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};