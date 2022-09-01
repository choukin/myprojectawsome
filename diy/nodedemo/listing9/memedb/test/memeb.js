const memdb = require('..')
const assert = require('node:assert')
describe('memdb', ()=>{
    beforeEach(()=>{
        memdb.clear()
    })
    describe('.saveSync(doc)',()=>{
        it('要保存文档',()=>{
            const pet = {name:'Tobi'}
            memdb.saveSync(pet)
            const ret = memdb.first({name:'Tobi'})
            assert(ret == pet)
        })
    })
    describe('.first(obj)',()=>{
        it('返回第一个匹配的文档',()=>{
            const tobi = {name:'Tobi'}
            const loki = {name:'Loki'}
            memdb.saveSync(tobi)
            memdb.saveSync(loki)
            let ret = memdb.first({name:'Tobi'})
            assert(ret == tobi)

            ret = memdb.first({name:'Loki'})
            assert(ret == loki)
        })

        it('没有匹配到时返回null',()=>{
            const ret = memdb.first({name:'manny'})
            assert(ret == null)
        })
    })

    describe(`异步 .save(doc)`,()=>{
        it('保存文档', (done)=>{
            const pet = {name:'Tobi'}
            memdb.save(pet,()=>{
                const ret  = memdb.first({name:'Tobi'})
                assert(ret==pet)
                done()
            })
        })
    })

    
})