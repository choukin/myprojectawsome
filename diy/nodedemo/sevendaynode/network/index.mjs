import http from 'node:http'

// http.createServer(function (request, response) {
//     response.writeHead(200, {'Content-Type':'text-plain'})
//     response.end('Hi node');
// }).listen(8989)


http.createServer(function (request,response) {
    response.writeHead(200, {'Content-Type':'text/plain'})

    response.on('data',function(chunk){
        response.write(chunk)
    })
    request.on('end', function(){
        response.end()
    })
}).listen()