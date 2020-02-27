//const multi = require('multi-loader');
const path = require("path");
const nodeExternals = require('webpack-node-externals');
// const HtmlWebpackPlugin  = require('html-webpack-plugin');
module.exports = {
  mode: "development",
  entry: './src/index.tsx',
  output: {
    path: __dirname, // Folder to store generated bundle
    filename: '../../server-ts/src/static/bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      modules: ['node_modules'] 
  },
  target: "web",
  module: {
      rules: [
          {
              test: /\.tsx$/,
              exclude: /node_modules/,
              loader: 'ts-loader',
          },
          {
              test: /\.css$/,
              use: ['style-loader','css-loader']
          }

      ]
  },

  devServer: {
    port: 9000
  },

};