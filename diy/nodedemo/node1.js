const fs = require('fs')
const path = require('path')
const filePath =  path.resolve(__dirname,'demo.txt')
console.log(filePath);
// 读取
fs.readFile(filePath,'utf8',(error, data)   =>{
    console.error(error);
    if(!error){
        console.log(data);
    }
})

// 写入
fs.appendFile(filePath, 'hello node','utf8',(error,data)=>{
    if(!error){
        console.log(data);
    }
} )

const filename = path.basename(filePath)
console.log('filename',filename);
console.log('filename',path.basename(filePath,'x'));
console.log(path.extname(filePath));