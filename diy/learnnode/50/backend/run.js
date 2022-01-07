const app = require('../backend/app')
const koa = new (require('koa'))
const mount = require('koa-mount')

Object.keys(app).forEach(routerPath=>{
    koa.use(
        mount(routerPath, async (ctx)=>{
            ctx.status = 200
            ctx.body = await app[routerPath](ctx.query)
        })
    )
})

koa.listen(3000)

