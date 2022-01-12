// export const name:string;
// export function getName():string;
// export class Animal{
//     constructor(name:string);
//     sayHi():string;
// }
// export enum Directions{
//     Up,
//     Down,
//     Left,
//     Right
// }

// export interface Options{
//     data:any;
// }

// 混用declare export
declare const name:string;
declare function getName():string;
declare class Animal{
    constructor(name:string);
    sayHi():string;
}
declare enum Directions{
    Up,
    Down,
    Left,
    Right
}

declare type Options  = {
    data:any;
}


export as namespace foo;
export default foo;
declare function foo():string;
declare namespace foo{
    const bar:number;
}