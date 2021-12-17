const EasySock = require('easy_sock')
const protobuf = require('protocol-buffers')
const fs = require('fs')
const schemas = protobuf(fs.readFileSync(`${__dirname}/detail.proto`))

const easySock = new EasySock({
    ip:'127.0.0.1',
    port:'4000',
    timeout:500,
    keepAlive: true //是全双工通信
})
/**
 * 编码
 */
easySock.encode = function(data,seq){
    const body = schemas.ColumnRequest.encode(data)
    const head = Buffer.alloc(8)
    // 放置请求序号
    head.writeInt32BE(seq)
    // 把包的长度写进去
    head.writeInt32BE( body.length, 4)
    return Buffer.concat([head,body])
}
/**
 *解码
 */
easySock.decode = function(buffer){
    const seq = buffer.readInt32BE()
    const body = schemas.ColumnResponse.decode( buffer.slice(8))
    return {
        result:body,
        seq
    }
}

/**
 * 是否接收完成
 */
easySock.isReceiveComplete = function(buffer){
    if(buffer.length<8){
        // 包有问题
        return 0
    }

    // 读取包body的长度
    const bodyLength = buffer.readInt32BE(4)
    if(buffer.length>= bodyLength+8){
        // 返回实际长度
        return bodyLength + 8
    } else {
        return 0
    }

}

module.exports = easySock