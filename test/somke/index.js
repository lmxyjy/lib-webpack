const path = require("path");
const webpack = require("webpack");
const rimraf = require("rimraf"); //删除掉打包出来的文件

// 指定文件的执行目录
process.chdir(path.join(__dirname,"template"));

rimraf("./dist",()=>{
    const prodConfig = require("../../lib/webpack.prod.js");

    webpack(prodConfig,(err,stats)=>{
        if(err){
            console.log(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors:true,
            modules:false,
            children:false
        }))
    })
})