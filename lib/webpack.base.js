const path = require(path);

module.exports = {
    entry:"./src/index.js",
    output:{
        path:path.join(__dirname,"dist"),
        filename:"bundle.js"
    },
    mode:"none",
    module:{
        rules:[
            {test:/\.(js|jsx)$/,use:"babel-loader"}
        ]
    },
    plugins:[]
}