const net = require('net')
const events = require('events')
const channel = new events.EventEmitter()

channel.clients = {}
channel.subscriptions = {}
channel.setMaxListeners(50)
channel.on('join', function (id, client) {
    const welcome = `Welcome ! Guests online ${this.listeners('broadcast').length}`
    client.write(welcome)
    this.clients[id]  = client
    this.subscriptions[id] = (senderid, message)=>{
        if(id != senderid){ // 不给自己广播
            this.clients[id].write(message)
        }
    }
    this.on('broadcast', this.subscriptions[id])
})

channel.on('leave',function (id) {
    channel.removeListener('broadcast',this.subscriptions[id])
    channel.on('broadcast', id, '${id} has left the chat room.\n')
})

channel.on('shutdown',function (id) {
    channel.emit('broadcast','','the server has shut down\n')
    channel.removeAllListeners('broadcast')
})

const server = net.createServer(client=>{
    console.log(client.remotePort);
    const id = `${client.remoteAddress}:${client.remotePort}`
    channel.emit('join', id, client)
    client.on('data', data=>{
       
        data = data.toString()
        console.log('data', data);
        if(data === 'shutdown\r\n'){
            channel.emit('shutdown')
        }
        channel.emit('broadcast', id, data)
        // client.write(data)
    })

    // client.on('close',()=>{
    //     channel.emit('leave', id)
    // })
})
process.on('uncaughtException', err=>{
    console.error(err.stack);
    process.exit(1)
})
server.listen(8888,()=>{
    console.log(`127.0.0.1:8888`);
})