const Koa = require('koa')
const app = new Koa()


app.use(async ctx => {
    // http 头部消息由四部分组成 general request response entity
    return ctx.body = {
        method: ctx.method
    }
})

app.listen(3000)