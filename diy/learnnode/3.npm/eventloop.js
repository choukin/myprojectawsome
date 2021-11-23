const eventloop = {
    queue:[],
    loop(){
        if(this.queue.length){
            var callback = this.queue.shift()
            console.log(this.queue);
            console.log( typeof callback);
            console.log('callback: '+callback);
            callback()
        }
        setTimeout(this.loop.bind(this),80)
    },
    add(callback){
        console.log('callback');
        this.queue.push(callback)
    }
}
eventloop.loop()

eventloop.add(function(){
    console.log(1);
})
eventloop.add(function(){
    console.log(3);
})