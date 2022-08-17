const express = require('express');
const User = require('../models/user');
const entries =  require('../routes/entries') 
const api = express.Router();

// curl http://demo:test@127.0.0.1:3000/api/user/4 -v
const user = (req,res,next)=>{
    User.get(req.params.id,(err,user)=>{
        if(err) return next(err)
        if(!user.id) return res.sendStatus(404)
        res.json(user)
    })
}

const entries1 = ()=>{

}


api.get('/user/:id', user)
api.get('/entries/:page? ', entries1)
api.post('/entry', entries.submit)

module.exports =  api