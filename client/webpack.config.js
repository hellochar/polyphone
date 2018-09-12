const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "../"),
    disableHostCheck: true,
    host: "0.0.0.0",
    hot: true,
    historyApiFallback: true,
    useLocalIp: true,
  },
  entry: {
    main: path.join(__dirname, "/src/index.tsx"),
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "../"),
    filename: "[name].js",
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          { loader: 'css-loader', options: { importLoaders: 2 } },
          "postcss-loader",
          'sass-loader'
        ]
      },
      {
        test: /\.(vert|frag|glsl)$/,
        use: "webpack-glsl-loader"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      'three-examples': path.resolve(__dirname, 'node_modules/three/examples/js/')
    }
  },
  plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inlineSource: ".css$",
            template: path.resolve(__dirname, './index.template.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackInlineSourcePlugin(),
  ]
};