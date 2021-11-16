const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8010})
const code2ws = new Map() 
// 建立连接
wss.on('connection', function connection(ws, request) {

    ws.sendData = (event,data) => {
        ws.send(JSON.stringify({event,data}))
    }
    ws.sendError = msg => {
        ws.sendData('error',{message})
    }
    // ws => 端
    let code = Math.floor(Math.random()* (999999 - 100000)) + 100000
    let ip = request.connection.remoteAddress.replace('::ffff:', '');
    console.log('ip is connected', ip)
    code2ws.set(code, ws)

    // 接收message
    ws.on('message', function incoming(message){
        console.log('incoming', JSON.parse(message));
        const buf = Buffer.from(message);
        message = buf.toString('utf-8')

    console.log("objData1:", message);
        // {event,data}
        let parseMessage = {}
        try{
            parseMessage = message
        } catch(e){
            ws.sendError('message invalid')
            return 
        }
        let {event, data} = JSON.parse(parseMessage)
        console.log('parseMessage', parseMessage);
        console.log(event,event === 'login');
        if(event === 'login') {
            ws.sendData('logined',{code})
        } else if(event === 'control') {
            let remote = +data.remote
            console.log('remote',remote);
            if(code2ws.has(remote)) {
                ws.sendData('controlled', {remote})
                let reemoteWs = code2ws.get(remote)
                ws.sendRemote = reemoteWs.sendData
                console.log('reemoteWs.sendDate',reemoteWs.sendDate)
                console.log('ws.sendRemote ',ws.sendRemote );
                reemoteWs.sendRemote = ws.sendData
                ws.sendRemote('be-controlled',{remote:code})
            }
        }else if(event === 'forward'){
            // data = {event, data}
            ws.sendRemote(data.event, data.data)
        }
    })

    // 断开
    ws.on('close',()=>{
        code2ws.delete(code)
        clearTimeout(ws._closeTimeout)
    })
    ws._closeTimeout = setTimeout(()=>{
        ws.terminate()
    }, 10 * 60* 1000)
})