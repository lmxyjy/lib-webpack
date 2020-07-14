/*
 * @Author: your name
 * @Date: 2020-07-01 17:11:56
 * @LastEditTime: 2020-07-10 16:16:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-basec:\Users\newrank\Desktop\lib-webpack\lib\webpack.prod.js
 */ 
const base = require("./webpack.base");
const merge = require("webpack-merge");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin"); //抽离出公共的文件


module.exports = merge(base,{
    mode:"production",
    plugins:[
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp:/.css$/g,
            cssProcessor:require('cssnano')
        }),
        new HtmlWebpackExternalsPlugin({
            externals:[
                {
                    module:'react',
                    entry:'https://11.url.cn/now/lib/16.2.0/react.min.js',
                    global:'React'
                },
                {
                    module:'react-dom',
                    entry:'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
                    global:'ReactDOM'
                }
            ]
        }),
    ],
    optimization:{
        splitChunks:{
            minSize:0,
            cacheGroups:{
                commons:{
                    name:"commons",
                    chunks:'all',
                    minChunks:2
                }
            }
        }
    },
})