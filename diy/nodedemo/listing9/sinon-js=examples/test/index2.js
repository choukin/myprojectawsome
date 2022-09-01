const sinon= require('sinon')

const DB = require('../database')

const fs = require('fs')
// 存根
const database = new DB('./sample.json')

const stub = sinon.stub(fs, 'writeFile')
const saveDone = sinon.spy()



database.insert('b','sinon')
database.save(saveDone)

sinon.assert.calledOnce(stub)
// sinon.assert.calledOnce(fsWriteFileSpy) // 断言只调用一次

stub.restore()// 恢复原来的方法