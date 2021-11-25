const fs = require('fs')
const game = require('./game')
const koa = require('koa')
const mount = require('koa-mount')
let playerWin = 0
let lastAction = null
let sameCount = 0

const app = new koa()

app.use(mount('/favicon.ico',(ctx)=>{
    ctx.status = 200
}))
 
const gameKoa = new koa()

gameKoa.use(async (ctx,next)=>{
    const playerAction = ctx.query.action
    if(playerAction && lastAction === playerAction){
        sameCount++;
    } else{
        sameCount = 0;
    }
     // 玩家赢三次 或者作弊 sameCount 9 表示作弊
    if(playerWin>=3 || sameCount ===9){
        ctx.status = 500
        ctx.body = '再也不和你玩儿了！'
        return
    }
    lastAction = playerAction
    ctx.playerAction = lastAction
    await next()
    if(ctx.playerWin) {
        playerWin++;
    }
})
gameKoa.use(async (ctx,next)=>{
    if(sameCount>=3){
        ctx.status = 400
        ctx.body = '你作弊！'
        sameCount=9;
        return 
    }
   await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const result = game(ctx.playerAction)
            let text = ''
            if(result===0){
                text='平局了！'
            }else if(result===1){
                text='你赢了！'
                ctx.playerWin = true
            }else{
                text='你输了！'
            }
            ctx.status = 200
            ctx.body = text
            resolve()
        },500)
    })
  
})
app.use(mount('/game',gameKoa))
// app.get('/game',(req,res,next)=>{
//     // const parseUrl = url.parse(req.url)
//     // const playerAction = querystring.parse(parseUrl.query).action
  




//     lastAction = playerAction
//     req.playerAction = lastAction
//     next()
//     if(req.playerWin) {
//         playerWin++;
//     }
   
// },(req,res)=>{


// })


app.use(mount('/',async (ctx)=>{
    ctx.response.status = 200;
    ctx.response.body = fs.readFileSync(__dirname+'/index.html','utf-8')
}))
app.listen(3000)

