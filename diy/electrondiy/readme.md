# Electron 文档
- https://www.electronjs.org/docs/tutorial/process-model
- https://github.com/cawa-93/vite-electron-builder
- https://github.com/sindresorhus/awesome-electron#boilerplates

## 主进程 

每个应用都有一个第一的主进程，作为应用程序的入口点，主进程在Node.js 环境中运行，主进程可以require 所有nodejs API


## 窗口管理
主进程的主要目的是使用 `BrowserWindow` 模块创建和管理应用程序窗口.
`BowserWindow` 类的每个实例创建一个应用程序窗口，且在单独的渲染器进程中加载一个网页。可以通过主进程的实例对象 的 webContents 对象与网页内容进行交互

当一个 BowserWindow 实例被销毁，相应的渲染器也会终止，

## 渲染进程 
每个 BrowserWindow 都生成一个单独的渲染器进程，渲染进程只能操作网页内容，无权直接范围 require 或者 Nodejs API


## 预加载脚本
包含了要在渲染器进程执行，且先与网页内容开始加载的代码；
语境是隔离的，预加载器中可以和渲染器共享window但不能在预加载脚本中直接给window 下创建变量
```js
window.myAPI = {
  desktop: true
}
console.log(window.myAPI)
// => undefined
```
语境隔离（Context,ISOlation）意味着预加载脚本与渲染器的主要运行环境是隔离开来的，以避免泄漏任何具特权的 API 到您的网页内容代码中。

可以使用 `contextBridge` 模块来安全交互

```js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
})
const { contextBridge } = require('electron')

console.log(window.myAPI)
// => { desktop: true }

```

contextBridge 用途
1、通过暴露 ipcRenderer 模块于渲染器中，可以使用进程间通讯，让渲染器和主进程交互
2、给window 添加变量；

## 通知

在主进程中使用 Notification模块
在渲染进程中使用 HTML5 通知API 发送通知,使用当前运行中的系统原生API来显示


## 管理最近使用的文档
 Windows 和 macOS 分别通过 打开跳转列表和dock菜单使应用程序能够快速访问最近打开的文档列表

### 键盘快捷操作
允许为 Electron 应用该程序配置应用隔阂全局快捷键
1、 本地快捷键
  配置 MenuItem 的 accelerator 属性

2、全局快捷键
  使用 globalShortcon 模块来检测键盘事件
  ```js
globalShortcut.register('Alt+CommandOrControl+I', () => {
    console.log('Electron loves global shortcuts!')
  })
  ```
