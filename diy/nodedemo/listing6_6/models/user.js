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
            console.log('========');
            if(err) return cb(err)
            User.get(id, cb)
        })
    }

    static async getId(name, cb){
       const id = await db.get(`user:id:${name}`)
       cb(null, id)
    }

    static async  get(id, cb){
        const user = await db.hGetAll(`user:${id}`)
        cb(null, new User(user))
    }

    static authenticate(name, passs,cb){
        User.getByName(name,(err,user)=>{
            if(err) return cb(err)
            if(!user.id) return cb()
            bcrypt.hash(pass, user.salt,(err,hash)=>{
                if(err) return err
                if(hash ===user.pass) return cb(null, user)
                cb('pass error');
            })
        })
    }
}
module.exports = User;