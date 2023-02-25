const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  entry: './src/index.tsx',
  target: isProd ? "browserslist" : "web",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
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
    historyApiFallback: true,
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
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
    new MiniCssExtractPlugin(),
    // new MiniCssExtractPlugin(),
    // new CssMinimizerPlugin(),
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      quiet: true,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'public/*.json', to: '[name].json' },
    //     { from: 'public/*.png', to: '[name].png' },
    //   ],
    // }),
  ],
  //for imports without .js/.jsx
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
}