/*
 * @Author: your name
 * @Date: 2020-07-01 17:11:46
 * @LastEditTime: 2020-07-10 16:01:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-basec:\Users\newrank\Desktop\lib-webpack\lib\webpack.dev.js
 */ 
const base = require("./webpack.base");
const merge = require("webpack-merge");
const webpack = require("webpack");

module.exports = merge(base,{
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ],
    mode:"development",
    devtool:"source-map",
    devServer:{
        contentBase:'./dist',
        hot:true,
        stats:"errors-only"
    }
})

