const sinon= require('sinon')

const DB = require('../database')

const fs = require('fs')
// 探测器
const database = new DB('./sample.json')

const fsWriteFileSpy = sinon.spy(fs,'writeFile')// 替换方法

const saveDone = sinon.spy()

database.insert('name', 'sinon')
database.save(saveDone)

sinon.assert.calledOnce(fsWriteFileSpy) // 断言只调用一次

fs.writeFile.restore()// 恢复原来的方法