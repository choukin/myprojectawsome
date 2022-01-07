function sayHello(person:string){
    if(typeof person === 'string') {
    return 'Hello,' + person
    } else{
        throw new Error('person is not a string')
    }
}

// let user = 'CAT'
let user = 0

let createByNewBoolean :Boolean = new Boolean(1)

let boolean:boolean = Boolean(1)

console.log(sayHello(user));

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