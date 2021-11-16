# 第二部分 函数

> javascript 中最关键的概念： 函数是第一类对象，或者说他们是一等公民。函数于对象共存

函数
1、能被变量引用
2、能以字面量形式声明
3、能作为函数参数进行传递


## 存储唯一函数集合

```js
var store = {
    nextId: 1,
    cache:{},
    add:function(fn){
        if(!fnid){
            // 给函数添加属性
            fn.id = this.nextId++
            this.catch[fn.id] = fn
            return true
        }
    }
}

```

### 自记忆函数
```js
function isPrime(value) {
    if(!isPrime.answers) {
        isPrime.answers = {}
    }
    if()
}
```

# 函数定义
## 四种创建函数方式
1、 函数声明和函数表达式 - 名称对于函数声明是必须有的， 对于函数表达式是可选的
```js
function myFunctionName(myArg){
myArg
}
// 作为表达式的一部分的函数（作赋值表达式的右值，或者其它函数的参数，或者函数的返回参数）

var a = function(){}
 myFunction(function(){}){
 return function(){}
 }

// 作为函数调用的一部分，命名函数表达式会被立即调用
 (function namedFunctionExpression(){

 })()
// 立即表达式奇怪的写法
 (function(){}(3))
 +function(){}();
 -function(){}();
 !function(){}();
 ~function(){}();

```
2、 箭头函数

```js
param => expression

```
3、 函数构造函数

```js
new Function('a','b', 'return a+b')
```

4、 生成器函数


### 函数的实参和形参
- 形参（parameter） 是定义函数时列举的变量
- 实参（argument）是调用函数所传递给函数的值

  - 实参大于形参数量时不会报错；
  - 形参数量大于shi can

