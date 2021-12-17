const cp = require('child_process')
// 主进程 创建子进程
const child_process = cp.fork(__dirname+'/child.js')
// 主进程给子进程发送消息
child_process.send('haha')
child_process.on('message',(str)=>{
    console.log('parent', str);
})