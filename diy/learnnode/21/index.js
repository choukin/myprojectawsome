const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const url = require('url')
const game = require('./game')
const express = require('express')
let playerWin = 0
let lastAction = null
let sameCount = 0

const app = express()
app.get('/favicon.ico',(req,res)=>{
    res.status(200)
    res.send()
    // res.writeHead(200)
    // res.end()
    return
})
app.get('/game',(req,res,next)=>{
    // const parseUrl = url.parse(req.url)
    // const playerAction = querystring.parse(parseUrl.query).action
    const playerAction = req.query.action
    
    
    console.log(lastAction,playerAction,sameCount);
    if(playerAction && lastAction === playerAction){
        sameCount++;
    } else{
        sameCount = 0;
    }
     // 玩家赢三次 或者作弊 sameCount 9 表示作弊
 if(playerWin>=3 || sameCount ===9){
    // res.writeHeader(500)
    // res.end('再也不和你玩儿了！')
    res.status(500)
    res.send('再也不和你玩儿了！')
    return
}



if(sameCount>=3){
    // res.writeHead(400)
    // res.end('你作弊！')
    res.status(400)
    res.send('你作弊！')
    sameCount=9;
    return 
}
    lastAction = playerAction
    req.playerAction = lastAction
    next()
    if(req.playerWin) {
        playerWin++;
    }
   
},(req,res)=>{

const result = game(req.playerAction)
let text = ''
if(result===0){
    text='平局了！'
}else if(result===1){
    text='你赢了！'
    req.playerWin = true
}else{
    text='你输了！'
}
// res.writeHead(200)
// res.end(text)
res.status(200)
res.send(text)
return
})

app.get('/',(req,res)=>{
    // res.status(200)
    // fs.createReadStream(__dirname+'/index.html').pipe(res)
    res.send(fs.readFileSync(__dirname+'/index.html','utf-8'))

})
app.listen(3000)

