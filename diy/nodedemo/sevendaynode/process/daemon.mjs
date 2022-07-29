import child_process from 'node:child_process'

function spawn(mainModule) {
    const worker = child_process.spawn('node',[mainModule])

    worker.on('exit', function (code) {
        console.log('code:', code);
        if(code!=0){
            spawn(mainModule)
        }
    })

    worker.stdout.on('data',function (data) {
    console.log('stdout: '+data);
})
}




spawn('worker.js')