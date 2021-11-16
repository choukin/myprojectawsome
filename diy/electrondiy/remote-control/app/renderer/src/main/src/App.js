import  {useState, useEffect} from 'react'
import './App.css';
import './peer-puppet.js'
// import {ipcRenderer, remote} from 'electron'
const {ipcRenderer} = window.require('electron')
// console.log(window.require('@electron/remote').Menu);
// const {MenuItem, Menu} = window.require('@electron/remote')
// console.log(remote);
// const {MenuItem, Menu} = remote
console.log(ipcRenderer);
function App() {
  // 远端code
  const [remoteCode, setRemoteCode] = useState('')
  // 本地code
  const [localCoade, setLocalCode] = useState('')
  // 链接状态
  const [controlText, setControlText] = useState('')
  // 登录逻辑
  const login = async ()=>{
    let {code} = await ipcRenderer.invoke('login')
    console.log('code',code);
    setLocalCode(code)
  }

  // react hook
  
  useEffect(()=>{
    // 相当于 componentDidMount 过程
    login();
    // 监听 状态码的变化
    ipcRenderer.on('control-state-change', handleControlState)
    // 清理监听
    // 相当于 componentWillUnmount
    return ()=>{
      ipcRenderer.removeListener('control-state-change', handleControlState)
    }
  },[])

  /**
   * 开始控制
   * @param {*} remoteCode 
   */
  const startControl = (remoteCode) =>{
    console.log(remoteCode);
    // 向主进程发起远程控制
    ipcRenderer.send('control',remoteCode)
  }

  /**
   * 监听控制状态的修改
   * @param {*} e 
   * @param {*} name 
   * @param {*} type 
   */
  const handleControlState = (e, name, type) =>{
    console.log('handleControlState');
    let text = ''
    if(type===1){
      // 控制别人
      text = `正在控制${name}`
    } else if(type ===2) {
      // 被控制
      text = `被${name}控制`
    }
    setControlText(text)
  }

  const handleContextmenu = (e)=>{
    e.preventDefault()
    // const menu = new Menu()
    // menu.append(new MenuItem({label:'复制',role:'copy'}))
    // menu.popup()
  }


  return (
    <div className="App">
      {
        controlText === ''?
          <>
          <div>您的控制码
            <span onContextMenu={e=>{handleContextmenu(e)}}>
            {localCoade}
            </span>
            </div>
          <input type="text" value={remoteCode} onChange={e=>setRemoteCode(e.target.value)}/>
          <button onClick={()=>startControl(remoteCode)}>确认</button>
          </>:<div>{controlText}</div>
      }
    </div>
  );
}

export default App;
