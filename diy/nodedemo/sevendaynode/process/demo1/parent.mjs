import child_process from 'node:child_process'
const child = child_process.spawn('node', ['child.mjs'],{})

child.kill('SIGTERM')

child.stdout.on('data',function (data) {
    console.log('stdout: '+data);
})

child.stderr.on('data', function(data){
    console.log('stderr: '+ data);
})

child.on('close', function (code) {
    console.log('子进程退出 code:', code);
})