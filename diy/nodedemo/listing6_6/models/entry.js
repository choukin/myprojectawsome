 import redis from 'redis'

const db = redis.createClient({
    // url: '127.0.0.1:6379'
  });

  db.on('error',(err)=>console.log('redis client error: ', err))
  await db.connect()

class Entry{
    constructor(obj){
        for (const key in obj) {
            this[key] = obj[key]
        }
    }

    async save(cb){
        const entryJSON = JSON.stringify(this)
        redis.print()
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
        const items = await db.lRange('entries', from , to)
        let entries = []
            items.forEach((item)=>{
                entries.push(JSON.parse(item))
            })
            console.log();
        cb(null, entries)
    }
    static async count(cb) {
        const data = await db.lLen('entries', cb);
        console.log('data', data);
        cb(null, data)
      }
}

// module.exports = Entry

await db.set('greeting','你好', redis.print)
console.log('🚀')
await db.set('color',1)
const color = await db.get('color')
console.log(typeof color);
await db.sAdd('admins', 'alice')
await db.sAdd('admins','Bob')
await db.sAdd('admins', 'alice')
const admins = await db.sMembers('admins')
db.sin
console.log(admins);

db.inc
db.quit()
// db.set('greeting','你好1')