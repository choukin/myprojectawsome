const redis = require('redis')
const bcrypt = require('bcrypt')
const db = redis.createClient()

db.connect()

class User{
    constructor(obj){
        for (const key in obj) {
            this[key] = obj[key]
        }
    }

    async save(cb){
        if(this.id){
            this.update(this.id)
        } else {
            const id = await db.incr('user:ids')
            this.id = id;
            this.hashPassWord((err)=>{
                if (err) return cb(err)
                this.update(cb)
            })

        }
    }

    async update(cb){
        const id = this.id;
        await db.set(`user:id:${this.name}`,id)
        await db.hSet(`user:${id}`,this)
        cb()
    }

    hashPassWord(cb){
    
        bcrypt.genSalt(12,(err,salt)=>{
            // 获取12个字符的盐
            if(err) return cb(err)
            this.salt = salt
            bcrypt.hash(this.pass, salt, (err,hash)=>{
                // 获取生成的hash
                if(err) return cb(err)
                // 保存hash
                this.pass = hash
                cb()
            })
        })
    }

    static getByName(name, cb){
        User.getId(name, (err, id)=>{
            if(err) return cb(err)
            User.get(id, cb)
        })
    }

    static getId(name, cb){
        if(err) return cb(err)
        db.get(`user:id${name}`, cb)
    }

    static get(id, cb){
        db.hgetll(`user:${id}`, (err,user)=>{
            console.log('user ',user);
            if(err) return cb(err)
            cb(null, new User(user))
        })
    }
}
module.exports = User;