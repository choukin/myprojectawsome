// const {graphql,buildSchema} = require('graphql')
// const schema = buildSchema(`
//     type Query {
//         hello: String
//     }
// `)

// const root = {
//     hello:() =>{
//         return 'hello world'
//     }
// }
// console.log('schema',schema);
// module.exports = function(query){
//     return graphql(schema,query,root).then(response=>{
//         console.log(response);
//         return response
//     })
// }
var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
      console.log('==========');
    return 'Hello world!';
  },
};


module.exports = function(query) {
    console.log('root',root);
    // Run the GraphQL query '{ hello }' and print out the response
    return graphql({schema, source:query, rootValue:root}).then((response) => {
      return response;
    });
}