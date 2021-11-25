const http = require('http')
const querystring = require('querystring')
const fs = require('fs')
const url = require('url')
const game = require('./game')
let playerWin = 0
let lastAction = null
let sameCount = 0
http.createServer((req,res)=>{
    const parseUrl = url.parse(req.url)
    if(parseUrl.pathname === '/favicon.ico') {
        res.writeHead(200)
        res.end()
        return
    }
    if(parseUrl.pathname ==='/game'){
        const playerAction = querystring.parse(parseUrl.query).action
        const result = game(playerAction)
        
        console.log(lastAction,playerAction,sameCount);
        if(playerAction && lastAction === playerAction){
            sameCount++;
        } else{
            sameCount = 0;
        }
        lastAction = playerAction
        res.writeHead(200)
        // 玩家赢三次 或者作弊 sameCount 9 表示作弊
        if(playerWin>=3 || sameCount ===9){
            res.writeHeader(500)
            res.end('再也不和你玩儿了！')
            return
        }

  
        
        if(sameCount>=3){
            res.writeHead(400)
            res.end('你作弊！')
            sameCount=9;
            return 
        }

        let text = ''
        if(result===0){
            text='平局了！'
        }else if(result===1){
            text='你赢了！'
            playerWin++;
        }else{
            text='你输了！'
        }
        
        res.end(text)
        return
    }

    if(parseUrl.pathname === '/') {
        fs.createReadStream(__dirname+'/index.html').pipe(res)
    }



}).listen(3000)
