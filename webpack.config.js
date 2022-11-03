const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  entry: './src/index.tsx',
  target: isProd ? "browserslist" : "web",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {       
      directory: path.join(__dirname, '../src'),
      watch: true
    },
    port: 3300,
    hot: true,
    open: true,
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        exclude: [/node_modules/],
        loader: "file-loader"
      },
      //SVGs
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./public/index.html"),
    }),
    new ESLintPlugin(),
    new MiniCssExtractPlugin()
  ],
  //for imports without .js/.jsx
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
}