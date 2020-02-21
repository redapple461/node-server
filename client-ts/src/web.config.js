//const multi = require('multi-loader');
const path = require("path");
const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: "development",
  entry: './src/index.tsx',
  output: {
    path: __dirname, // Folder to store generated bundle
    filename: 'bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx"]
  },
  module: {
      rules: [
          {
              test: /\.tsx$/,
              exclude: /node_modules/,
              loader: 'ts-loader',
          },
          {
              test: /\.css$/,
              exclude: /node_modules/,
              use: ['style-loader','css-loader']
          }
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      ]
  },
  externals: [nodeExternals()],

  devServer: {
    port: 9000
  },

};