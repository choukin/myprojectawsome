const {effect, reactive} = require('@vue/reactivity')

const obj = reactive({num:1,count:0});



effect(()=>{
    if(obj.num===1) {
        ++obj.num
        console.log(obj.count);
    }
    console.log('num',obj.num)
})

setTimeout(()=>{
    console.log('1 修改 count');
    obj.count = 2
}, 1000)

setTimeout(()=>{
    console.log('2 修改 count');
    obj.count = 3
}, 1000)

setTimeout(()=>{
    console.log('3 修改 num');
    obj.num = 3
}, 1000)

setTimeout(()=>{
    console.log('4 修改 count');
    obj.count = 3
}, 1000)

// setInterval(()=>{
//     ++obj.num;
// }, 1000)
