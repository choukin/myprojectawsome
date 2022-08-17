const User = require('../models/user')
const auth = require('basic-auth')
module.exports = (req,res,next)=>{
  const {name, pass} = auth(req)
  User.authenticate(name,pass,(err,user)=>{
    if(user) req.remoteUser = user
    next(err)
  })
}

