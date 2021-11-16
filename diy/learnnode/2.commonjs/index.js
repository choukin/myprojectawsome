
const game = require('./lib')
const playerAction = process.argv[process.argv.length-1]

// const result = game(playerAction)

// console.log(result);
// 标准输入
let count = 0
process.stdin.on('data',e=>{
    const playerAction = e.toString().trim()
    console.log(playerAction);
    const result = game(playerAction)
    console.log(result);
    if(result === -1){
        count++
    }
    if(count===3) {
        console.log('你太厉害了');
        process.exit()
    }
})