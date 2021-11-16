const { WSAEINVAL } = require('constants')
const { BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
let win
let willQuitApp = false
function create(){
win = new BrowserWindow({
    width:600,
    height:300,
    show:false,
    background:'#2e2c29',
    webPreferences: {
            webSecurity: false,
        nodeIntegration: true,
//   enableRemoteModule: true,
       contextIsolation: false, // electron api 在已经加载的页面里可以使用
    },
    // webPreferences:{
    //     nodeIntergration:true
    //     // nodeIntegration:true,// 打开node环境
    // }
})

win.on('close',(e)=>{
    if(willQuitApp){
        // win.close()
        win = null
    }else{
        e.preventDefault();
        win.hide()

    }

})
if(isDev) {
console.log(isDev,'isDEV');
win.loadURL('http://localhost:3000/')
} else {
    // TODO： 第三章
    win.loadFile(path.resolve(__dirname, '../../renderer/pages/main/index.html'))
}
}

function send(channel, ...args) {
    win.webContents.send(channel, ...args)
}

function show(){
    // win.on('ready-to-show',()=>{
    //     win.show()
    // })
    win.show()
}

function close(){
    willQuitApp = true
    win.close()
}

module.exports = {create, send, show, close}