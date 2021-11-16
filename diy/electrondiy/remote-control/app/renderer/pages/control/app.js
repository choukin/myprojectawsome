const peer = require('./peer-control')
peer.on('add-stream',(stream)=>[
    play(stream)
])
function play(stream) {
    debugger
    let video = document.getElementById('screen-video')
    video.srcObject = stream;
    // video.src = window.URL.createObjectURL(stream)
    video.onloadedmetadata  = function(){
        video.play()
    }
}

window.onkeydown = function(e){
    console.log('onkeydown', e);
    let data = {
        keyCode:e.keyCode,
        shift:e.shiftKey,
        meta: e.metaKey,
        control:e.ctrlKey,
        alt:e.altKey
    }
    // // data {keyCode, meta, alt,ctrl,shift}
    peer.emit('robot','key',data)
}

window.onmouseup = function(e) {
    console.log('onmouseup',e);
    //  // data {clientX, clientY, screen:{width,height},video:{width,height}}
    let video = document.getElementById('screen-video')
    let data = {
        clientX:e.clientX,
        clientY:e.clientX,
        video:{
            width:video.getBoundingClientRect().width,
            height:video.getBoundingClientRect().height
        }
    }
    peer.emit('robot','mouse',data)
}