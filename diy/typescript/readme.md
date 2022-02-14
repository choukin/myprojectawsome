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
  > 类型断言 （Type AsserTion） 可以用来手动指定一个值的类型
  - ### 语法
  ```
  1: 值 as 类型
  2: <类型>值
  ```
  在 tsx 语法中必须使用前者即 `值 as 类型`也是ts比较推荐的
  - ### 类型断言的用途
    - 1、将一个联合类型断言为其中一个类型
    - 2、将一个父类断言为更具体的子类
    - 3、将任何一个类型断言为 `any`
    - 4、将any断言为一个具体的类型

  - ### 类型断言的限制
    - 联合类型可以被断言为其中一个类型
    - 父类可以被断言为子类
    - 任何类型都可以被断言为 any
    - any 可以被断言为任何类型
    - 要使得`A`能够被断言为`B` 只需要`A`兼容`B` 或 `B`兼容 `A`即可
    
    #### 并不是任何一个类型都可以被断言为任何另一个类型
      > TypeScript 是类型结构系统，类型之间对比只会比较他们最终的结构，而会忽略他们定义时的关系
  - ### 双重断言 `cat as any as Fish`
      > 除非迫不得已，千万别用双重断言
  - ### 类型断言 VS 类型转换
  - ### 类型断言 VS 类型声明
  - ### 类型断言 VS 范型
     

