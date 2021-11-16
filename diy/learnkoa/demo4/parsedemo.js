
const parseurl = require('parseurl')

function createReq(url, originalUrl) {
    return {
        originalUrl,
        url
    }
}

const url = 'https://127.0.0.1:8080/sit/oneway_list.htm?a=1&b=2#abc'
const req = createReq(url)

const urlp = parseurl(req)
console.log(urlp);

