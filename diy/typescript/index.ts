Math.pow(0,1)

document.addEventListener('click',function(e) {
    console.log(e.targetCurrent);
    
})

type Name = string;
type NameResolver = ()=>string;
type NameOrResolver = Name | NameResolver;
function getName(n:NameOrResolver):Name{
    if(typeof n === 'string'){
        return n;
    } else {
        return n();
    }
}

type EventNames = 'click'|'scroll'|'mousemove'

function handleEvent(ele:Element, event:EventNames){

}

handleEvent(document.getElementById('hello'), 'scroll');
handleEvent(document.getElementById('world'), 'dbclick');


// 元组
let tom:[string, number] = ['Tom', 25];

let tom1:[string, number];
tom1[0] = 'Tom';
tom1[1] = 25;
tom1[0].slice(1);
tom1[1].toFixed(2);

tom1 = ['tom']

tom1.push('male')
tom.push(true);

enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat}

enum Color {Red, Green, Blue="blue".length};
enum Color1 {Red = "red".length, Green, Blue}

// 常数枚举

const enum Directions {
    Up, Down, Left, Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

//假如包含了计算成员，则会在编译阶段报错
const enum Color2 {Red, Green, Blue="blue".length};

class Animal{
    public name;
    private age
    constructor(name){
        this.name = name;
    }
    sayHi(){
        return `My name is ${this.name}`
    }
    // get name(){
    //     return 'Jack'
    // }

    // set name(value) {
    //     console.log(value);
        
    // }

    static isAnimal(a) {
        return a instanceof Animal;
    }
}

let a = new Animal('Jack');
console.log(a.sayHi());
a.age = 20;

class Cat extends Animal {
    constructor(name){
        super(name);
        console.log(this.name);
        
    }
    sayHi(){
        return 'Meow,'+super.sayHi()
    }
}

let c = new Cat('Tom');
console.log(c.sayHi());


interface Alarm{
    alert():void;
}

class Door{

}

class SecurityDoor extends Door implements Alarm{
    alert(){
        console.log('SecurityDoor alert');
        
    }
}

class Car implements Alarm{
    alert(){
        console.log('car alert');
        
    }
}

function createArray(length:number, value:any): Array<any>{
    let result = [];
    for(let i=0;i<length;i++){
        result[i] = value;
    }
    return result;
}

function createArray1<T>(length:number, value: T):Array<T>{
    let result:T[] = [];
    for(let i=0;i<length;i++) {
        result[i] = value;
    }

    return result;
}

createArray1(3,'x');
createArray1<string>(3,'x');

function swap<T,U>(tuple:[T,U]):[U,T]{
    return [tuple[1], tuple[0]];
}

swap([7,'seven'])


// 泛型约束
