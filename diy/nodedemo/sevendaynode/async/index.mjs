function heavyCompute(n, callback) {
    let count = 0;
    let i;
    let j;

    for (i =n; i>0;--i) {
        for (j=n;j>0;--j) {
            count +=1;
        }
        
    }
    callback(count)
}

var t = new Date()
setTimeout(function () {
    console.log(new Date() - t);
    console.log('world');
}, 1000)

heavyCompute(3000,function (count) {
    console.log(count);
})




console.log('hello');

const arr = []

// 异步函数执行后执行下一个异步函数，直到都执行方笔
(
    function next(i,len,callback) {
        if(i<len) {
            async(arr[i], function (value) {
                arr[i] = value;
                next(i+1, len,callback)
            })
        }else{
            callback();
        }
    }(0, arr.length,function(){
        // ALl arry items have processed.
    })
)

// 如果异步函数可以并行处理，但是仍需要所有数组成员处理完毕后再进行下面的操作
(
    function (i, len, count, callback) {
        for(;i<len;i++){
            (function (i) {
                async(arr[i], function(value){
                    arr[i] = value;
                    if(++count ===len){
                        callback()
                    }
                })
            }(i))
        }
    }(0, arr.length, 0, function(){
        // 
    })
)

