const app = new(require('koa'))
const mount = require('koa-mount')
const static = require('koa-static')
const {graphqlHTTP} = require('koa-graphql')
const fs = require('fs')


  app.use(
    mount('/api',
      graphqlHTTP({
        schema: require('./schema'),
        // graphiql: true, // 启用调试模式
      }))
  );  

  app.use(
    mount('/static', static(`${__dirname}/source/static`))
  )

  app.use(mount('/', async (ctx)=>{
    ctx.status = 200
    ctx.body = fs.readFileSync(`${__dirname}/source/index.htm`,'utf-8')
  }))
// http://localhost:3000/?query={comment{name,id,praiseNum}}
// http://localhost:3000/api post  mutation{praise(id:3)}
app.listen(3000)