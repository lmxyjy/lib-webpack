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

module.exports = merge(base,{
    mode:"production",
    plugins:[
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp:/.css$/g,
            cssProcessor:require('cssnano')
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