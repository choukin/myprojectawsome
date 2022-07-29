import http from 'node:http'

const options = {
    hostname:'asdf-vm.com',
    protocol:'http:',
    port:80,
    path:'/',
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencode',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
    },
}

const request = http.request(options, function (response) {
    console.log(`STATUS: ${response.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.setEncoding('utf8') 
    response.on('data',function(chunk){
        console.log(chunk);
    })
    response.on('end',()=>{
        console.log('No more data');
    })
})

request.write('?wd=node')

request.end