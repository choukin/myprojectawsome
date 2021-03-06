const WebSocket = require('ws')
const EventEmitter = require('events')

const signal = new EventEmitter()

const ws = new WebSocket('ws://127.0.0.1:8010')

ws.on('open',() => {
    console.log('connect success');
    
})

ws.on('message', function(message){
    let data = {}
    try{
        data = JSON.parse(message)
    } catch(e) {
        console.error('parse,error');
    }

    signal.emit(data.event, data.data)
})

function send(event, data) {
    console.log(JSON.stringify({event, data}));
    ws.send(JSON.stringify({event, data}))
}

function invoke(event, data, answerEvent) {
    return new Promise((resolve, reject) => {
        send(event, data)
        console.log('send');
        signal.once(answerEvent, resolve)
        console.log('signal.once');
        setTimeout(()=>{
             reject('timeout')
        },5000)
    })
}

signal.send = send

signal.invoke = invoke

module.exports = signal

