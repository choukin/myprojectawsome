# [七天学会Node.JS](http://nqdeng.github.io/7-days-nodejs/)


## 把JS文件当作shell脚本来运行

1. 通过在js文件中添加`#!` 注释来指定当前脚本使用的解析器。NodeJS 会忽略掉首行的 `#!` 注释
```sh

#! /usr/bin/env node
```

2. 对js文件进行授权 文件执行权限

```sh
chmod +x /home/user/bin/node-echo.js
```

3. 在PATH 变量中指定某个目录，例如`user/local/bin` 下创建一个软链文件，文件名与我们希望使用的终端命令相同

```sh
sudo ln -s /home/user/bin/node-echo.js /user/local/bin/node-echo
```


## 文件操作

> `process` 是nodeJS的全局变量，可以通过 `process.argv` 获得命令行参数。  `argv[0]` 固定等于NodeJS执行程序的绝对路径，`argv[1]` 固定等于主模块的绝对路径，因此第一个命令行参数从`argv[2]` 开始获取

### API

#### Buffer
JS 语言自身只有字符串数据数据类型，没有二进制数据类型， NodeJS 提供的`Buffer` 可以对二进制进行操作。除了可以读取文件得到的Buffer外，还能直接构造，可以操作任意二进制数据
- 字符串不可变修改会得到新的字符串，Buffer更像可以做指针操作的C语言数组，可以用[index]修改某个字节
- 项拷贝一份Buffer需要先创建一个新的Buffer，并通过copy方法把原来Buffer中的数据复制过去，类似申请一块新的内存，并把已有内存数据复制过去


### Stream 数据流

当内存无法一次处理数据时，或一边读取一边处理更加高效时，需要用到数据流。NodeJS 提供了各种 `Stream` 来提供对数据流的操作。

> Stream 基于事件机制工作，所有 `Stream` 的实例都继承NodeJS 提供的 EventEmitter


### File System 文件系统
NodeJS 通过内置模块`fs` 来操作文件，API基本分三类

- 文件属性读写
  - `fs.stat` `fs.chomd` `fs.chown` etc.

- 文件内容的读写
  - `fs.readFile` `fs.readdir` `fs.writeFile` `fs.mkdir` etc.  

- 底层文件操作
  - `fs.open` `fs.read`  `fs.write` `fs.writeFile` `fs.mkdir` etc.

NodeJS 最精华的异步IO模型在 `fs` 模块里有重复的体现，


### Path 路径

NodeJS 的 `path` 路径模块可以简化路径相关操作。并提升代码可读性。

- `path.normalize`
   将传入的路径转换为标准路径，具体, 除了解析路径中的 `.` `..`外， 还能去掉多余的斜杠。

- `path.join`
   多路径拼接

- `path.extname`
    获取路径扩展名   
    

## 遍历目录
### 递归算法
 需要考虑性能时，需要把递归算法转换为循环算法，来减少函数调用次数。


## 文本编码

`UTF8`文件还有可能带BOM， 

### BOM
- BOM 用于标记一个文本文件使用Unicode编码，本身是一个unicode字符("\uFEFF"),位于文本文件头部，在不同的Unicode编码下，BOM字符嘴硬的二进制字节如下

|Bytes|Encoding|
|:-:|:-:|
|FE FF|UTF16BE|
|FF FE|UTF16LE|
|EF BB BF|UTF8|


## 网络操作

-  在Linux系统下，监听1024以下端口需要root权限。因此，如果想监听80或443端口的话，需要使用sudo命令启动程序。

### http 模块
提供两种使用方式
- 作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应
- 作为客户端使用时，发起一个HTTp客户端请求，获取服务端响应
S
### https 

`https` 与 `http` 模块类似，https 需要 SSL 证书

```js
const options = {
    key:fs.readFileSync('./ssl/default.key),
    cert:fs.readFileSync('./ssl/default.cer)
}
const server  = https.createServer(options, function(request, response){

})
```

### SNI 技术 根据https客户端请求使用的域名动态使用不同的证书，一个https 服务可以给多个域名提供服务

```
server.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.com.key'),
    cert: fs.readFileSync('./ssl/bar.com.cer')
});
```


## URL

`url`模块，可以解析url 生成url 拼接url

```
            href
  -------------------------------------
                               host                       path 
                           --------------    ---------------------------------

  http:   //  user:passs @  host.com : 8080   /p/a/t/h  ?query=string  # hash
  ----        ----------   ----------  ----   --------  -------------  ------- 
protocol       auth         host        port   pathname      search      hash

                                                           ----------
                                                            qeury     
```


### querystring 
用于实现URL 参数字符串与参数对象的花香转换
- querystring.parse
- querystring.stringify


### zlib

`zlib` 模块提供了数据压缩和解压的功能，当我们处理HTTP请求和响应时，可能需要用到这些模块

### Net
`net` 模块，可用于创建socket服务器或Socket客户端


## 进程管理


NodeJS 可以感知和控制自身进程的运行环境和状态，也可以创建子进程并与其协同工作，这使得NodeJS 可以把多个程序组合在一起共同完成某项工作，并在其中充当胶水作用。
    linux root 权限才能监听 1024 以下的端口 完成监听后需要把权限降下来
    系统管理授权每个进程使用一个给定的UI（USER Ientification）标识符,
    每个被启动的进程都有一个启动该进程的用户UID，
    子进程拥有和父进程一样的UID
    用户可以时某个组的成员，每个组也有一个GID（GROUP Ientification）标识
    如果通过sudo 获取的root权限，运行程序的UID和GID保存在环境变量SUDO_UID SUDO_GID里面
    如果是通过 `chomod +S` 获取的root权限，程序可以通过 process.getuid / process.getgid 方法获取。
    process.setui 和 process.gid 方法只接受 number 类型的参数。
    降权时必须先降GID再降UID 顺序反过来就没有权限更改程序的GID


## 异步编程

NodeJS 最大卖点--- 事件机制和异步IO，对开发者并不是透明的。开发者需要按异步方式编写代码才能用的上这个卖点。没有掌握异步编程就不能说真正学会了NodeJS

### 回掉

JS本身时单线程运行的，不可能一段代码还未结束运行时去执行其他代码，因此就不存在异步执行的概念。

但是如果某个函数做的事情就是创建一个别的线程或进程，并与JS主进程并行做一些事情，并在事情做完后通知JS主线程，就会是异步。

#### NodeJS的异步API
- setTimeOut
- setInterval
- fs.readFile 等


### 异常处理

异常回沿着代码路径一直冒泡，直到遇到第一个try语句时被捕获，但由于异步函数会被打断代码执行路径，异步函数执行过程中以及执行后产生的异常冒泡到执行路径被打断的位置时，如果一直没有遇到try 就作为一个全局异常抛出。

 ```js
 function async(fn,callback) {
    setTimeout(()=>{
        callback(fn())
    }, 0)
}

try {
    async(null,function(data){

    })
} catch (err) {
    console.log('Error:%s', err.message);
}

// file:///Users/lepu/code/playground/myprojectawsome/diy/nodedemo/sevendaynode/async/error.mjs:3
//         callback(fn())
//                  ^

// TypeError: fn is not a function
//     at Timeout._onTimeout (file:///Users/lepu/code/playground/myprojectawsome/diy/nodedemo/sevendaynode/async/error.mjs:3:18)
//     at listOnTimeout (node:internal/timers:564:17)
//     at process.processTimers (node:internal/timers:507:7)

 ```


