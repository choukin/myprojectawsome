const app = new(require('koa'))
const mount = require('koa-mount')
const static = require('koa-static')
const {graphqlHTTP} = require('koa-graphql')

// app.use(
//     mount(
//       '/graphql',
//       graphqlHTTP({
//         schema: require('./schema'),
//         graphiql: true,
//       }),
//     ),
//   );
  app.use(
      graphqlHTTP({
        schema: require('./schema'),
        // graphiql: true, // 启用调试模式
      }),
  );  

app.listen(3000)