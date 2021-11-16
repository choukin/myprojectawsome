const {ipcMain} = require('electron')
const robot= require('robotjs')
const vkey = require('vkey')
function handleMouse(data) {
    // data {clientX, clientY, screen:{width,height},video:{width,height}}
    const {clientX, clientY, screen,video} = data
    let x = clientX * screen.width /video.width;
    let y = clientY * screen.height /video.height;
    robot.moveMouse(x,y)
    robot.mouseClick()
}

function handleKey(data) {
    console.log();
    // data {keyCode, meta, alt,ctrl,shift}
    const modifiers = []
    if(data.meta){
        modifiers.push('meta')
    }
    if(data.alt){
        modifiers.push('alt')
    }
    if(data.control){
        modifiers.push('ctrl')
    }
    if(data.shift){
        modifiers.push('shift')
    }

    let key = vkey[data.keyCode].toLowerCase()
    if(key[0]!== '<') { // <shift>
    robot.keyTap(key, modifiers)
    }

}

module.exports = function(){
    console.log('robot');
    ipcMain.on('robot',(e,type, data)=>{
        console.log(type,data);
        if(type === 'mouse') {
            handleMouse(data)
        } else if(type === 'key') {
            handleKey(data)
        }
    })
}