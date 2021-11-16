const { BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
let win

function create(){
win = new BrowserWindow({
    width:1000,
    height:600,
    webPreferences: {
        nodeIntegration: true,
//   enableRemoteModule: true,
       contextIsolation: false, // electron api 在已经加载的页面里可以使用
    },
    // webPreferences:{
    //     nodeIntergration:true
    //     // nodeIntegration:true,// 打开node环境
    // }
})
// if(isDev) {

// win.loadURL('http://localhost:3000/')
// } else {
//     // TODO： 第三章
    win.loadFile(path.resolve(__dirname, '../../renderer/pages/control/index.html'))
// }
}

function send(channel, ...args) {
    win.webContents.send(channel, ...args)
}

module.exports = {create, send}