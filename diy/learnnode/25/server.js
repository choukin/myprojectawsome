const net = require('net')
const server = net.createServer((socket)=>{
 socket.on('data',function(buffer){
     console.log(buffer,buffer.toString());
 })
})
server.listen(4000,'127.0.0.1',function(){
    console.log(`127.0.0.1:4040`);
})


// const net = require('net');

// const server = net.createServer((socket)=> {
//     socket.on('data', function(buffer) {
//         console.log(buffer, buffer.toString())
//     })
// });

// server.listen(4000);