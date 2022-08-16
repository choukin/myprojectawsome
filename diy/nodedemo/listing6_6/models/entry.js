const redis = require('redis')

const db = redis.createClient({
    // url: '127.0.0.1:6379'
  });

  db.on('error',(err)=>console.log('redis client error: ', err))
  db.connect()

class Entry{
    constructor(obj){
        for (const key in ojb) {
            this[key] = obj[key]
        }
    }

    save(cb){
        const entryJSON = JSON.stringify(this)
        db.lpush(
            'entries',
            entryJSON,
            (err)=>{
                if(err) return cb(err)
                cb()
            }
        )
    }

    static async getRange(from ,to ,cb){
        console.log('getRange');
        // await db.lRange('engries', from , to, (err, items)=>{
        //     console.log('lange');
        //     if(err) return cb(err)
        //     let entries = []
        //     items.forEach((item)=>{
        //         entries.push(item)
        //     })
        //     cb(null, entries)
        // })
        const items = await db.lRange('engries', from , to)
        let entries = []
            items.forEach((item)=>{
                entries.push(item)
            })
        cb(null, entries)
    }
}

module.exports = Entry