const path = require("node:path")
const webpack = require("webpack")

module.exports = {
    mode:"production",
    entry:'./app/index.jsx',
    output:{
        path:__dirname,
        filename:'dist/bundle.js'
    },
    module:{
        rules:[
            {
                test:/.jsx?$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react'] // 使用babel 插件
                    }
                },
                exclude: /node_modules/,
            }
        ]
    }
}