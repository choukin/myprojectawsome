const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const handleIPC = require('./ipc')
const robot = require('./robot.js')

let win
const {create: createMainWindow, show:showMainWindow, close:closeMainWindow} = require('./windows/main')
// const {create: createControlWindow} = require('./windows/control')

app.allowRendererProcessReuse = false;

// 处理squirrel 更新过程
if(require('electron-squirrel-startup')) app.quit()

const gotTheLock = app.requestSingleInstanceLock()

if(!gotTheLock) {
  app.quit()
} else {
  // 当运行第二个实例时，将会聚焦到 myWindow 窗口
  app.on('second-instance',(event, commandLine, workingDirectory)=>{
    showMainWindow()
  })
  app.on('ready',()=>{
    createMainWindow()
    handleIPC()
    robot()
    console.log('menu');
    require('./trayAndMenu/index')
    
})

app.on('before-quit',()=>{
    closeMainWindow()
})

app.on('activate',()=>{
    showMainWindow()
    console.log('activate');
    //TODO: 手动出发崩溃
    // process.crash()
    // 唤起微信
    // require('./dll/activate-window-mac').showWeChat()
})

app.on('will-finish-launching',()=>{
  if(!isDev) {
  require('./updater.js')
  }
  require('./crash-report').init()
})
}


