# Typescript
## 安装
```sh
npm install -g typescript
```
## 语法
- `:` 指定变了类型
- TypeScript 只会在编译时对类型进行静态检查，如果发现错误，编译时就会报错
- TypeScript 编译时即使报错了还是会生成编译结果

## 基础
- 原始数据类型
- 任意值
- 类型推论
- 联合类型
- 对象的类型-接口
- 数组的类型
- 函数的类型
- 类型断言
- 声明文件
- 内置对象



- 原始数据类型
  - boolean
  - number
  - string
  - null
  - undefined
  - Symbol (ES6)
  - BigInt (ES10)

  - 空值 void
  >   表示没有任何返回值的函数
  - Null Undefined
  ```ts
  let u:undefined = undefined;
  let n:null = null;
  ```
  与 `void`的区别是 `undefined` `null` 是所有类型的子类型。也就是说undefined 类型的变量，可以赋值给 number 类型的变量
  ```ts
  // 这样不会报错
  let u: undefind ;
  let num:number = u
  ```
  而 `void`类型的变量不能赋值给`number` 类型的变量
  ```ts
  let u:void;
  let num:number =u;
  // Type void is not assignable to type number
  ```


- 任意值
  > - 用来表示允许赋值为任意类型
  > - 声明一个变量为任意值之后，返回的内容的类型都是任意值
  > - 变量如果在声明的时候，未指定类型，那么他会被识别为任意类型

- 类型推论
   > -  如果没有明确的指定类型，那么TypeScript 会依照类型推论（Type Infoerence） 的规则推断出一个类型；
   > - 如果定义的时候没有赋值，之后不管有没有赋值，都会被推断成 `any` 类型而完全不被类型检查
- 联合类型
   - 联合类型（Union Types）表示取值可以为多种类型中的一种。
   - 联合类型使用｜分隔每个类型
   - 访问联合类型的属性或者方法，只能访问联合类型里共游的属性或方法
   - 联合类型的变量在被赋值时，会根据类型推论的规则推断出一个类型
  
- 对象的类型-接口
  - TypeScript 中我们使用接口 Interfaces 来定义对象的类型
  - 面向对象语言中，接口是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（class）去实现（impement）
  - TypeScript 中的接口是一个非常灵活的概念，除了可以对类的一部分行为进行抽象外，也常用于对【对像形状】进行描述 
  - 赋值的时候，变量的形状必须和接口的形状保持一致；
  - 可选属性`<name>?:<type>` 是给对象赋值时该属性可以不存在；
  - 不允许添加不存在的属性
  - 任意属性 `[propNmae:string]:<type>`; 任意属性取 `string` 类型的值；
  - 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型子集；
  - 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，可在任意属性中使用联合类型；
  - 只读属性 `readonly <name>: <type>` 只读属性只能在创建的时候好被赋值，
  - 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候；
- 数组的类型
  - 数组的定义方式

    1、 【类型+方括号】表示法
      - `let fibonacci: number[] = [1,1,2,2,]`
      - 数组项不允许出现其他的类型
      - 数组的一些方法的参数，也会根据数组在定义时的约定类型进行限制

    2、 数组范型 Array<elementType> 表示数组

    3、用接口表示数组 接口也可以用来描述数组，不常用
    ```ts
      interface NumberArray{
        
        [index:number]:number
      }
      let fibonacci:NumberArray= [1,1,2,3,5]
    ```
    NumberArray 表示 只要索引的类型时数字时，那么值的类型必须是数字；

    - 类数组
     - 类数组（Array-like Object） 不是数组类型比如 arguments,不能用普通的数组的方式来描述而应该用接口
     ```ts
       function sum (){
         // IArguments 是内置对象
         // let IArguments = arguments
         let args:{
           [index:number]:number;
           length:number;
           callee:Function;
         } = arguments
       }
     ```

     - any 在数组中的应用，用 any 表示数组中允许出现任意类型；
      ```ts
        let list:any[] = ['a',25,{website:'http'}]
      ```


- 函数的类型
  > 函数是JavaScript 中的一等公民
  - 函数声明 
    
    1、 函数声明 [Function Declaration] 
    ```ts
    function sum(s:number,y:number):number{
      return s+y
    }
    ```

    2、 函数表达式[Function Expression] 
    ```ts
    let mysum:(x:number,y:number)=>number =  function(x:number,y:number):number{
      return x+y
      }
    ```
      - TypeScript 类型定义中，`=>` 用来表示函数的定义 左边是输入类型，需要用括号括起来，右边是输出类型
      - TS6 中 `=>` 叫做箭头函数

  - 用接口定义函数的形状
    ```ts
     interface SearchFunc{
       (source:string,subString:string):boolean;
     }
     let mySearch:SearchFunc = function(source:string,subString:string){
       return source.search(subString)!==-1
     }
    ``` 
    - 采用函数表达式｜接口定义函数方式时，对等号左侧进行类型限制，可以保证以后函数名赋值时保证参数个数，参数类型，返回值类型不变；
  - 可选参数 <paramname>?:<type>  可选参数后面不允许再出现必选参数
  - 参数默认值 function a(firstName:string, lastName:string = 'cat'){return firstName+''+lastName} 添加了默认值的参数识别为可选参数，但是不受【可选参数必须接再必选参数后面的限制】
  - 剩余参数 `...rest` 获取函数剩余参数
    ```ts
     function push(array,...items){
       items.forEach(function(item){
         array.push(items)
       })
     }
     let a:any[] = [];
     push(a,1,2,3)
    ```
  - 重载
    - 重载允许一个函数接受不同数量或类型的参数时，做出不同的处理
    ```ts
     function reverse(x:number):number;
     function reverse(x:string):string;
     function reverse(x:number|string):number|string|void{
       if(typeof x === 'number'){
         return Number(x.toString().split('').reverse().join(''));
       }else if(typeof y === 'string'){
         return x.split('').reverse().join('')
       }
     }
    ```
    - Typescript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系需要优先把精确的定义写在前面

- 类型断言
- 声明文件
- 内置对象
