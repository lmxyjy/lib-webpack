/*
 * @Author: your name
 * @Date: 2020-07-01 17:12:01
 * @LastEditTime: 2020-07-13 14:20:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-basec:\Users\newrank\Desktop\lib-webpack\lib\webpack.base.js
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  // 获取到src目录下，第一级所有文件夹钟的index.js文件
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  Object.keys(entryFiles)
    .forEach((key) => {
      const entryFile = entryFiles[key];
      const match = entryFiles.match(/src\(.*)\/index\.js/);
      const pageName = match && match[1];

      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: [pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyJS: true,
            minifyCSS: true,
            removeComments: false,
          },
        }),
      );
    });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  mode: 'none',
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          MinCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MinCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                autoprefixer({});
              },
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1rem:75px
              remPrecision: 8, // 小数点后8位
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: '[name]_[hash].[ext]',
          },
        }],
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },

    ],
  },
  plugins: [
    new MinCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function doneError() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
