const cluster = require('cluster');
const os = require('os')
//压测 ab -c50 -n400 http://127.0.0.1:3000/ 
// 如果是主进程
if(cluster.isMaster){
     // 启动子进程数量是cup的核数
    for(let i=0;i<os.cpus().length/2;i++){

        const work = cluster.fork()
        // 处理僵尸进程
        let missedPing = 0
        let iter  = setInterval(()=>{
          work.send('ping')
          console.log('ping');
          missedPing++;
          if(missedPing>3){
              clearInterval(iter)
             process.kill(work.process.pid)
          }
        },3000)
        work.on('message',()=>{
            if(msg = 'pong'){
                missedPing--;
            }
        })
    }
    // 重启
    cluster.on('exit',()=>{
        setTimeout(()=>{
            cluster.fork()
        },5000)
    })
} else {
    // 子进程
    require('./app')
    process.on('message',(str)=>{
        if(str==='ping'){
            console.log('pong');
            process.send('pong')
        }
    })
    process.on('uncaughtException',(e)=>{
        console.log(e);
        process.exit(1)
    })
   // 内存监控
    setInterval(()=>{
        console.log(process.memoryUsage().rss);
        // 700M
        if(process.memoryUsage().rss>=734003200){
            console.log('oom');
            process.exit(1)
        }
    },5000)
}