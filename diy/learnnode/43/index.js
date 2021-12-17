const cluster = require('cluster');
//压测 ab -c50 -n400 http://127.0.0.1:3000/ 
// 如果是主进程
if(cluster.isMaster){
    // 启动四个子进程
    cluster.fork()
    cluster.fork()
    cluster.fork()
  
} else {
    // 子进程
    require('./app')
}