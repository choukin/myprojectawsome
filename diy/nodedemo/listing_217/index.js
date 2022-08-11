const fs = require('fs')
const request = require('request')
const htmlparser = require('htmlparser')
const { nextTick } = require('process')

const configFilename = 'rss_feeds.txt'

function checkForRssFile() {
    // const ex = fs.existsSync(configFilename)
    fs.exists(configFilename, (exits)=>{
        if (!exits) {
            return next(new Error(`Missing Rss file: ${configFilename}`))
        }
        next(null, configFilename)
    })
}


function readRssFile(configFilename) {
    fs.readFile(configFilename,(err, feedList)=>{
        if(err) return next(err);
        console.log(feedList.toString());
        feedList = feedList.toString().replace(/^\s+|\s+$/g,'')
        .split('\n')
        console.log('feedList.length', feedList.length);
        const random = Math.floor(Math.random() * feedList.length)
        next(null, feedList[random])
    })
}

function downloadRSSFeed(feedUrl) {
    request({url: feedUrl},(err,res,body)=>{
        if(err) return next(err);
        if(res.statusCode !== 200){
            return next(new Error('Abnormal reponse status code'))
        }
        next(null, body)
    })
}

function parseRSSFeed(rss) {
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler)
    parser.parseComplete(rss)
    if(!handler.dom.items.length){
        return next(new Error('No RSSS items found'));
    }
    console.log('handler.dom.items.length', handler.dom.items.length);
    const random = Math.floor(Math.random() *  handler.dom.items.length)
    const item = handler.dom.items[random];
    console.log(item.title);
    console.log(item.link);
    console.log(item);
}
const tasks = [
    checkForRssFile,
    readRssFile,
    downloadRSSFeed,
    parseRSSFeed

]

function next(err, result) {
    if(err) throw err;
    const currentTask = tasks.shift();
    if(currentTask){
        currentTask(result)
    }
}


next()