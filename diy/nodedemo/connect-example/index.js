const errorHandler = require('./errorHandler');

const app = require('connect')()

function setup(format){
    const regexp = /:(\w+)/g
    return function createLogger(req, res, next){
        const str = format.replace(regexp, (match,property)=>{
            return req,property
        });
        console.log(str)
        next()
    }
}
function logger(req,res,next) {
    console.log(`${req.method} ${req.url}`);
    next()
}


function hello(req,res) {
    console.log('hello');
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world')
}
app.use(setup(':method :url')).use(hello).use(errorHandler).use(hello)

app.listen(3000)