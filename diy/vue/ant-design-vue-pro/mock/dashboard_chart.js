function chart(method) {
    let res = null;
    switch(method) {
        case 'GET':
         res = [20,90,78,100,20,49]
         break;
         default:
             res = null
    }
    return res
}

module.exports = chart