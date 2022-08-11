const fs = require('fs')
const events= require('events')

class Watcher extends events.EventEmitter{
    constructor(watchDir, processedDir){
        super()
        this.watchDir = watchDir
        this.processedDir = processedDir
    }
    /**
     * 循环目录处理文件
     */
    watch(){
        fs.readdir(this.watchDir,(err,files)=>{
            if(err) throw err;
            for (const index in files) {
                    const element = files[index];
                    this.emit('process', element);
            }
        })
    }

    /**
     * 启动对目录的监控
     */
    start(){
        // 监控中的目录发生变化就会触发 watch处理目录
        fs.watchFile(this.watchDir,()=>{
            this.watch()
        })
    }
}

const watchDir = `./dir`
const processedDir = `./process`

const watcher = new Watcher(watchDir, processedDir)

watcher.on('process', (file)=>{
    const watchFile = `${watchDir}/${file}`
    const processedfile = `${processedDir}/${file.toLowerCase()}`
    fs.rename(watchFile, processedfile, err =>{
        if(err) throw err;
    })
})

watcher.start()