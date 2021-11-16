// createAnswer
// addstream


const { desktopCapturer,ipcRenderer } = window.require('electron')
const pc = new window.RTCPeerConnection({})

pc.ondatachannel = (e) =>{
    console.log('datachannel', e);
    e.chanel.onmessage = (e)=>{
        const {type,data} = e.data
        if(type === 'mouse') {
                    data.screen = {
                        width: window.screen.width,
                        height:window.screen.height
                    }
                } 
                console.log(type,'on');
                ipcRenderer.send('robot',type,data)
    }
}
async function getScreenStream() {
    const sources = await desktopCapturer.getSources({types: ['screen']})

    return new Promise((resolve,reject)=>{
        navigator.webkitGetUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: sources[0].id,
                    maxWidth: window.screen.width,
                    maxHeight: window.screen.height
                }
            }
        }, (stream) => {
            resolve(stream)
            // peer.emit('add-stream', stream)
        }, (err) => {
            //handle err
            console.error(err)
            reject(err)
        })
    })
}
async function createAnswer(offer){
 let screenStream = await getScreenStream()
  await pc.addStream(screenStream)
  // 设置远端会话描述
  await pc.setRemoteDescription(offer)
 // 设置本地会话描述
  await pc.setLocalDescription(await pc.createAnswer())
 console.log('answer', JSON.stringify(pc.localDescription))
  return pc.localDescription;
}

// window.createAnswer = createAnswer


// onicecandidate iceEvent
// addIceCandidate

pc.onicecandidate = function (e){
    console.log('peer-onicecandidate',e);
    console.log('candidate', JSON.stringify(e.candidate));
    if(e.candidate) {
    ipcRenderer.send('forward','puppet-candidate', {...e.candidate})
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
//window.addIceCandidate = addIceCandidate
ipcRenderer.on('offer',async (e, offer)=>{
  let answer = await createAnswer(offer)
  ipcRenderer.send('forward','answer',{type:answer.type, sdp:answer.sdp})
})


