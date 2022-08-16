const async = require('async');
const exec = require('child_process').exec;

function downloadNodeVersion(version, destination, callback){
    const url = `https://nodejs.org/dist/v${version}/node-v${version}.tar.gz`
    const filePath = `${destination}/${version}.tgz`
    exec(`curl ${url} > ${filePath}`, callback)
}

async.series([ // 顺序执行串行任务
    callback=>{
        // 并行下载
        async.parallel([
            callback =>{
                console.log('下载 node v4.4.7...');
                downloadNodeVersion(`4.4.7`, '/tmp', callback)
            },
            callback => {
                console.log('下载 node v18.5.0');
                downloadNodeVersion(`18.5.0`, '/tmp', callback)
            }
        ], callback)
    },
    callback=>{
        console.log('归档下载文件');
        exec(
            `tar cvf node_distoros.tar /tmp/4.4.7.tgz /tmp/18.5.0.tgz`,
            err=>{
                if (err) {
                    throw err;
                }
                console.log('完成');
                callback()
            }
        )
    }
])