const User = require('../models/user')
// const user = new User({name:'demo',pass:'test'})
// console.log('1212');
// user.save(err=>{
//     if (err) {
//          console.error(err);   
//     }
//     console.log(`user id ${user.id}`);
// })


console.log(1);
User.getByName('demo', (err,user)=>{
    console.error(err);
    console.log(user);
})