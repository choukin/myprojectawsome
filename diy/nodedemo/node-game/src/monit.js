const tx2 = require('tx2')
const http = require('http')

let meter = tx2.meter({
    name:'seq/sec',
    samples:1,
    titmeframe:60
})

http.createServer((req,res)=>{
    meter.mark()
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.write('Hello world')
    res.end()
}).listen(6001)