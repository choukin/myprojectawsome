## NODE 实战
1. 什么是 Node.js ?
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，它使用了一个事件驱动、非阻塞式 I/O 模型，轻量又高效。

2. Node.js 中运行的 JavaScript 与 Chrome 中运行的 JavaScript 有什么不同？
几乎没有不一样。不一样的点：1. Node.js 中没有浏览器 API, 例如 document, window. 2. Node.js 中有自己的 API.

## 第二章 技术预研
- BFE
  ![BFE](./image/BFE-backend-for-frontend.png)

- npm 大神
 - tjholowaychuk
 - Mafintosh
 - Dominictarr  


 ### 非阻塞I/O
 > I/O 即Input / Output 一个系统的输入输出
 > 阻塞IO 和非阻塞IO 的区别在于系统接受输入再到输出期间，能不能接收其他输入

 食堂排队打饭 VS 饭店点菜


 ### 异步编程 -- callback
 - 回调函数是规范
   - error-first callback
   - node-style callback

   - 每一个事件循环都是一个全新的调用栈

- 第一个参数是error 后面参数才是结果   

### Promise 
- 当前事件循环得不到的结果，但未来的事件循环会给你结果
- 是个状态机
  - pending
  - fulfilled / resolved
  - rejected

  - 执行then catch回返回一个新的promise，该promise最终状态根据 then catch 的回调函数的执行结果确定
    - 如果回调函数最终是 throw 该promise 最终是 rejected状态
    - 如果回调函数最终是 return 该promise 最终是 resolved状态
    - 但是如果最终return 了一个Promise 该promise 的状态会和回调函数return 的promise状态一致


 ### async/await
  - async function 是Promise 的语法糖封装   
  - 异步编程的终极方案， 以同步的方式写异步
    - await  关键字可以暂停 async function 的执行
    - await 关键字可以以同步的写法获取Promise的执行结果
    - try-catch 可以捕获await 所得到的错误

## 18 什么事HTTP服务器
 ### 一次网页请求包含两次包交换
   - 浏览器向HTTP服务器发送请求HTTP包
   - HTTP 服务器向浏览器返回HTTP 包


## 21 express   

## 22 koa
- 比exporess 更极致的 request/response简化
   - ctx.status = 200
   - ctx.body = 'hello'

- 使用 async function 实现中间件
 - 有暂停执行的能力
 - 在异步情况下也符合洋葱模型


 - koa VS express 
  - express 门槛低，koa更强大优雅
  - express 封装更多东西，开发速度快，koa可定制性更高

  ## RPC 通信
   - Remote Precedure Call（远程过程调用）
   - 与ajax相比不同点
     - 不一定使用DNS 寻址服务
     - 应用层协议一般不使用HTTP
     - 基于UDP或者TCP协议

     - TCP 通信
       - 单工通信
       - 半双工通信    
       - 全双工通信

     - 二进制协议
      - 更小的数据包体积
      - 更快的编码解码速率  



##24 Node.js Buffer编解码二机制数据包      


- protocol buffer 

  ```js
  protocol-buffers
  ```

 ##  25 Node.js net 搭建多路复用的RPC通道


