function factory(config){
    return function(data){

    }
}


const requestors = {}
factory.registerProtocol = function(protocol,requestor){
    requestor[protocol] = requestor
}
module.exports = factory