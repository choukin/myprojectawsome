const app = new (require('koa'))
const static = require('koa-static')
const mount = require('koa-mount')


const  ReactDOMSERVER = require('react-dom/server')

require('@babel/register')({
    presets:['@babel/preset-react']
})

const getFakeDate = require('./get-data')

const template = require('./template')(__dirname+'/index.htm')

const getApp = require('./app.jsx')

app.use(mount('/static', static(__dirname+'/source')))

app.use(mount('/data', async (ctx)=>{
    const filtType = isNaN(+(ctx.query.category))?0:+ctx.query.category
    const sortType = isNaN(+(ctx.query.sort))?0:+ctx.query.sort

    const data = await getFakeDate(sortType, filtType)
    console.log('=======',data);
    ctx.status = 200
    ctx.body = data
}))

app.use(async (ctx)=>{
    const filtType = isNaN(+(ctx.query.category))?0:+ctx.query.category
    const sortType = isNaN(+(ctx.query.sort))?0:+ctx.query.sort

    const data = await getFakeDate(sortType, filtType)
    console.log('=======',data);
    const reactString = ReactDOMSERVER.renderToString(
        getApp(data)
    )
    console.log(reactString);
    ctx.status = 200
    ctx.body  = template({
        reactString,
        reactData:data,
        filtType,
        sortType})
})

app.listen(3000)