const express = require('express');
const User = require('../models/user');
const entries =  require('../routes/entries') 
const Entry = require('../models/entry')
const api = express.Router();
const page= require('../middleware/page')

// curl http://demo:test@127.0.0.1:3000/api/user/4 -v
const user = (req,res,next)=>{
    User.get(req.params.id,(err,user)=>{
        if(err) return next(err)
        if(!user.id) return res.sendStatus(404)
        res.json(user)
    })
}
// curl -i -H 'Accept: application/xml' http://demo:test@127.0.0.1:3000/api/entries
// curl -i -H 'Accept: application/json' http://demo:test@127.0.0.1:3000/api/entries
const entries1 = (req,res,next)=>{
    const page = req.page;
    Entry.getRange(page.from, page.to,(err,entries)=>{
        if(err) return next(err)
        res.format({
            // application/json
            json:()=>{
                res.json(entries)
            },
            // application/xml
            xml:()=>{
                // res.write('<entries>\n')
                //  entries.write(
                //     ```
                //     <entry>
                //         <title>${entry.title}</title>
                //         <body>${entry.body}</body>
                //         <username>${entry.username}</username>
                //     </entry>
                //     ```
                //  )   
                // res.write('<entries>')
                console.log('xml', entries);
                res.render('entries/xml',{entries:entries})
            }
        })
        
    })

}


api.get('/user/:id', user)
// 消息列表
api.get('/entries/:page?', page(Entry.count), entries1)
// curl -X POST -d "entry[title]=''ho ho ho'&entry[body]='santa loves you'" http://demo:test@127.0.0.1:3000/api/entry
api.post('/entry', entries.submit)

module.exports =  api