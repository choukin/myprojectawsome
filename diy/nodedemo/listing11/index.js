#! /usr/bin/env node
const concat = require('mississippi').concat
const yargs = require('yargs')
const fs = require('fs')
const argv = yargs
.usage('parse-json [options]')
.help('h')
.alias('h','help')
.demand('f') // 需要 -f 命令
.nargs('f', 1) // 告诉yargs -f 后面有个参数
.describe('f', "JOSN file to parse")

.argv

console.log({f:argv.f});

const file = argv.f;


function parse(str){
    const value = JSON.parse(str)
    console.log(JOSN.stringify(value))
}

if(file === '-'){
    // concat 会把完整的数据传给作为它参数的函数
    // 
    process.stdin.pipe(concat(parse))
} else {
fs.readFile(file,(err, dataBuffer)=>{
    const value = JSON.parse(dataBuffer.toString())
    console.log(JSON.stringify(value));
})

}