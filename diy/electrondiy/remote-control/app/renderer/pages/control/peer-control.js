const { ipcRenderer } = require('electron');
const EventEmitter = require('events')
const peer = new EventEmitter()
// const {desktopCapturer, ipcRenderer} = require('electron')

// async function getScreenStream() {

//   const sources = await desktopCapturer.getSources({types: ['screen']})
    
//     navigator.webkitGetUserMedia({
//         audio: false,
//         video: {
//             mandatory: {
//                 chromeMediaSource: 'desktop',
//                 chromeMediaSourceId: sources[0].id,
//                 maxWidth: window.screen.width,
//                 maxHeight: window.screen.height
//             }
//         }
//     }, (stream) => {
//         peer.emit('add-stream', stream)
//     }, (err) => {
//         //handle err
//         console.error(err)
//     })


// }
// getScreenStream()

// peer.on('robot',(type,data)=>{
//     if(type === 'mouse') {
//         data.screen = {
//             width: window.screen.width,
//             height:window.screen.height
//         }
//     } 
//     console.log(type,'on');
//     ipcRenderer.send('robot',type,data)
// })
// 信令服务
const pc = new window.RTCPeerConnection({})
//  创建数据通道
const dc = pc.createDataChannel('robotchannel', {
    reliable:false//允许丢失
})

dc.onopen = funciton (){
    peer.on('robot',(type, data)=>{
        dc.send(JSON.stringify({type,data}))
    })
}

dc.onmessage = (event)=>{
    console.log('message', event);
}
dc.onerror = e=>{
    console.error('error',e);
}
// onicecandidate iceEvent
// addIceCandidate

pc.onicecandidate = function (e){
    console.log('control-onicecandidate',e);
  console.log('candidate', e.candidate);
  if(e.candidate) {
  ipcRenderer.send('forward','control-candidate', JSON.parse(JSON.stringify(e.candidate)))
  }
}

ipcRenderer.on('candidate',(e, candidate)=>{
    addIceCandidate(candidate)
})

let candidates = []
async function addIceCandidate(candidate) {
    if (candidate) {
     candidates.push(candidate)
    }
    if(pc.remoteDescription && pc.remoteDescription.type) {
        for(let i=0;i<candidates.length ;i++) {
          await  pc.addIceCandidate(new RTCIceCandidate(candidates[i]))
        }

        candidates = []
    }
}
// window.addIceCandidate = addIceCandidate

async function createOffer() {
   const offer  = await  pc.createOffer({
        offerToReceiveAudio:false,
        offerToReceiveVideo:true
    })

    await pc.setLocalDescription(offer)
    console.log('pc-offer', JSON.stringify(offer));
    return pc.localDescription
}

createOffer().then(offer=>{
    ipcRenderer.send('forward','offer',{type:offer.type,sdp:offer.sdp})
});

async function setRemote(answer) {
    await pc.setRemoteDescription(answer)
}

ipcRenderer.on('answer', (e, answer) => {
    setRemote(answer)
})

// window.setRemote = setRemote

pc.onaddstream = function (e) {
    console.log('add stream', e);
    peer.emit('add-stream', e.stream)
}

module.exports = peer