const md5 = require('md5js')
let orginData = { idcode: 'LyqzO4', newPwd: '111111', pwd: '111111' }
let config = {}
config.data = {}
let data = { sign: '', object: {} }
data.object = orginData

let str = JSON.stringify(orginData) + 'cu01ud'
// console.log(str, 'str')
let sign = md5.md5(str, 32)
data.sign = sign

console.log(data)