3、浏览器窗口内快捷键
 - 使用 webAPIs 监听 keyup
 ```js
function handleKeyPress(event) {
  // 你可以把处理按键按下事件的代码放在这里。
  document.getElementById("last-keypress").innerText = event.key;
  console.log(`你按下了 ${event.key}`);
}

window.addEventListener('keyup', handleKeyPress, true);
 ```
 - 在主进程中拦截
 ```js
 // 在调度页面中的keydown和keyup事件之前，会发出before-input-event事件。
win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i') {
      console.log('Pressed Control+I')
      event.preventDefault()
    }
  })
 ```

  - 使用第三方库
  
    [mousetrap](https://github.com/ccampbell/mousetrap)

### 网络探测

- 渲染进程使用 HTML5 API `navigator.onLine` `true/false`

## API

### Notification

```js
new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
```

### BrowserWindow 窗口管理模块
|  方法/属性   | 备注  |
|  :----:  | :----: |
| loadURL|加载网页|
|webContents|web上下文|
|setProgressBar(number)|设置进度条介于 0 和 1 之间的小数表示进度 -1 表示删除进度条|
|setRepresentedFilename|设置代表文件(没搞懂)|
|setDocumentEdited|设置文档编辑状态|


### app 
- 监听事件

|  名称   | 备注  |
|  :----:  | :----: |
|activate|监听应用处于激活状态|
|window-all-closed|监听所有窗口被关闭|

- 方法

|  名称   | 备注  |
|  :----:  | :----: |
|whenReady|主程序加载完成|
|addRecentDocument|添加一个文件到最近文件列表|
|clearRecentDocuments |清空最近文件列表|
|dock|mac macOS Dock 对象|
|dock.setMenu|设置mac macOS Dock 菜单|
|disableHardwareAcceleration|禁用GPU加速|



### Menu
|  名称   | 备注  |
|:----:|:----:|
|buildFromTemplate| 通过模版创建 menu|
|setApplicationMenu| 给 app 添加menu|

### contextBridge
 可以在 window 上添加新的API  配合ipcRenderer.invoke 触发主线程事件
  |  名称   | 备注  |
|:----:|:----:|
|exposeInMainWorld|给window上添加自定义事件|

### electron 环境变量
|  名称   | 备注  |
|:----:|:----:|
|process.platform|平台 darwin/|
|process.versions.chrome|chrome版本|
|process.versions.node|node版本|
|process.versions.electron|electron版本|

###  MediaStream API

- 媒体内容的流
- 一个流对象可以包含多轨道，包括音频和视频轨道等
- 能通过 WebRTC 传输
- 通过<Video> 标签播放


 navigator.mediaDevices.getUserMedia(MediaStreamConstrinats)
 // 返回Promise 成功后回调一个 MediaStream 实例对象
 参数 MediaStreamConstraints

 audio:Boolean | MediaTrackConstraints
 video: Boolean | MediaTrackConstraints
   - width 分辨率
   - height 分辨率
   - frameRate 帧率 比如 「ideal：10 max :15」
```js
// 捕获
         navigator.mediaDevices.getUserMedia({
   audio:true, // 捕获音频
   video:{
     // 最小，理想，最高的分辨率
     width:{min:1024, ideal:1280, max:1920},
     height:{min:576,ideal:720,max:1080},
     frameRate:{max:30} // 最大帧率
   }
 }).then(stream=>{
   // 播放
    var video = document.getElementById('video12')
    video.srcObject = stream
    video.onloadedmetadata = function(){
    video.play()
    }
 })

```

### 捕获桌面流
1、 提取chromeMeDiaSourceId
```js
desktopCapture.getSources({types:['window','screen']})
//提取chromeMeDiaSourceId
```
2、 捕获音视频
```js
navigator.webkitGetuserMedia({
  audio:false,
  video:{
    mandatory:{
      chromeMediaSourde:'desktop',
      chromeMediaSourceId:chromeMediaSourceId,
      width,
      height
    }
  }
})
```


## 最快捷的打包方式
```js
// npm install --save-dev @electron-forge/cli
// 使用其"import"命令设置 Forge 的脚手架：
npx electron-forge import
make 命令来创建可分发的应用程序
npm run make

```


### [robotjs 介绍](https://robotjs.io/docs/syntax)

- 控制鼠标键盘
- Node.js C++, add-on 库
- 支持 MAC Windows Linux

```js
npm install robotjs

// 鼠标移动
robot.moveMouse(x,y)

// 鼠标点击
robot.mouseClick([button],[double])

// 按键
robot.keyTap(key,[modifier])
// modifier（修饰键）：shift ctrl alt meta （win/command）
// 按键转换(vkey)
```

#### 编译原生模块（robotjs）
- 手动编译 
```js
npm rebuild --runtime=electron --disturl=https://atom.io/download/atom-shell --target=<electron版本> --bi=<对应版本abi>
npm rebuild --runtime=electron --disturl=https://atom.io/download/atom-shell --target=13.1.9 --abi=83

precess.versions.electron // 查看electron 版本
precess.version.node // 查看弄的版本找对应abi
```
- [abi对照表](https://github.com/mapbox/node-pre-gyp/blob/master/lib/util/abi_crosswalk.json)


- electron-rebuild 自动编译
 - npm install electron-rebuild --save-dev
 - npx electron-rebuild


 ### 浏览器端使用 websocket

 ```js
 var ws = new WebSocket('websocket地址')

 ws.onopen = function(e) {
   // websocket 成功建立回调
 }

 ws.onmessage = function (e) {
   // 收到服务端消息
   var data = e.data;
   console.log('received message '+ data)
 }

 ws.onclise = function(evt) {
   // 处理断开逻辑
 }

 ws.close()// 主动断开
 ws.send('hello') // 发送 支持 文本， blob，arrayBuffer

 ```


 ### 禁止应用躲开
 
 ```js

  const gotTheLock = app.requestSingleInstanceLock()

  if(!gotTheLock) {
    app.quit()
  } else {
    // 当运行第二个实例时，将会聚焦到 myWindow 窗口
    app.on('second-instance',(event, commandLine, workingDirectory)=>{
      showMainWindow()
    })
  }
 ```

 ### 窗口假关闭


 ### 托盘 Tray
// 创建
 tray  = new Tray('path/to/my/icon')
 - 保留 1倍（32*32） 2倍 64*64
 - windows 使用 ico
 - 大部分mac托盘是偏黑，Windows 是彩色

 // 弹出托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    {label:'显示‘， click:()=>{
      showMainWindow()
    }},
    {label:'退出'，role:‘quit’}
  ])

  tray.popUpContextmenu(contextMenu)
 
 'click'
 'right-click'
 'drop-file'
 'balloo-click' 托盘气泡被点击 widnows特性


 ## dialog
 - 用于打开和保存文件、警报等的本机系统对话框
 - dialog.showMessageBox
 - dialog.showOpenDialog
 - dialog.showSaveDialog
 - Promise 也支持 Sync 方法





 ## 生成安装包流程

 1、 下载二进制文件
  - Info.plist
  - Frameworks
  - Resources

 2、 添加业务代码
  - Resources

 3、 修改文件信息
   - *.app
   - Info.plist 修改信息
   - 设置图标

 4、 制作镜像
   - dmg-builder
   - nsis


