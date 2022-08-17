const redis = require('redis')

const db = redis.createClient({
    // url: '127.0.0.1:6379'
  });

  db.on('error',(err)=>console.log('redis client error: ', err))
  db.connect()

class Entry{
    constructor(obj){
        for (const key in obj) {
            this[key] = obj[key]
        }
    }

    async save(cb){
        const entryJSON = JSON.stringify(this)
       await  db.lPush(
            'entries',
            entryJSON
        )
        cb()
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