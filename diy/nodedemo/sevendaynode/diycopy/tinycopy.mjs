import fs from 'node:fs'
/**
 * 小文件拷贝
 * @param {*} src 
 * @param {*} dst 
 */
function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src))   
}

function main(argv) {
    console.log(argv);
    const [src, dst] = argv
    console.log(src,dst);
    copy(src, dst)
}
console.log(process.argv);
main(process.argv.slice(2))

