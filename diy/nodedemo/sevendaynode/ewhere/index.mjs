import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'

const MIME = {
    '.css': 'text/css',
    '.js':'application/javascript'
}

/**
 * 合并文件
 * @param {*} pathnames 
 * @param {*} callback 
 */
function combineFiles(pathnames, callback) {
    let output = [];
    (function next(i, len) {
        if(i<len){
            fs.readFile(pathnames[i], function (err, data) {
                if(err){
                    callback(err)
                } else {
                    output.push(data)
                    next(i+1,len)
                }
            })
        }else{
            callback(null, Buffer.concat(output))
        }
    }(0, pathnames.length))
}


function main(argv) {
    const config = JSON.parse(fs.readFileSync(argv[0], 'utf-8'))

    const root = config.root ||'.'
    const port = config.port || 80

    http.createServer(function (req, res) {
        const urlInfo = parseURL(root, req.url)

        combineFiles(urlInfo.pathnames, function (err, data) {
            if(err){
                res.writeHead(404)
                res.end(err.message)
            }else{
                res.writeHead(200,{
                    'Content-Type':urlInfo.mime
                })
                res.end(data)
            }
        })
        
    }).listen(port)
}

function parseURL(root, url) {
    let base, pathnames , parts;
    console.log(url);
    if(url.indexOf('??') === -1 ) {
        url = url.replace('/', '/??')
    }
    console.log(url);
    parts = url.split('??')
    console.log(parts);
    base = parts[0]

    pathnames = parts[1].split(',').map(function (value) {
        return path.join(root, base, value)
    })

    return {
        mime:MIME[path.extname(pathnames[0])]||'text/plain',
        pathnames
    }
}

main(process.argv.slice(2))