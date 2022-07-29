import util from 'node:util'
import http from 'node:http'
function main(argv) {
    try {
        
    } catch (error) {
        // 退出程序
        process.exit(1)
    }
}

main(process.argv.slice[2])


function log() {
    process.stdout.write(util.format.apply(util,arguments)+'\n')
}


log('1233');


// linux root 权限才能监听 1024 以下的端口 完成监听后需要把权限降下来
// 系统管理授权每个进程使用一个给定的UI（USER Ientification）标识符,
// 每个被启动的进程都有一个启动该进程的用户UID，
// 子进程拥有和父进程一样的UID
// 用户可以时某个组的成员，每个组也有一个GID（GROUP Ientification）标识
http.createServer(callback).listen(80, function(){
    const env = process.env;
    // 如果通过sudo 获取的root权限，运行程序的UID和GID保存在环境变量SUDO_UID SUDO_GID里面
    // 如果是通过 `chomod +S` 获取的root权限，程序可以通过 process.getuid / process.getgid 方法获取。
    // process.setui 和 process.gid 方法只接受 number 类型的参数。
    const uid = parseInt(env['SUDO_UID']||process.getuid(),10)
    const gid = parseInt(env['SUDO_GID']||process.getgid(),10)

    // 降权时必须先降GID再降UID 顺序反过来就没有权限更改程序的GID
    process.setgid(gid)
    process.setuid(uid)
})