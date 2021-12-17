const query = require('./index')
query('{hello}').then(res=>{
    console.log('res',res.data.hello);
}).catch(error=>{
    console.log(error);
})