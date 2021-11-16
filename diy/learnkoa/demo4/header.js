const Keygrip = require('keygrip')
const Koa = require('koa')
const app = new Koa()

// app.keys = ['i am a newer secret', 'i like turtle']

app.keys = new Keygrip(['i am a newer secret', 'i like turtle'], 'sha256')

app.use(async ctx => {
    ctx.cookies.set('name', 'koajs', { signed: true })
    // http 头部消息由四部分组成 general request response entity
    return ctx.body = {
        header: ctx.header,// 获取所有头部信息
        get_cache_control: ctx.get('Cache-Control'), // 获取特定头部
        charset: ctx.charset,
        contentType: ctx.type
    }
})

app.listen(3000)