<template>
  <div class="page-content">
    <div class="tips" style="left:.3rem;" @click="showrule = true">游戏说明</div>
    <div class="tips" style="right:.3rem;" @click="gotoPrizeList()">我的奖励</div>
    <van-image :src="topbanner" />
    <div class="play-tips">
      您今天还有<span class="tips-count">{{ activityInfo.allowDrawCount }}</span>次抽奖机会
    </div>
    <!-- <div class="tips" style="left:.3rem;" @click="showrule = true">游戏说明</div>
    <div class="tips" style="right:.3rem;">我的奖励</div> -->
    <div class="play-table">
      <div class="play-plate">
        <ul class="list">
          <li v-for="(item, index) in activityInfo.drawActPrizeVo" :key="index" class="item" :class="['item' + index, {'active': item.active}]">
            <img class="icon" :src="$imghost+item.img" :alt="item.id">
            <!-- <span class="info">{{ item.info }}</span> -->
            <span class="mask" />
          </li>
          <li class="btn" @click="move">
            <span class="text" />
            <i class="mask" />
          </li>
        </ul>
      </div>
    </div>
    <RuleDialog v-if="showrule" :show.sync="showrule" :activity-desc="activityInfo.activityDesc" />
    <InfoDialog v-if="showinfo" :show.sync="showinfo" :type="type" @reset="oneAgain" />
    <LuckyDialog v-if="showlucky" :show.sync="showlucky" :prize-info="prizeInfo" @reset="oneAgain" />
    <!-- <van-dialog v-model="showrule" title="游戏说明">
      <div v-html="activityInfo.activityDesc" />
    </van-dialog> -->
  </div>
</template>

