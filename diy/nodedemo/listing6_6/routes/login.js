const User  = require('../models/user')
exports.form=(req, res)=>{
 res.render('login',{title:'登录'})
}

exports.submit=(req,res,next)=>{
    const data = req.body.user
    User.authenticate(data.name,data.pass, (err,user)=>{
        console.log('err', user);
        if(err) return next(err)
        if(user){
            req.session.uid = user.id
            res.redirect('/')
        } else {
            res.error('抱歉，用户名或密码错误')
            res.redirect('back')
        }
    })
}

exports.logout = ()=>{
 req.session.destory(err=>{
    if(err) throw err
    res.redirect('/')
 })
}
