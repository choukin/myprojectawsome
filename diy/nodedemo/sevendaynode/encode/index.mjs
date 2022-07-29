import fs  from 'node:fs'
import iconv from 'iconv-lite'
// function readText(pathname) {
//     let bin = fs.readFileSync(pathname)
// console.log(bin[0]);
//     if (bin[0]===0xEF && bin[1]=== 0xBB && bin[2]===0xBF) {
//         console.log('BOM');
//         bin = Uint8Array.prototype.slice.call(bin,3);
//     }

//     return bin.toString('utf-8')
// }


// const a = readText('../diycopy/src/a.txt')


/**
 * GBK转UTF8
 * @param {*} pathname 
 */
function readGBKText(pathname) {
    const bu = fs.readFileSync(pathname)
    return iconv.decode(bu, 'gbk').toString()
    // return bu.toString()
}




// 单字节编码
// 不管大于0xEF的单个字节在单字节编码下被解析成什么乱码字符，使用同样的单字节编码保存这些乱码字符时，背后对应的字节保持不变
function replaceBinary(pathname) {
    let str = fs.readFileSync(pathname, 'binary')
    str = str.replace('foo', 'bar')
    str = str.replace('你','wo')
    fs.writeFileSync(pathname, str, 'binary')
}

replaceBinary('../diycopy/src/a.txt')

const gbk = readGBKText('../diycopy/src/a.txt')
console.log(gbk);