## 打包工具选择

||electron-builder|electron-forge|
|:-:|:-:|:-:|
|签名|✅ ✅ ✅|✅ ✅ ✅|
|安装包类型|✅ ✅ ✅|✅ ✅ ✅|
|原生模版编译|✅ ✅ ✅|✅ ✅ ✅||
|定制化|✅ ✅ ✅|✅ |
|上手成本|✅ ✅ |✅ ✅ |
|boilerplate|❎|✅ ✅ ✅|
|跨平台构建|Linux windows|❎|
|社区活跃度|✅ ✅ ✅|✅ ✅ |
|场景|打包和发布的完整解决方案基本适用于所有场景|创建到发布的一体化解决方案，适合从0到1的项目|


### 软件图片准备
 - MAC
   - 软件图标，icns格式。通过image2icon 或者 iconutil 生成
   - dmg 背景图
   - 软件包图标 (非必需)
 - Windows
   - ico
   - installericon(非必需)
   - unInstallerIcon  (非必需)


### 通过 iconutil 生成 icns
- 准备 logo 图 1024 * 1024 的两倍图， png
- 生成从 12 到 1024的图片
- iconutil -c icns icons.iconset -o icon.icns

```sh
sips -z 16 16 icon.png --out icons.iconset/icon_16x16.png
sips -z 32 32 icon.png --out icons.iconset/icon_32x32.png
sips -z 32 32 icon.png --out icons.iconset/icon_16x16@2x.png
sips -z 64 64 icon.png --out icons.iconset/icon_32x32@2x.png
sips -z 64 64 icon.png --out icons.iconset/icon_64x64.png
sips -z 128 128 icon.png --out icons.iconset/icon_64x64@2x.png
sips -z 128 128 icon.png --out icons.iconset/icon_128x128.png
sips -z 256 256 icon.png --out icons.iconset/icon_128x128@2x.png
sips -z 256 256 icon.png --out icons.iconset/icon_256x256.png
sips -z 512 512 icon.png --out icons.iconset/icon_256x256@2x.png
sips -z 512 512 icon.png --out icons.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icons.iconset/icon_512x512@2x.png
sips -z 1024 1024 icon.png --out icons.iconset/icon_1024x1024.png
sips -z 2048 2048 icon.png --out icons.iconset/icon_1024x1024@2x.png




sips -z 16 16     icon.png --out icons.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icons.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icons.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icons.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icons.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icons.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icons.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icons.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icons.iconset/icon_512x512.png
sips -z 1024 1024   icon.png --out icons.iconset/icon_512x512@2x.png

```

```
iconutil -c icns icons.iconset -o icon.icns # 执行失败 icons.iconset:Failed to generate ICNS.
```


## 打包经验
- 产品发布时版本号需要升级，一般遵循 semver 语法， 可以使用 `npm version pack/minor/major` 管理
- Windows 下需要证书签名，否则可能被杀毒软件误杀
- Mac 下入锅没有证书签名，无法使用Electron 自动更新
- Window 下打包可以写 nsis 逻辑修改安装包
- 开源软件可以基于 Travis AppVeyor 持续集成



