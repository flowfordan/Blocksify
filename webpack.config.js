const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {       
      directory: path.join(__dirname, 'public')
    },
    port: 3381,
    hot: true,
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
        use: ["style-loader", 
          {
            loader: "css-loader",
            options: {
              // importLoaders: 1,
              // modules: true,
            },
          },
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
  ],
  //for imports without .js/.jsx
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
}