import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

function resolvePath(dir) {
    // console.log(URL === global.URL);
    // return path.join(__dirname, dir)
    // console.log(new URL('./'+dir));
    return fileURLToPath(new URL(dir, import.meta.url))
}
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function(file){
        console.log(file);
        const pathname = path.join(dir, file)

        if(fs.statSync(pathname).isDirectory()){
            
            travel(pathname,callback)
        }else {
            callback(pathname)
        }
    })
}

travel(resolvePath('../diycopy'),(pathname)=>{
    console.log(pathname);
})

// console.log(import.meta.url);
// console.log(import.meta);
// const myURL = new URL('//測試', import.meta.url);
// console.log(myURL);