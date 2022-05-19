const fs = require('fs')


function readScore(filePath){
 const data = fs.readFileSync(filePath, 'utf8')
 console.log(data);
 const result = data.replace(/=/g,':').replace(/ /g, '\n')
 console.log(result)
 fs.writeFile('./result.txt', result, function(error){
     if(error){
         console.log('写入错误');
     }
 })
}
const filePath = './demo.txt'
readScore(filePath)