import fs from 'node:fs'

/**
 * 大文件拷贝，一次性读取文件内容到内存容易内存溢出，对于大文件只能读取一点儿写一点儿
 * @param {*} src 
 * @param {*} dst 
 */
function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst))
}

function main(argv) {
    const [src, dst] = argv
    // copy(src, dst)
    streamCopy(src, dst)
}

main(process.argv.slice(2))


function streamCopy(src,dst) {
    const rs = fs.createReadStream(src)
    const ws = fs.createWriteStream(dst)
    res.on('data', function (chunk) {
        // ws.write 返回 false 表示数据临时放到缓存了还未写入文件中
        if(ws.write(chunk)===false){
            //处理前暂停读取
            rs.pause()
        }

    })

    res.on('end', function(){
        ws.end()
    })

    // 写入操作流写成功后触发
    ws.on('drain',function () {
        // 继续读取数据流
        rs.resume()
    })
}

