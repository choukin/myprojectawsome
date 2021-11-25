const buffer1 = Buffer.from('geekbank')
const buffer2 = Buffer.from([1,2,3,4])

// 创建长度是 20的buffer
const buffer3 = Buffer.alloc(20)
console.log(buffer1);
console.log(buffer2);
console.log(buffer3)

buffer2.writeInt8(12,0)
console.log(buffer2);

buffer2.writeUInt16BE(512,2)
console.log(buffer2);

buffer2.writeUInt16LE(512,2)
console.log(buffer2);

const fs = require('fs')
const protobuf = require('protocol-buffers')
const schema = protobuf(fs.readFileSync(__dirname+'/test.proto','utf-8'))

console.log(schema);
const encodeBf = schema.Column.encode({
    id:1,
    name:'Node.js',
    price:80.4
})
console.log(encodeBf);

console.log(schema.Column.decode(encodeBf));

