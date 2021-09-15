const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const SRC = join(__dirname, 'src');

module.exports = ({ production: isProd }) => {
  return ({
    mode: isProd ? 'production' : 'development',

    devtool: "cheap-module-eval-source-map",

    entry: SRC,

    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'dist'),
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: join(SRC, 'index.html'),
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
  });
};
