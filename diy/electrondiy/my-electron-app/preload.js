// 预加载脚本在渲染器进程加载之前加载，并有权访问两个渲染器全局（window/document） 和Node.js 环境
const {contextBridge, ipcRenderer} = require('electron')
const path = require('path')

const {render} = require('./renderQRCode')

window.addEventListener('DOMContentLoaded',()=>{
    const replaceText = (selector,text)=>{
        const element = document.getElementById(selector)
        if(element) element.innerText = text
    }
    for(const dependency of ['chrome','node','electron']) {
        replaceText(`${dependency}-version`,process.versions[dependency])
    }

})

// 使用 contextBridge 注入方法 window.electron.startDrag(...) 将向主进程发送IPC消息。
contextBridge.exposeInMainWorld('electron',{
    startDrag:(fileName)=>{
        console.log(fileName);
        ipcRenderer.send('ondragstart',path.join(process.cwd(),fileName))
    }
})

contextBridge.exposeInMainWorld('darkMode',{
    toggle:()=>ipcRenderer.invoke('dark-mode:toggle'),
    system:()=>ipcRenderer.invoke('dark-mode:system'),
    generationPoster:()=>{
        const config = {
            city: '0371',
            img: `0371.jpg`, // 底图
            count: 2, // 打印张数
            url: 'https://m.qshealth.com/zbb/landpage', // 二维码跳转链接
            textLeft:1882,
            textTop:6695,
            // 二维码
            qrCodeList: [
              {
                healthitem: '1', // 18岁以下 儿童百万
                width: 1024,
                height: 1024,
                x: 3031,
                y: 2184
              },
              {
                healthitem: '2', // 18-60岁 成人百万
                width: 1024,
                height: 1024,
                x: 3031,
                y: 3772
              },
              {
                healthitem: '3', // 60-80岁 老年防癌
                width: 1024,
                height: 1024,
                x: 3031,
                y: 5370
              }
            ],
            tempFilePath: (config) => {
              return `./${config.city}output-multiQRCode/${config.codename}.jpg`;
            }
          };
        render(config)
    }
})