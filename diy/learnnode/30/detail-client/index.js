const mount = require('koa-mount')
const static = require('koa-static')
const app  = new (require('koa'))
const rcpClient = require('./client')
const template = require('./template')

const detailTemplate = template(__dirname+'/template/index.html')
app.use(mount('/static',static(`${__dirname}/source/static`)))
app.use(async(ctx)=>{
    const result = await new Promise((reslove,reject)=>{
        rcpClient.write({
            columnid:ctx.query.columnid
        },function(error,data){
            error?reject(error):reslove(data)
        })
    })

    console.log(result);
    ctx.status = 200
    ctx.body = detailTemplate(result)
    
})

app.listen(3000)

