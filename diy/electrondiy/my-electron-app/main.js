const {app, BrowserWindow,Notification,Menu,ipcMain,nativeTheme} = require('electron')
const path = require('path')
const fs = require('fs')
const os = require('os')
console.log(__dirname,'__dirname');

// 禁用 GPU 加速
app.disableHardwareAcceleration()

const template = [
    {
        "label":"文件",
        "submenu":[
          {
            "label":"Open Recent",
            "role":"recentdocuments",
            "submenu":[
              {
                "label":"Clear Recent",
                "role":"clearrecentdocuments"
              }
            ]
          }
        ]
      },
    {
        "label":"文件",
        "submenu":[
          {
            "label":"Open Recent",
            "role":"recentdocuments",
            "submenu":[
              {
                "label":"Clear Recent",
                "role":"clearrecentdocuments"
              }
            ]
          }
        ]
      },
      {
        "label":"退出功能",
        "submenu":[
          {
            "label":"退出",
            "role":"quit"
          }
        ]
      }
]

const dockMenu = Menu.buildFromTemplate([
    {
        label:'新窗口',
        click(){
            console.log('新窗口');
        }
    },
    {
        label:'带设置的新窗口',
        submenu:[
            {label:'Basic'},
            {label:'pro'}
        ]
    },
    {
        label:'新命令'
    }
])

const menu = Menu.buildFromTemplate(template)
function createWindow(){
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            // offscreen: true ,
            //1、path.join API 将多个路径联结，创建一个平台组合路径字符串
            // 2、 __dirname 字符串指向当前正在执行的脚本路径
            preload:path.join(__dirname,'preload.js')
        }
    })

    win.loadFile('index.html')

    win.webContents.on('paint',(event,dirty,image)=>{
        console.log('paint');
        fs.writeFileSync('ex.png',image.toPNG())
    })

    

    
    const INCREMENT = 0.03
    const INTERVAL_DELAY = 100
    let c = 0
    progressInterval = setInterval(()=>{
        win.setProgressBar(c)
        if(c<2) c+= INCREMENT
        else c = -1
    },INTERVAL_DELAY)
    return win
}

const fileName = 'recently-used.md'
fs.writeFile(fileName,'Lorem Ipsum',()=>{
    app.addRecentDocument(path.join(__dirname,fileName))
})


app.whenReady().then(()=>{
    // 创建窗口
    const win = createWindow()
    win.setRepresentedFilename(os.homedir())
    win.setDocumentEdited(true)
    win.webContents.openDevTools();


    ipcMain.handle('dark-mode:toggle',()=>{
        if(nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle('dark-mode:system',()=>{
        nativeTheme.themeSource = 'system'
    })



    Menu.setApplicationMenu(menu)

    if(process.platform ==='darwin') {
        app.dock.setMenu(dockMenu)
    }

    // 当 Linux 和 Windows 应用在没有窗口打开时退出了，macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。
    app.on('activate',function(){
        if(BrowserWindow.getAllWindows().length ===0) {
            createWindow()
        }
    })
    
}).then(showNotification)

app.on('window-all-closed', function(){
// 非mocOS 情况下 关闭所有窗口退出应用
if(process.platform !=='darwin') {
    app.quit()
}
})

ipcMain.on('ondragstart',(event, filePath)=>{
    console.log(filePath);
    event.sender.startDrag({
        file:filePath,
        icon:path.join(__dirname,'icon.png')
    })
})

function showNotification(){
    const NOTIFICATION_TITLE = 'Basic Notification'
    const NOTIFICATION_BODY = 'Notification from the Main process'
    new Notification({title:NOTIFICATION_TITLE,body:NOTIFICATION_BODY}).show()
}

