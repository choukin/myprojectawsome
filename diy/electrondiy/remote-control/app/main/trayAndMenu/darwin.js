const { app, Menu, Tray} = require('electron')
const {show:showMainWindow} = require('../windows/main')
const {create:createAboutWindow} = require('../windows/about')
const path = require('path')
let tray
function setTray() {
    tray = new Tray(path.resolve(__dirname,'./icon_darwin.png'))
    tray.on('click',()=>{
        showMainWindow()
    })

    tray.on('right-click',()=>{
        const contextMenu = Menu.buildFromTemplate([
            {label:'显示', click: showMainWindow},
            {label:'退出', click: app.quit}

        ])
    tray.popUpContextMenu(contextMenu)

    })
}

function setAppmenu() {

    const appMenu = Menu.buildFromTemplate([
        {
            label:app.name,
            submenu:[
                {
                    label:'About',
                    click:createAboutWindow
                },
                {
                    type:'separator'
                },
                {
                    role:'services'
                },
                {
                    type:'separator'
                },
                {
                    role:'hide'
                },

                {
                    role:'unhide'
                },
                {
                    type:'separator'
                },{
                    role:'quit'
                },
            ]
        },
        {role:'fileMenu'},
        {role:'windwoMenu'},
        {role:'editMenu'},

    ])

    app.applicationMenu = appMenu
    
}

app.whenReady().then(()=>{
    console.log('tray');
    setTray()
    // setAppmenu()
})