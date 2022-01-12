function sayHello(person:string){
    if(typeof person === 'string') {
    return 'Hello,' + person
    } else{
        throw new Error('person is not a string')
    }
}

// let user = 'CAT'
let user1 = 0

let createByNewBoolean :Boolean = new Boolean(1)

let boolean:boolean = Boolean(1)

console.log(sayHello(user1));

let v:void;
let num:number =v;

let u:undefined = undefined;
let num1:number = u

// 联合类型

let myFavoriteNumber: string|number;
myFavoriteNumber = 'seven';
myFavoriteNumber.length
myFavoriteNumber = 7
myFavoriteNumber.length
// 不允许赋值非 string 或者 number
myfavoriteNumber = true


// 会报错
function getLength(s:string|number):number{
    return s.length;
}
function getString(s:string|number):string{
    return s.toString();
}

// 接口

interface Person {
    // 只读属性
    readonly id:number;
    name:string;
    // 可选属性
    age?: number;
    // 任意属性
    [propNmae:string]:string|number;
}
let tom:Person ={
    id:123,
    name:'Tom',
    age:20,
    gender:'male'
}
// 不能给只读属性单独赋值
tom.id = 111;

// 数组
//类型+方括号表示法
let fibonacci: number[] =  [1,1,2,3,5]
fibonacci=  [1,1,2,3,5,'3']
fibonacci.push('8')
// 范型表示法
let fibonacciArray:Array<number> = [1,1,2,3,5]
// 接口表示法
interface NumberArray{
    [index:number]:number;
}

let fibonacciinterface:NumberArray = [1,1,2,3,5]
// 类数组
function sum(){
    // let args :{
    //     [index:number]:number;
    //     length:number;
    //     callee:Function
    // } = arguments

    let args:IArguments = arguments
}

let a:string[] = ['1']
let b:Array<string> = ['2']

// 函数类型
// 函数声明
 function sum1(x:number,y:number):number{
     return  x+y
 }
 // 函数表达式
 let sum2 = function(x:number,y:number):number{
     return x+y;
 }

 // 函数类型
 let sum3:(x:number,y:number)=>number = function(x:number,y:number):number{
     return x+y
 }

 // 接口定义函数

 interface SearchFunc{
     (source:string,subString:string):boolean;
 }

 let mysum4:SearchFunc = function(source:string,subString:string):boolean{
    return source.search(subString)!==-1
 }

 //可选参数
 function buildName(firstname:string,lastName?:string){
    if(lastName){
        return firstname+'' + lastName
    }else{
        return firstname
    }
 }

 // 参数默认值
 function buildName1(firstName:string='tom',lastName:string){
     return firstName + ' ' + lastName
}
     let tomcat = buildName1('Tom','cat')
     let cat = buildName1(null,'cat')
 

 // 剩余参数
 function push(array:any[],...items:any[]){
     items.forEach(item =>{
         array.push(item)
     })
 }

 let a1:any[]= []
 push(a1,1,2,3)

 // 重载
 function reverse(x:number):number;
 function reverse(x:string):string;

 function reverse(x:number|string):number|string|void{
    if(typeof x === 'string'){
        return x.split('').reverse().join('');
    } else if(typeof x ==='number'){
        return Number(x).toString().split('').reverse().join('');
    }
 }



 // 断言
 // 断言为一个联合类型为其中一个类型
interface Cat{
    name:string;
    run():void;
}

interface Fish{
    name:string;
    swim():void;
}

function getName(animal:Cat|Fish){
    return animal.name;
}

function isFish(animal:Cat|Fish){
    // 不断言只能使用公共属性
    if(typeof (animal as Fish).swim === 'function'){
        return true;
    }
    return false;
}

// // 将一个父类断言为更具体的子类
// interface ApiError extends Error{
//     code:number
// }

// interface HttpError extends Error{
//     statusCode:number
// }

// function isApiError(error:Error){
//     // 如果是接口只能使用这种方式
//     if(typeof(error as ApiError).code === 'number'){
//         return true;
//     }
//     return false;
// }


// 将一个父类断言为更具体的子类
class ApiError extends Error{
    code:number = 0
}

class HttpError extends Error{
    statusCode:number = 200;
}
// 更合适的判断
function isApiErrorin(error:Error) {
    if(error instanceof ApiError) {
        return true;
    }
    return false;
}

// 将任何一个类型断言为any
(window as any).foo = 1

// 将any断言为具体的类型

function getCacheData(key: string):any{
    return (window as any).cache[key]
}

interface Cat{
    name:string;
    run():void;
}

const tom1 = getCacheData('tom') as Cat;
tom1.run();

// 双重断言

interface Cat{
    run():void;
}
interface Fish{
    swim():void;
}

function testCat(cat: Cat){
    return (cat as any as Fish);
}

// 类型断言 VS 类型转换

function toBoolean(something:any):boolean{
    return something as boolean;
}

toBoolean(1)
// 类型断言不是类型转换，它不会真的影响到变量的类型

function toBoolean1(something:any):boolean{
    return Boolean(something)
}

toBoolean1(1)

// 类型断言 VS 类型声明

function getCacheData1(key: string):any{
    return (window as any).cache[key]
}

interface Cat{
    name:string;
    run():void;
}


const tom2:Cat = getCacheData1('tom');

tom2.run();

// 类型断言 vs 范型
function getCacheData3<T>(key:string):T{
    return (window as any).cache[key];
}

const tom3 = getCacheData3<Cat>('tom')
tom3.run();

jQuery('#foo')
// 使用declare  let 定义的 jQuery 类型，允许修改这个全局变量
// jQuery = function(selector){
//     return document.querySelector(selector);
// }

jQuery(function(){
    alert('dom')
})

let catd = new Animal('Tom')

let directions = [Directions.Up,Directions.Down,Directions.Left,Directions.Right];

// 声明文件中 declare namespace 比较常用，用来表示全局变量是一个对象，包含很多子属性；
// 嵌套命名空间

jQuery.fn.extend({
    check:function(){
        return this.each(function(){
            this.checked = true;
        })
    }
})

let settings:jQuery.AjaxSettings ={
    method:'POST',
    data:{
        name:'foo'
    }
}