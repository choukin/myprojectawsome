import {Buffer} from 'node:buffer'

const bin =  Buffer.from([0x86, 0x65, 0x6c, 0x6f])

let sub = bin[0]
console.log(sub); // 134
// 字符串不可变修改会得到新的字符串，Buffer更像可以做指针操作的C语言数组，可以用[index]修改某个字节
sub = 0x65



const str = bin.toString('utf-8')

console.log('Buffer 转字符串', str); // Buffer 转字符串 �elo

const bin2 =  Buffer.from('hello', 'utf-8')
console.log('字符串转 Buffer', bin2); // 字符串转 Buffer <Buffer 68 65 6c 6c 6f>


// 项拷贝一份Buffer需要先创建一个新的Buffer，并通过copy方法把原来Buffer中的数据复制过去，类似申请一块新的内存，并把已有内存数据复制过去


const dup = Buffer.alloc(bin.length)

bin.copy(dup)

dup[0] = 0x48
console.log('复制后修改的dup', dup); // 复制后修改的dup <Buffer 48 65 6c 6f>
console.log('复制前未修改bin ',bin); // 复制前未修改bin  <Buffer 86 65 6c 6f>



