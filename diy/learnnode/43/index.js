const cluster = require('cluster');
const os = require('os')
//压测 ab -c50 -n400 http://127.0.0.1:3000/ 
// 如果是主进程
if(cluster.isMaster){
     // 启动子进程数量是cup的核数
    for(let i=0;i<os.cpus().length/2;i++){
        cluster.fork()
    }
} else {
    // 子进程
    require('./app')
}