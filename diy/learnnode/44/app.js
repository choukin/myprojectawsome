const fs = require('fs');
const http = require('http');

http.createServer(function(req, res){
    res.writeHead(200,{'content-type':'text/html'})
    setTimeout(()=>{
        console.log(window.location.href);
        res.end(fs.readFileSync(__dirname+'/index.html','utf-8'))
    },50)
}).listen(3000,()=>{
    console.log('listened 3000');
})