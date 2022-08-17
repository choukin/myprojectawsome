const User = require('../models/user')
exports.form = (req, res)=>{
    res.render('register', {title:'注册'})
}

exports.submit = (req,res, next)=>{
    const data = req.body.user
    console.log('submit', data);
    User.getByName(data.name,(err,user)=>{
        if(err) return next(err)
        if(user.id){
            res.error('用户名已存在！')
            // 返回referr
            res.redirect('back')
        } else {
            user = new User(data)
            user.save(err=>{
                if(err) return next(err)
                req.session.uid = user.id
                res.redirect('/')
            })
        }

    })
}

