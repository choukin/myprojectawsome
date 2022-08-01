import child_process from 'node:child_process'

let worker;

function spawn(server,config){
    worker = child_process.spawn('node',[server, config])

    worker.on('exit', function(code){
        if(code!==0){
            // spawn(server,config)
        }
    })
    worker.stdout.on('data',function (data) {
        console.log('stdout: '+data);
    })
    worker.stderr.on('data', function (params) {
        console.error('error ',params.toString());
    } )
}

function main(argv){
    console.log(argv);
    spawn('index.mjs', argv[0])
   //守护进程在接收到SIGTERM信号时终止服务器进程
    process.on('SIGTERM', function () {
        console.log('kill');
        worker.kill();
        process.exit(0)
    })
}

main(process.argv.slice(2))