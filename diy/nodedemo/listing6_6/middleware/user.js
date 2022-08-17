const User = require('../models/user')

module.exports = (req,res,next)=>{

    if(req.remoteUser) {
        res.locals.user = req.remoteUser
    }
    const uid = req.session.uid 
    console.log('uid ', uid);
    if(!uid) return next()
    User.get(uid, (err,user)=>{
        console.log('user', user);
        req.user = res.locals.user = user
        next()
    })
}