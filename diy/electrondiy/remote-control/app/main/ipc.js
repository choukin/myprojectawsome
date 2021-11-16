const {ipcMain} = require('electron')
const {send: sendMainWindow} = require('./windows/main')
const {create: createControlWindow, send: sendControlWindow} = require('./windows/control')
const signal = require('../main/signal')
module.exports = function(){
    console.log(1231231232);
    ipcMain.handle('login', async ()=>{
        // 先 mock 返回一个code
        // let code = Math.floor(Math.random()* (999999 - 100000)) + 100000
        let code = signal.invoke('login', null, 'logined')
        return code
    })

    ipcMain.on('control', async(e, remote) => {
        console.log('control');
        // TODO: 这里跟服务端交互，先moke 
        signal.send('control',{remote})
        
    })

    signal.on('controlled', (data) => {
        createControlWindow()
        sendMainWindow('control-state-change',data.remote, 1)
    })

    signal.on('be-controlled', (data) => {
        sendMainWindow('control-state-change',data.remote, 2)
    })

    ipcMain.on('forward', (e,event,data) => {
        console.log('signal',event, data);
        signal.send('forward',{event,data})
    })

    signal.on('offer', data=>{
        sendMainWindow('offer', data)
    })

    signal.on('answer', data=>{
        sendControlWindow('answer', data)
    })

    signal.on('puppet-candidate',(data) => {
        sendControlWindow('candidate', data)
    })

    signal.on('control-candidate', data => {
        sendMainWindow('candidate', data)
    })

}