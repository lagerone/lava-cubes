const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(['dist/']),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets'),
        to: path.resolve(__dirname, 'dist/assets'),
      },
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      hash: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
  },
};
