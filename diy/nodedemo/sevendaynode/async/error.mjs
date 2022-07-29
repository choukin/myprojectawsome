function async(fn,callback) {
    setTimeout(()=>{
        try {
            callback(null, fn())
        } catch (error) {
            callback(error)            
        }
    }, 0)
}

try {
    async(null,function(err,data){
        if(err){
    console.log('Error:%s', err.message);

        }else {}
    })
} catch (err) {
    console.log('Error:%s', err.message);
}