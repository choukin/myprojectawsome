module.exports = function(playerAction){

    const random = Math.random()*3
    
    let AIAtion= 'paper'
    if(random<1){
        AIAtion ='rock'
    } else if(random>2) {
        AIAtion = 'scissor'
    }
    // console.log('playerAction:'+playerAction);
    // console.log('AIAtion:'+AIAtion);
    if(playerAction === AIAtion){
        return 0
    } else if(
        (AIAtion==='paper'&& playerAction==='rock')||
        (AIAtion ==='rock'&& playerAction==="scissor")||
        (AIAtion ==='scissor'&& playerAction=='pager')
    ){
        return -1
    }else {
        return 1
    }
    }