- 声明文件
  > 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全，接口提示等功能；
  - 新语法索引
    - `declare var` 声明全局变量
    - `declare function` 声明全局方法
    - `declare class` 声明全局类
    - `declare enum` 声明全局们聚类型
    - `declare namespace` 声明（含有子属性）全局对象
    - `interface` 和 `type` 声明全局类型
    - `export` 导出变量
    - `export namespace` 导出（含有子属性的）对象
    - `export default` ES6默认导出
    - `export = commonjs` 导出模块
    - `export as namespace` UMD库声明全局变量
    - `declare global` 扩展全局变量
    - `declare module` 扩展模块
    - `///<reference>` 三斜线指令

  > 声明文件必须以`.d.ts` 为后缀
   如果没有自动解析.d.ts 可以检查下 `tsconfig.json` 中的`files` `include` `exclude` 配置确保其包含了 `.d.ts` 文件

  - 第三方声明文件
    使用[types](https://www.typescriptlang.org/dt/search/)统一管理第三方库的声明文件
  - 书写声明文件
    当第三方库没有提供声明文件时，我们就需要自己书写声明文件;
    不同场景下，声明文件的内容和使用方式会有区别；
    #### 库的使用场景有一下几种
     - 全局变量：通过<script> 标签引入第三方库，注入全局变量
     - npm包： 通过 `import foo from 'foo'` 导入，符合ES6 模块规范
     - UMD库： 既可以通过<script>标签引入，又可以通过`import` 导入
     - 直接扩展全局变量： 通过<script> 标签引入后，改变一个全局变量的结构
     - 在npm 包或者UMD库中扩展全局变量：引用npm包或UMD库后，改变一个全局变量的结构
     - 模块插件： 通过<script> 或者`import` 导入后，改变另一个模块结构

     ##### 全局变量
      -  声明文件中 declare namespace 比较常用，用来表示全局变量是一个对象，包含很多子属性；
      - declare namespace 内部我们直接使用function 来声明函数而不使用 declare function  类似可以使用 const class enum
      - 嵌套的命名空间：如果对象拥有深层的层级，则需要用嵌套的 namespace 来声明深层的属性的类型；
      - interface type
      - 防止命名冲突， 暴露在最外层的 interface 和 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量，最好把他们放到 namespace 下；
      - 声明合并，假如 jQuery 即是一个函数，又是一个对象，那么我们可以组合多个声明语句，他们会不冲突的合并到一起；
    #### npm 包
      npm 包的声明文件可能存在于连两个地方：
       - 1、与npm包绑定在一起，判断依据是 package.json 中有 types字段，或者有一个index.d.ts 声明文件。这种模式不需要额外安装其他包，最为推荐，自己的npm包最好声明文件与npm包绑定到一起
       - 2、发布到 @types 里 `npm install @types/foo --save-dev`
       - 假如以上两种方式都没有找到对应的声明文件，那么我们需要自己为它写声明文件，由于是通过import 语句导入的模块，所以声明文件存放的位置也有约束，一般有两种方案
        - 1、 创建一个 node_modules/@types/foo/index.d.ts 文件，存放foo模块的声明文件，这种方式不需要额外的配置，一般只用作临时测试。
        - 2、 创建一个types目录专门写自己的声明文件， 将 foo 的声明文件放到 types/foo/index.d.ts 中，这种方式需要配置下 tsconfig.json 中的paths和baseUrl字段
        ```sh
        /path/to/project
        ├── src
        |  └── index.ts
        ├── types
        |  └── foo
        |     └── index.d.ts
        └── tsconfig.json
        ```
        tsconfig.json 内容
        ```sh
        {
          "compilerOptions":{
            "module":"commonjs",
            "baseUrl":"./",
            "paths":{
              "*":["types/*"]
            }
          }
        }
        ```
        npm 包的声明文件有一下几种语法
          - export 导出变量
          - export namespace 导出对象
          - export default ES6默认导出
          - export = commonjs 导出模块

          ##### export 
            npm 包的声明文件与全局变量的声明文件，有很大区别，在npm包的声明文件中，使用declare 不会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这类型声明。
            export 语法与普通的ts中的语法类似，区别仅在于声明文件中禁止定义具体的实现；

          ##### 混用declare 和 export
           可以使用declare 声明多个变量，最后用export 一次性导出；  

          ##### export default 
            在ES6模块系统中，使用 export default 可以导出一个默认值，使用方可以用 import foo from 'foo' 而不是 import {foo} from 'foo' 来导入这个默认值；
            在声明文件中，export default 用来导出默认值的类型；注意：function class interface 可以直接导出，其他变量需要先定义出来再默认导出；

          ##### export = 
           在commonjs规范中，我们用一下方式导出模块
           ```js
            module.exports = foo;
            exports.bar = bar;
           ```  
           ts 针对这种模块导出，有多种方式可以导入
             - 1、 const foo = require('foo')
             - 2、 import * as foo from 'foo' import {bar} from 'foo'
             - 3、 import  ... require  ts 官方推荐的方式
              ```js
                import foo = require('foo');

                import bar = foo.bar
              ```
              对于使用commonjs 规范的库，假如要为它写类型声明文件，需要使用 export = 这种语法；
              ```js

              export = foo;
              declare function foo():string;
              declare namespace foo{
                const bar: number;
              }
              ```

           ### UMD 库
            即可以通过 <script> 标签引入，又可以通过 import 导入的库，称为UMD库。相比npm包的类型声明文件，我们需要额外声明一个全局变量，`export as namespace`   
            
           ### 直接扩展全局变量
            有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致ts编译错误，此时，就需要扩展变量的类型；比如扩展string类型；
            ```js
            // types/jquery-plugin/index.d.ts
            declare namespace JQuery {
                interface CustomOptions {
                    bar: string;
                }
            }

            interface JQueryStatic {
                foo(options: JQuery.CustomOptions): string;
            }
            ```
            ```js
              // src/index.ts

              jQuery.foo({
                  bar: ''
              });
            ```
           
           #### 在npm 包或UMD 库中扩展全局变量
            如之前所说，对于一个npm包或者UMD库的声明文件，只有export导出的的类型声明才能被导入。所以对于npm 包或者UMD库，如果导入此库之后会扩展全局变量，则需要使用另一种语法在声明文件中扩展，全局变量的类型，那就是 `declare global`

            ```js
          // types/foo/index.d.ts
              declare global {
                  interface String {
                      prependHello(): string;
                  }
              }
              // 即使此声明不需要导出任何东西，仍然要导出一个空对象，用来告诉编译器，这是一个模块声明文件，而不是一个全局变量的声明文件；
              export {};
            ```

            ```js
            // src/index.ts

            'bar'.prependHello();
            ```

            ### 模块插件
            有时候通过import 导入的一个模块插件，可以改变另一个原有模块的结构。此时，如果原有模块，已经又了类型声明文件，而插件模块没有类型声明文件，就会导致类型不完整，缺少部分类型；
            `declare module`
            要扩展愿模块，需要在类型声明文件中引用原有模块，再使用declare module 扩展原模块
            ```js
            // types/moment-plugin/index.d.ts
              import * as moment from 'moment';
              declare module 'moment'{
                export function foo():moment.CalendarKey;
              }
              
            ```
            在一个文件中一次声明多个模块的类型
            ```js
            // types/foo-bar.d.ts

            declare module 'foo' {
                export interface Foo {
                    foo: string;
                }
            }

            declare module 'bar' {
                export function bar(): string;
            }
            ```
            ### 声明文件中的依赖
             一个声明文件有时会依赖另一个声明文件中的类型，比如之前的 declare module

            ### 三斜线指令
             三斜线指令单体import 的场景
             - 1、当我们书写一个全局变量的声明文件时
             ```ts
              // types/jquery-plugin/index.d.ts

              /// <reference types="jquery" />

              declare function foo(options: JQuery.AjaxSettings): string;
             ```
             三斜线必须写在，文件的最顶端，三斜线指令的前面只允许出现单行，或多行注释
             - 2、 当我们需要依赖一个全局变量的声明文件时
              当我们需要依赖一个全局变量的声明文件时，由于全局变量不支持通过import 导入，当然也就必须使用三斜线来引入
              ```js
              // types/node-plugin/index.d.ts

              /// <reference types="node" />

              export function foo(p: NodeJS.Process): string;
              ```

             ### 拆分声明文件
             当我们全局变量的声明文件太大时，可以通过拆分为多个文件，然后在一个入口文件中将他们一一引入，来提高代码的可维护性 
            ```js
            // node_modules/@types/jquery/index.d.ts

            /// <reference types="sizzle" />
            /// <reference path="JQueryStatic.d.ts" />
            /// <reference path="JQuery.d.ts" />
            /// <reference path="misc.d.ts" />
            /// <reference path="legacy.d.ts" />

            export = jQuery;
            ```

            ### 其他三斜线指令
            `///<reference no-default-lib="true">`
            `///<amd-module/>` 等，已经废弃

            ### 自动生成声明文件
             如果库的源码本身就是由 ts写的，那么使用tsc脚本将ts编译为js的时候，添加declaration 选项，就可以同时也生成.d.ts 文件
             命令行中添加 --declaration 简写 -d 或者在 tsconfig.json 中添加配置
             ```js
             {
               "compilerOptions":{
                 "module":"commonjs",
                 "outDir":"lib",
                 "declaration":true
               }
             }
             ```

             - declarationDir 设置生成.d.ts 文件的目录
             - declarationMap 对每个 .d.ts 文件 都生成对应的 .d.ts.map 文件
             - emitDeclarationOnly 仅生成.d.ts 文件，不生成.js 文件

             ### 发布声明文件

- 内置对象
内置对象是指根据标准在全局作用域 上存在的对象，这里的标准是指 ECMAScript 和其他环境 DOM的标准

  - ECMAScript 内置对象
    - Boolean
    - Error
    - Date
    - RegExp
    - [等等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)
  
  - DOM 和 BOM 的内置对象
    - Document
    - HTMLElement 
    - Event 
    - NodeList  
    - [TypeScript 核心库定义文件](https://github.com/Microsoft/TypeScript/tree/main/src/lib)
     
   - 用 TypesScript 写 Node.js 
     Node.js 不是内置对象的一部分，如果想要用TypeScript 写 Nodejs 需要引入第三方声明文件
     ```sh
      npm install @types/node --save-dev
     ```
## 进阶
 - 类型别名
 - 字符串字面量类型
 - 元组
 - 枚举
 - 类
 - 类与接口
 - 范型
 - 声明合并
 - 扩展阅读

 ### 类型别名 type
  类型别名给一个类类起个新的名字,类型别名常用于联合类型；

### 字符串字面量类型 type
  字符串字面量类型用来约束取值只能是某几个字符串中的一个。

### 元组
  数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象
  - 当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
  - 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型；

### 枚举
枚举（Enum）类型用于取值被限定在一定范围的场景；
```ts
  enum Days {Sun, Man, Tue, Wed, Thu, Fri, Sat}
```
```js
// 编译结果
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
```
- 枚举成员会被赋值为从0 开始递增的数字，同时也对枚举值到枚举名进行方向映射
- 手动赋值， 未手动赋值的枚举项会接着上一个枚举项递增；
- 未手动赋值的枚举项与手动赋值的重复了，TS不会察觉；
- 手动赋值的枚举项也可以为小数，或负数，此时后续未手动赋值的项，递增步长仍为1；

#### 常数项和计算所得项
枚举有两种类型： 常数项（constant member）和计算所得项（computed member）
```ts
enum Color {Red, Green, Blue = "blue".length};
```
- 如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错；
- 当满足下面条件时，枚举成员被当作是常数
  - 不具有初始化函数，并且之前的枚举成员是常数。在这种情况下，当前枚举成员值为上一个枚举成员的值加1，但第一个枚举元素是例外，如果它没有初始化方法，那么它的初始值为0；
  - 枚举成员使用常数枚举表达式初始化。常数枚举表达式是TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数表达式：
    - 数字字面量
    - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用；
    - 带括号的常数枚举表达式
    - + - * / << >> >>> & | ^ 二元元算符 常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后 为 NaN 或 Infinity 则会在编译阶段报错；

    所有其他情况的枚举成员被当作是需要计算得出的值；

#### 常数枚举
- 常数枚举是使用 const enum 定义的枚举类型；
  常数枚举与普通枚举的区别是，它会在编译阶段被删除，并切不能包含计算成员；

#### 外部枚举
外部枚举（Ambient Enums） 是使用 `declare enum` 定义的枚举类型；  

```ts
// declare const enum Directions {
declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
```

外部枚举与声明语句一样，常出现在声明文件中；

### 类
传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。 ES6 使用class
#### 类的概念
- 类 定义了一件事物的抽象特点，包含它的属性和方法
- 对象 类的实例 通过 new 生成
- 面向对象 的三大特性 封装 继承 多态
- 封装：Encapsulation 将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部数据；
- 继承 Inheritance : 子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性；
- 多态 Polymorphism 由继承而产生了相关不同的类，对同一个方法可以有不同的响应，比如 Cat 和Dog 都继承自 Animal 但是分别实现了自己的eat方法，此时针对某一个实例，我们无需了解它是Cat还是Dog，就可以直接调用eat 方法，程序会自动判断出来如何执行eat
- 存取器（getter & setter）用以改变属性的读取和赋值行为；
- 修饰符 Modifiers: 修饰符是一些关键字，用于限定成员或类型的性质，比如 public 表示公有属性或方法；
- 抽象类 Abstract Class 抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中实现
- 接口 Interfaces: 不同类之间公有属性或方法，可以抽象成一个接口。接口可以被类实现（implements）一个类只能继承自另一个类，但是可以实现多个接口；

#### ES6 中类的用法

- 属性和方法
  - 使用class 定义类，使用Constructor 定义构造函数
  - 通过new 生成新实例的时候会自动调用构造函数；
- 类的继承
- 存取器
- 静态方法

#### ES7 中类的用法
- 实例属性
 ES6中实例的属性只能通过构造函数中 this.xxx 来定义，ES7题案中可以直接在类里定义
 ```ts
  class Animal{
    name = 'Jack';
    constructor() {
      // ... 
    }
  }
  let a = new Animal();
  console.log(a.name);
 ```

 - 静态属性 使用 static 定义一个静态属性；
 ```ts
 class Animal {
   static num = 42;
   constructor(){
     /// ... 
   }
 }

 console.log(Animal.num)
 ```

 #### Typescript 中类的用法
 - public private 和 protected
  TypeScript 可以使用三种访问修饰符（Access Modifiers）,分别是 public private 和 protected；
    - public 修饰的属性或方法是公有的，可以在任何地方被使用，默认所有的属性和方法都是public的；
    - private 修饰的属性或方法是自由的，不能在声明它的类的外部被访问；
    - protected 修饰的属性或方法是受保护的，它和private类似，区别是它在子类中也是允许被访问的；

    - 当构造函数修饰为 private 时， 该类是不允许被继承或者是实例化；
    - 当构造函数修饰为 protected 时，该类只允许被继承；

- 参数属性
 修饰符和 readonly 还可以使用在构造函数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁；

- readonly
 只读属性关键字，只允许，出现在属性声明或索引前面或构造函数中；
 注意如果 readonly和其他访问修饰符同时存在的话，需要写在其后面；
 ```ts
  class Animal{
    public constructor(public readonly name) {

    }
  }
 ```

 #### 抽象类
 abstract 用于定义抽象类和其中的抽象方法；
 - 抽象类是不允许被实例化的；
 - 抽象类中的抽象方法必须被子类实现；

 #### 类的类型
 ```ts
 class Animal{
   name: string;
   constructor(name: string){
     this.name = name
   }
   sayHi():string{
     return `My name is ${this.name}`
   }
 }

 let a: Animal = new Animal('Jack');
 console.log(a.sayHi());
 ```

 ### 类与接口
 接口 interfaces 的用途
 - 对 对象的形状进行描述
 - 对类的一部分行为进行抽象；

 #### 类实现接口

 实现 implements 是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间有一些共有的特性，这时候就可以把特性提取成接口，用implements 关键字来实现；这个特性提高了面向对象的灵活性；
 - 一个类可以实现多个接口
 - 接口可以继承接口

- 接口可以继承类 TS中独有的特性；本质是接口继承接口（把类当作一个对对象形状的描述）；只会继承实例属性和方法；不包括构造函数，静态属性，静态方法；

### 泛型
 泛型 Generics 是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再制定类型的一种特性；

#### 泛型约束
 在函数内部使用泛型变量的时候，由于事先不知道它是那种类型，所以不能随意的操作它的属性或方法；
 ```ts
 // 只允许这个函数传入那些包含length属性的变量，
 inteface Lengthwise{
   length:number;
 }
 function loggingIndentity<T extends Lengthwise>(arg:T){
   console.log(arg.length);
   return arg;
 }
 //  多个类型参数之间也可以互相约束
 // T 继承U 保证U 上不会出现T中没有的字段；
 function copyFields<T extends U, U>(target:T, source:U):T{
   for(let id in source) {
     target[i] = (<T>source)[id]
   }
   return target;
 }
 ```

#### 泛型接口
可以使用(有泛型)接口来定义一个函数需要符合的形状
 ```ts
 interface CreateArrayFunc{
   <T>(length:numberm,value:T):Array<T>;
 }
 let crateArray:CreateArrayFunc;
 createArray = function<T>(length:number, value: T):Array<T>{
   let result:T[] = [];
   for(let i=0;i<length;i++>){
     result[i] = value;
   }
   return result;
 }
 ```
 进一步，可以把泛型参数提前到接口名上
  ```ts
 interface CreateArrayFunc<T>{
   <T>(length:numberm,value:T):Array<T>;
 }
 let crateArray:CreateArrayFunc<any>;
 createArray = function<T>(length:number, value: T):Array<T>{
   let result:T[] = [];
   for(let i=0;i<length;i++>){
     result[i] = value;
   }
   return result;
 }
 ```

 #### 泛型类
 与泛型接口类似，泛型也可以用于类的类型定义中；
 ```ts
 class GenericNumber<T>{
   zeroValue:T;
   add:(x:T,y:t)=>T;
}
let m = new GenericNumber<number>();
m.zeroValue = 0;
m.add = function(x,y){return x+y;}
 ```

#### 泛型参数的默认类型
TypeScript 以后，我们可以为泛型中的类型参数制定默认类型。 当使用泛型时没有在代码中之间制定类型参数，从实际值参数重也无法推测时，默认类型就会起作用；

```ts
function creatArray<T = string>(length: number,value:T):Array<T>{
  let result:T = [];
  for(let i = 0;i<length;i++>{
    result[i] = value;
  })
  return result;
}

```

### 声明合并
 如果定义了两个相同名字的函数、接口或类，那么他们会合并成一个类型；

 #### 函数的合并
 可以使用重载定义多个函数类型
 ```ts
function reverse(s:number):number;
function reverse(s:string):string;
function reverse(s:number|string):number|string{
  if(typeof x === 'number'){
    return Number(x.toString().split('').reverse().join(''))
  } else if(typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
 ```

 #### 接口合并 （类合并与接口合并规则一致）
 接口中的属性在合并时会简单的合并到一个接口
 - 合并的属性类型必须时唯一的；

 ```ts
 interface Alarm{
   price:number;
 }
 interface Alarm{
   weight: number;
 }

 // 相当于

 interface Alarm{
   price:number;
   weight:number;
 }


 ```
 接口中方法的合并与函数的合并一样
 ```ts

interface Alarm{
  price:number;
  alert(s:string):string;
}
interface Alarm{
  weight:number;
  alert(s:string,n:number):string;
}
// 相当于
interface Alarm{
  price: number;
  weight:number;
  alert(s:string):string;
  alert(s:string,n:number):string;
}
 ```


## 工程
- 代码检查
- 编译选项
### 代码检查
安装 ESLint
```ts
npm install --save-dev eslint
```

由于Eslint 默认使用 Espree
进行语法解析，无法识别TypeScript的一些语法，故我们需要安装`@typescript-eslint/parser` 替代掉默认的解析器，别忘了安装 typescript

```sh
npm install --save-dev typescript @typescript-eslint/parser
```

接下来需要安装对应的插件  `@typescript-eslint/eslint-plugin` 它作为eslint默认规则的补充，提供了一些额外适用于ts的语法规则；

```sh
npm install --save-dev @typescript-eslint/eslint-plugin
```

### 创建配置文件