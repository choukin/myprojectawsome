<template>
  <div class="turn-table">  
    <div
      ref="plate"
      class="plate"
    />
    <div
      class="pointer"
    />
    <div class="atmosphere" />
  </div>  
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Toast} from 'vant'
@Component({
  name: 'turnTable'})
export default class Turntable extends Vue{
  @Prop({default:false})
  showTurnTable!:boolean
  gifts:any = {
    "1":{
      id : "1",
      name : "理财金2000元",
      angleStart : -30,
      angleEnd : 30,
      tips : "恭喜您获得理财金2000元~~"
    },
    "2":{
      id : "2",
      name : "理财金1000元",
      angleStart : 31,
      angleEnd : 90,
      tips : "恭喜您获得理财金1000元~~"
    },
    "3":{
      id : "3",
      name : "谢谢参与",
      angleStart : 91,
      angleEnd : 150,
      tips : "很遗憾没有能中奖，再试一次吧~"
    },
    "4":{
      id : "4",
      name : "京东E卡",
      angleStart : 151,
      angleEnd : 210,
      tips : "恭喜您抽中京东E卡一张~"
    },
    "5":{
      id : "5",
      name : "理财金5200元",
      angleStart : 211,
      angleEnd : 270,
      tips : "恭喜您获得理财金5200元~~"
    },
    "6":{
      id : "6",
      name : "谢谢参与",
      angleStart : 271,
      angleEnd : 330,
      tips : "很遗憾没有能中奖，再试一次吧~"
    }
  }
  created() {
  }
  getRandom(n:any, m:any) {
    var num = Math.floor(Math.random() * (m - n + 1) + n)
    return num
  }
  rotation(data:any) {
    const base = 2160; //和transition: transform 10.5s;对应
    // data.perfect = 2
    let result = +data.perfect// this.getRandom(-30,330)
    var _key = null; // 内定奖品id
    if (_key) {
      result = this.getRandom(this.gifts[_key].angleStart,this.gifts[_key].angleEnd)
    }
    // result = 40
    var deg = (base+result)
    let plate = this.$refs.plate as HTMLElement
    plate.style.transform = `rotate(${deg}deg)`
    plate.addEventListener('transitionend',()=>{
      for (var key in this.gifts) {

        if (this.gifts[key].angleStart <= result && result<=this.gifts[key].angleEnd) {
          Toast.success({
            message:`恭喜你，获得${data.perfect||0}倍积分`,
            onClose:()=>{
              this.$emit('turntable')
            }
          })

        }
      }
    })
  }
  
}
</script>
<style lang="scss">
  .turn-table{
    width:100%;
    max-width:349px;
    margin:30px auto;
    position: relative;
    .atmosphere{
      position:absolute;
      top:0;
      left:0;
      background:url(./img/atmosphere.png) left top no-repeat;
      background-size:100% 100%;
      padding-top:100%;
      width:422px;
      height:358px;
    }
    .plate{
      background:url(./img/plate.png) left top no-repeat;
      padding-top:100%;
      background-size:100% 100%;
      position:relative;
      transition: transform 10.5s;
      transition-timing-function: cubic-bezier(0.42, 0, 0, 0.99); /*调整旋转速度和起始速率*/
    }
    .pointer{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      -webkit-transform:translate(-50%,-50%);
      width:86px;
      height:98px;
      background:url(./img/pointer.png) center center no-repeat;
      background-size:100% 100%;
    }

  }
</style>