<script>
import { px2rem } from '../redenveloperain/game/gameHelper'
import BRUSH from '../../assets/img/brush.png'
import topbanner from './images/topbanner.png'
import { Button, Dialog, Image as VanImage, Notify, Popup } from 'vant'
import wechat from '@/mobile/utils/mixin/wechat'
import InfoDialog from '@/mobile/components/info-dialog'
import RuleDialog from '@/mobile/components/rule-dialog'
import LuckyDialog from '@/mobile/components/lucky-dialog'
// import { error } from '@/mobile/utils/popups'
export default {
  name: 'Contents',
  components: {
    InfoDialog,
    RuleDialog,
    LuckyDialog,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [VanImage.name]: VanImage,
    [Dialog.Component.name]: Dialog.Component,
    [Popup.name]: Popup
  },
  mixins: [wechat],
  data() {
    return {
      showrule: false,
      showmask: true,
      showinfo: false,
      type: 'unlucky',
      showlucky: false,
      renderCount: 0,
      cardWidth: px2rem(540),
      cardHeight: px2rem(430),
      finishPercent: 45,
      brushUrl: BRUSH,
      topbanner: topbanner,
      forceReveal: false,
      money: 0,
      count: 5, // 次數
      state: 6, // 0活动还没开始 1活动结束 2点击开始刮奖 3开始刮奖 4刮完得奖 5没有机会 6初始
      isShow: true, // 点我刮奖
      // 奖单
      list: [
        { img: 'http://static.chunyuhudong.com/data/img/7yX8yfOA70vip100.png', info: '谢谢参与', active: false },
        { img: 'https://b1-q.mafengwo.net/s12/M00/43/1C/wKgED1v__MqATFWOAAA8r6he_a471.jpeg', info: '北京-东京往返机票', active: false },
        { img: 'https://n3-q.mafengwo.net/s12/M00/42/2C/wKgED1v__AyAGkNKAAA33_Ke5y444.jpeg', info: '50元代金券', active: false },
        { img: 'https://n3-q.mafengwo.net/s12/M00/43/1C/wKgED1v__MqAPEuxAABG61CRQek46.jpeg', info: '马蜂窝护照包', active: false },
        { img: 'https://b1-q.mafengwo.net/s12/M00/43/1C/wKgED1v__MqATFWOAAA8r6he_a471.jpeg', info: '谢谢参与', active: false },
        { img: 'https://n3-q.mafengwo.net/s12/M00/42/2C/wKgED1v__AyAGkNKAAA33_Ke5y444.jpeg', info: '北京-札幌往返机票', active: false },
        { img: 'https://b1-q.mafengwo.net/s12/M00/43/1C/wKgED1v__MqATFWOAAA8r6he_a471.jpeg', info: '蚂蜂窝旅行箱', active: false },
        { img: 'http://static.chunyuhudong.com/data/img/7yX8yfOA70vip100.png', info: '马蜂窝日历', active: false }
      ],
      // 上次停留位置 index
      lastIndex: 0,
      // 服务器返回停留位置 index
      stopIndex: 0,
      // 正常转动动画
      timer1: null,
      // 进入低速转动动画
      timer2: null,
      // 低速转动动画
      timer3: null,
      // 正在执行动画
      isMoving: false,
      // 转动次数 最小12次（一圈半） 防止转动时间过短
      times: 0,
      // 接口成功返回停止stopIndex 标识
      ajaxEnd: false,
      // 进入低速转动动画 标识
      timerEnd: false,
      // 用户抽奖次数（实际应该是后台返回的次数）
      luckyTimes: 5
    }
  },
  watch: {
    // showinfo(value) {
    //   console.error('showinfo', value)
    //   if (value === false) {
    //     this.oneAgain()
    //   }
    // },
    // showlucky(value) {
    //   console.error('showlucky', value)
    //   if (value === false) {
    //     this.oneAgain()
    //   }
    // }
  },
  mounted() {
  },
  beforeDestroy() { // 组件销毁前
    // 清除定时器
    clearInterval(this.timer1)
    clearInterval(this.timer2)
    clearInterval(this.timer3)
  },
  methods: {
    oneAgain() {
      this.fetchActInfoByCode()
    },
    async shandlelottery() {
      await this.handlelottery()
      this.showmask = false
    },
    gtouchstart(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    complete() {
      alert('123')
    },
    // TODO:
    getStopIndex() { // 获取服务器返回的index
      this.handlelottery().then(res => {
        console.log(res)
        this.stopIndex = this.activityInfo.drawActPrizeVo.findIndex(item => {
          return item.id === res.id
        })
        console.log(this.stopIndex, 'this.activityInfo.isInPrize')

        if (res.isInPrize) {
          this.ajaxEnd = true
        } else {
          this.ajaxEnd = true
          return Promise.reject('没有中奖')
        }
      }).catch(err => {
        console.error(err)
        // 初始化数据
        clearInterval(this.timer1)
        this.activityInfo.drawActPrizeVo.map((e) => {
          e.active = false
        })
        this.lastIndex = 0
        this.isMoving = false
        this.lastIndex = 0
        this.times = 0
        this.showinfo = true
        this.type = 'unlucky'
        console.log(this.showinfo, 'this.showinfo')
        // const errMsg = typeof err === 'string' ? err : '服务器繁忙，请稍后重试'
        // this.showToast(errMsg)
      })
      // post('/lottery')
      //   .then((res) => {
      //     if (deepQuery(res, 'data', 'success')) {
      //       this.stopIndex = deepQuery(res, 'data', 'data')
      //       if (this.lastIndex !== this.stopIndex || this.lastIndex === this.stopIndex) {
      //         this.ajaxEnd = true
      //       }
      //     } else {
      //       return Promise.reject(deepQuery(res, 'data', 'message'))
      //     }
      //   })
      //   .catch((err) => {
      //     // 初始化数据
      //     clearInterval(this.timer1)
      //     this.list.map((e) => {
      //       e.active = false
      //     })
      //     this.lastIndex = 0
      //     this.isMoving = false
      //     this.lastIndex = 0
      //     this.times = 0
      //     const errMsg = typeof err === 'string' ? err : '服务器繁忙，请稍后重试'
      //     this.showToast(errMsg)
      //   })
    },
    move() { // 点击开始游戏按钮
      if (!this.activityInfo.allowDrawCount) {
        console.error('没有抽奖次数了')
        Notify({ type: 'warning', message: '没有抽奖次数了' })
        return false
      }
      if (this.isMoving) {
        return false
      }
      this.isMoving = true
      this.ajaxEnd = false
      this.timerEnd = false
      this.times = 0
      console.error('上次停止位置: ', this.lastIndex)
      let i = this.lastIndex
      // 执行ajax请求数据
      this.getStopIndex()
      // 执行动画
      this.timer1 = setInterval(() => {
        this.times++
        i++
        if (i === 8) {
          i = 0
        }
        this.activityInfo.drawActPrizeVo.map((e) => {
          e.active = false
        })
        this.$set(this.activityInfo.drawActPrizeVo[i], 'active', true)
        // 当获取到服务器数据 index
        if (this.ajaxEnd && this.times === 20) {
          console.log('服务器返回的停止位置: ', this.stopIndex)
          clearInterval(this.timer1)

          this.enter(i, this.stopIndex)
        }
      }, 100)
    },
    enter(cur, stop) { // 计算需要停止的index
      console.log(cur, stop)
      let count = stop - cur
      if (count <= 4) {
        count = count > -4 ? count + 8 : count + 16
      }
      let i = cur
      this.timer2 = setInterval(() => {
        count--
        i++
        if (i === 8) {
          i = 0
        }
        this.activityInfo.drawActPrizeVo.map((e) => {
          e.active = false
        })
        this.$set(this.activityInfo.drawActPrizeVo[i], 'active', true)
        if (count === 4) {
          clearInterval(this.timer2)
          this.stop(i, stop)
        }
      }, 100)
    },
    stop(cur, stop) { // 计算需要停止的index
      let count = 0
      let i = cur
      this.timer3 = setInterval(() => {
        count++
        i++
        if (i === 8) {
          i = 0
        }
        this.activityInfo.drawActPrizeVo.map((e) => {
          e.active = false
        })
        this.$set(this.activityInfo.drawActPrizeVo[i], 'active', true)
        if (count === 4) {
          clearInterval(this.timer3)
          this.isMoving = false
          this.lastIndex = this.stopIndex
          this.activityInfo.allowDrawCount--
          this.showlucky = true
        }
      }, 300)
    },
    showToast(err) { // toast 提示
      alert(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content{
  box-sizing: border-box;
  width:100vw;
  height: 100vh;
  min-width: 7.5rem;
  min-height: 1.2rem;
  background-size: contain;
  background-color: #d8073d;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .tips{
     z-index: 2;
    position: absolute;
  background: #000000;
  opacity: 0.5;
  border-radius: 12px;
  top:.5rem;
  font-size: .14rem;
  color: #FFFFFF;
  padding:.1rem .15rem;
  }
  .play-tips{

    width:414px;
    height:112px;
    background-image: url('./images/count.png') ;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    padding:50px 0 0 0px;
    text-align: center;
    top: 398px;
    font-size: 27px;
    font-weight: 400;
    color: #FFFFFF;
    .tips-count{
      font-size: 27px;
      color:#FEEF51;
    }
  }
  .play-table{
    margin-top: 50px;
    width:100%;
    height:593px;
    background-image: url('./images/palte.png') ;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding:36px 0 0 82px;
    box-sizing: border-box;
    .play-plate{
      width:90%;
    .tips{
      z-index: 2;
      position: absolute;
      background: #000000;
      opacity: 0.5;
      border-radius: 12px;
      top:.5rem;
      font-size: .14rem;
      color: #FFFFFF;
      padding:.1rem .15rem;
    }

  .list {
    position: relative;
    width: 100%;
    padding-bottom: 82%;
  }
  .item {
    width: 32%;
    padding-bottom: 26%;
    position: absolute;
    background: lightgreen;
    background-image: url('./images/commonbg.png');
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: .24rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    &.item0 {
      left: 0;
      top: 0;
    }
    &.item1 {
      left: 34%;
      top: 0;
    }
    &.item2 {
      left: 68%;
      top: 0;
    }
    &.item3 {
      left: 68%;
      top: 34%;
    }
    &.item4 {
      left: 68%;
      top: 68%;
    }
    &.item5 {
      left: 34%;
      top: 68%;
    }
    &.item6 {
      left: 0;
      top: 68%;
    }
    &.item7 {
      left: 0;
      top: 34%;
    }
    .icon {
      position: absolute;
      height: 95%;
      width: 95%;
      top:3%;
      z-index: 1;
    }
    .info {
      position: absolute;
      left: 0;
      bottom: 0;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .5));
      height: .48rem;
      width: 100%;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .4);
      background-size: 100%;
      background-repeat: no-repeat;
      opacity: 0;
    }
    &.active{
      background: rgba(0, 0, 0, .4);
      background-image: url('./images/activebg.png');
      background-size: 100%;
      background-repeat: no-repeat;
      .mask{
        opacity: 1;
      }
    }
  }

  .btn {
    width: 32%;
    padding-bottom: 26%;
    background: lightsalmon;
    background-image: url('./images/lotterybtn.png') ;
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 34%;
    top: 34%;
    font-size: .72rem;
    border-radius: .24rem;
    overflow: hidden;
    .text {
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    .mask {
      position: absolute;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
  }

  .lucky-times {
    color: #000;
    font-size: .36rem;
  }
  }
  }
}
</style>
<style lang="scss">
// .v-common-com-lottery {
//   height: 100%;
//   font-size: .24rem;
//   color: #fff;

// }
</style>
