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
 全双工通信通道搭建
 - 关键在于应用层协议需要标记包号的字段
 - 处理以下情况，需要有标记包长的字段
   - 粘包
   - 不完整包
  - 错误处理


## 27 
nodemon 自动检测代码修改重启
```sh
# sudo npm i -g nodemon
nodemon index.js

```

## 28 模版渲染
 - include 子模版
 - xss过滤 模版helper函数

 ## 29 模版引擎

 ## 31 API 服务
 ### RESTful
 - 简单易懂
 - 可以快速搭建
 - 在数据聚合方面有很大的劣势

 ### GraphQL
 - 专注数据聚合，前端想要什么就返回什么

 ## 32 GraphQL
 - FaceBook 开发的实现API的库
   - 让前端有自定义查询数据的能力


   ## 34 列表页面解析
   - 后端需要渲染列表
     - 首屏加速
     - SEO
   - 前端也需要渲染列表
     - 无刷新过滤、排序  

  - 前后端同构
   - 同一个模版/组件，可以浏览器渲染，也可以在Node.js 渲染  

  ## 35 前后端同构

  - ReactDomServer.renderToString()

  - VueServerRender.renderToString()

  - React/Vue 同构最大的难题是数据部分


  - 同构的关键
    - 注重职责的分离



## 36 HTTP 服务性能测试
### 压力测试工具
 - ab
   ```sh
   ab -c200 -n1600 http://127.0.0:3000/download  
   #200 个客户端 1600 次请求
   # Transfer rate: 传输速率
   # Requests per second:  吞吐率
   ```
   
 - webbeanch

 ### 找到性能瓶颈 cpu 内存 硬盘 后端
 - top 
 - iostat 


## 38 Node.js 性能分析工具
- 工具
  - Node.js 自带profile
  ```sh
  node --prof entry.js
  ab -c6 -t15 http://127.0.0:3000/download 

  # 分析文件
  node --prof-process **.log > profile.txt
  ```

  ticks CUP的tick数量
  total 占用比


  - Chrome devtool
  ```sh
  node --inspect-brk server/index.js
  ## 打开 chrome 输入 chrome://inspect/#devices
  ab -c6 -t15 http://127.0.0:3000/download 

  ```

- [CLinic.js](https://www.npmjs.com/package/clinic)

## 39 JavaScript 代码性能优化
- 计算性能优化的本质
  - 减少不必要的计算
  - 空间换时间 缓存
  思考： 在用户能感知到的时间里，这个计算是否是必要的

-  Node.js HTTP 服务性能优化准则
 - 提前计算 把服务阶段的计算放到启动阶段


 ## 内存管理
  - 垃圾回收
   - 内存优化管理
    - 新生代
      - 容量小，垃圾回收更快
    - 老生代
     - 容量大，垃圾回收更慢

   - 减少内存使用，也是提高服务性能的手段
     - Node.js Buffer 的内存分配策略 缓存池
      - 小于8kb 
      - 大于8kb
       
   - 如果有内存泄漏，会导致服务性能大大降低  


   ## 41 Node.js C++ 模块优化 代码
    - bindings 自动判断 c++ 模块路径
    - node-gyp 编译c++ 模块
    ```sh
    # 编译
    node-gyp rebuild
    ```
    - 推荐使用 N-API

    - C++ 插件
      - 将计算量转移到C++ 进行
        - 收益 C++ 元算比 JavaScript 更快的部分
        - 成本 C++ 变量和 V8 变量的转换


## 42 多进程优化，子进程与线程

### 子进程与线程
- 进程
  - 操作系统挂载运行程序的单元
  - 拥有一些独立的资源，入内存等

- 线程（比进程更小的单元）
 - 进行远算调度的单元
 - 进程内的线程共享进程内的资源

- 一个进程可以有多个线程

- 进程类似 公司
- 线程类似 职员

- Node.js 的事件循环
 - 主线程运行 v8 与 javascript
 - 多个子线程通过事件循环被调度

- 使用子进程或线程利用更多CPU资源


## 42 多进程优化：Node.js cluster 模块实战与源码解读
> 利用cluster 可以快速创建多核能力的网络服务

## 44 Node.js 进程守护与管理
- Node.js 的稳定性


## 架构优化 动静分离
- 静态内容
  - 基本不会变动，也不会因为请求参数的不同而变化
  - -》CDN 分发，HTTP 缓存等

- 动态内容
  - 各种因为请求参数的不同而变动，且变种的数量几乎不可枚举。 
  - ->用大量的源机器承载，结合反向代理进行负载均衡 

- 动静分离例子

## 45 反向代理与缓存服务
- 路径代理

- 负载均衡

- 缓存

- redis 内存存储


稳定性，门槛降低

## 47 框架设计和工程化
- 做一个 Node.js 业务并不难
   - 写demo
   - 在一个小业务尝试上线

- 问题？
 - 把Nodejs推广到所有业务线
   - 人员培训
   - 业务管理

- 给工程师使用的产品
  - 开发体验
   - 可维护性
   - 可靠性
   - 易用性
   - KISS 原则 渐进式

48 设计模式
- 单例模式
- 原型模式
- 工厂模式
- 抽象工厂模式
- 建造者模式
- 代理模式
- 适配器模式
- 桥接模式
- 装饰模式
- 外观模式
- 享元模式
- 组合模式
- 模版方法模式
- 策略模式
- 命令模式
- 指责链模式
- 状态模式
- 观察者模式
- 中介者模式
- 迭代器模式
- 访问者模式
- 备忘录模式
- 解释器模式

- 适用于jiavascript的模式
  - `观察者模式`
     -  EventEmitter
     -  DOM addEventListener
  - `外观模式`
    - jQuery

- 设计模式六大法则
  - `单一职责原则`
  - 里氏替换原则
  - 依赖倒转原则
  - 接口隔离
  - 最小知晓原则
  - `开闭原则`     
    - 鼓励扩展程序
    - 避免修改程序
    - webpack loader


## 49 Serverless    
 - 云函数
    - 不用再因为运维架构，的事情操心
      - 缩短业务上线周期
      - 减少出错的概率
      - 业务开发的上手难度更低
    - 渐进式

 - Serverless 屏蔽服务器细节
   - Node.js BFF 层应用到大部分的业务
   - 快速扩展Node.js 业务页面
   - 新人能不理会底层细节快速上手


 - less 思想 屏蔽细节 让开发更容易
   - 把能在多个业务服用的东西下沉（抽离代码库），屏蔽细节，实现渐进式

 - Vue/React  domless
  - 屏蔽Dom 操作
    - 缩短代码编写周期
    - 减少出错可能性
    - 前端开发的上手难度更低

- jQuery competless
  - 屏蔽浏览器兼容细节
    - 缩短代码编写周期
    - 减少出错可能
    - 前端开发的上手难度更低    


## 50 koaless
  



 
















  