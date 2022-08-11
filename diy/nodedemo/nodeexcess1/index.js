const http = require('http')
const fs = require('fs')

// http.createServer((req, res)=>{
//     if(req.url==='/') {
//         fs.readFile('./title.json',(err, data)=>{
//             if(error){
//                 res.end('server error')
//             }else {
//                 const titles = JOSN.parse(data.toString());
//                 fs.readFile('./template.html', (err, data)=>{
//                     if(err){
//                         res.end('server error')
//                     } else {
//                         const temp = data.toString()
//                         const html = templ.replace('%', titles.join('</li><li>'))
//                         res.writeHead(200, {'Content-Type':"text/html"})
//                         res.end(html)
//                     }
//                 })
//             }
//         })
//     }
// }).listen(8000, '127.0.0.1')

// 减少嵌套

http.createServer((req, res)=>{
    if(req.url==='/') {
        getTitles(res)
    }
}).listen(8000, '127.0.0.1')

function getTitles(res,req) {
    fs.readFile('./title.json',(err, data)=>{
        if(err) return haderror(res)
            getTemplate(JSON.parse(data.toString()),res)
    })
}

function getTemplate(titles,res) {
    fs.readFile('./template.html', (err, data)=>{
        if(err) return  hadError(res)
            formatHtml(titles, data.toString(), res)
    })
}

function formatHtml(titles, templ, res) {
    const html = templ.replace('%', titles.join('</li><li>'))
    res.writeHead(200, {'Content-Type':'text/html'})
    res.end(html)
}

function hadError(err,res) {
    res.end('Server Error')
}

