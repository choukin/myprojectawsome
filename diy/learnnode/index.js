const playerAction = process.argv[process.argv.length-1]


const random = Math.random()*3

let AIAtion= 'paper'
if(random<1){
    AIAtion ='rock'
} else if(random>2) {
    AIAtion = 'scissor'
}

if(playerAction === AIAtion){
    console.log('平局');
} else if(
    (AIAtion==='paper'&& playerAction==='rock')||
    (AIAtion ==='rock'&& playerAction==="scissor")||
    (AIAtion ==='scissor'&& playerAction=='pager')
){
    console.log('你输了');
}else {
    console.log('你赢了');
}