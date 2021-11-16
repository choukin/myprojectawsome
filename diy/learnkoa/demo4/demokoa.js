const Koa = require('koa')
const app = new Koa()


app.use(async ctx => {
    // console.log(ctx.port);
    // ctx 中没有 hash 或者port
    return ctx.body = {
        href: ctx.href,
        path: ctx.path,
        url: ctx.url,
        query: ctx.query,
        querystring: ctx.querystring,
        search: ctx.search,
        host: ctx.host,
        hostname: ctx.hostname,
        protocol: ctx.protocol,
        secure: ctx.secure,
        subdomains: ctx.subdomains,
        origin: ctx.origin,
        // port: ctx.port
    }
})

app.listen(3000)