## 软件更新对比

|更新方式|手动更新|文件覆盖|自动更新|操作系统|
|:-:|:-:|:-:|:-:|:-:|
|优点|简单，稳定|下载过程快|稳定快打扰少|统一，稳定|
|缺点|过程繁琐、慢、影响使用、更新率低|实现复杂、稳定性差、写文件失败|实现复杂|受应用商店限制|
|适用场景|低频更新、用户粘性高、作为各种升级技术的降级方案|打补丁|高频更新软件、体验要求高|操作系统应用商店上架的软件|

### Mac 客户端更新
- 检查更新 =》 下载包 =》 安装包 =》 替换文件
```js
 const {autoUpdater} = require('electron)

 autoUpdater.setFeedurl('更新服务URL')

 autoUpdater.checkForUpdate()

 autoUPdater.quitAndInstall()

 // 监听事件  update-availavle 、 update-downloaded error
```


### windows 客户端更新
- 包准备
  - 安装包不能使用NSIS 需要使用 Squirrel
  - 更新需要Squirrel 配套的nupkg 包

- 客户端
  - npm i electron-squirrel-startup --save
   - 程序开始加上 if(rquire('electron-squirrel-startup)) return;  


## 日志监控

||开发|测试|上线|监控|
|:-:|:-:|:-:|:-:|:-:|
|web 侧|  代码镜头检查 <br> 强类型语言 <br> Code Review|单元测试<br>性能测试<br>UI自动化测试<br>冒烟测试|灰度发布<br>回滚|性能监控<br>异常监控<br>用户行为监控|
|Electron 侧| |+ Electron测试（Spectreon）|+功能开关<br>+热修复|+崩溃监控|

### 崩溃监控
#### 服务端
- 需要实现一个submitUrl POST接口，请求为multipart/form0-data 格式

  - ver String Electron 的版本
  - platform String 例如 win32
  - process_type String 例如 renderer
  - guid String 例如 ‘XXX-XXX-XXX-XXXXXXX’
  - _version String package.json 里的版本号
  -  _productName String  crashReporter options 对象中的产品名称
  - prod String  基础产品名字，这种情况下 是 Electron
  - _companyName String crashReporter options 对象中的公司名称
  - upload_file_minidump File minidump 格式的崩溃报告
  - All level one properties of the `extra` object in the `crashreporter` `options` object


#### 客户端 崩溃监控

- 初始化崩溃监控 crashReporter.start(options)
  - compayName
  - submitURL
  - extra (字符串，自定义数据，一般会上传用户信息，业务信息)

- 更新 extra 属性 crashReporter.addExtraParameter(key, value)
- 主进程和渲染进程都需要初始化


## 如何使用原生能力

<table>
<tr>
<td rowspan=2>
Node.js
</td>
<td>
原生 API
</td>
<td>
文件读写、操作系统、加解密
</td>
</tr>

<tr>
<td>
Node.j扩展
</td>
<td>
集成三方 C++库
</td>
</tr>


<tr>
<td rowspan=3>
Electron Native API
</td>
<td>
客户端GUI
</td>
<td>
右键菜单、窗口定制、系统托盘、Dock...
</td>
</tr>

<tr>
<td>
桌面环境集成
</td>
<td>
系统通知、剪切板、系统快捷键、文件拖放
</td>
</tr>

<tr>
<td>
设备 API
</td>
<td>
电源监视、内存、CPU、屏幕
</td>
</tr>

<tr>
<td rowspan=2>
OS

</td>
<td>
Applescript(macOS)
</td>
<td>
系统原生应用调用
</td>
</tr>
<tr>
<td>
WindowsRt

</td>

<td>
USB、蓝牙、预览文件
</td>
</tr>


</table>


### 开机自启动

https://github.com/Teamwork/node-auto-launch
### wait-on
- 等待命令
### concurrently 
命令并行

# 学习资料

- https://gitee.com/geektime-geekbang/geektime-electron
- [记账软件](https://blog.csdn.net/chenggedian7759/article/details/100985557?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-7.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-7.control)
- [scheme 唤起app](https://blog.csdn.net/dengdongxia/article/details/105906975)
- [websocket](https://websocket.org/echo.html)
- [electron-ablout-window]()