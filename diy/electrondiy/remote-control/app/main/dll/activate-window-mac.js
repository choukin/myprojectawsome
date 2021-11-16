const applescript = require('applescript')


function showWeChat(){
const script = 'tell application "WeChat" to activate end'
console.log('showWeChat');
applescript.execString(script,(err,res)=>{
    console.log('applescript');
    if(err){
        console.error(err);
        return 
    }
    console.log(res);
})
}

module.exports = {showWeChat}
