<template>
  <div class="page-content">
    <div class="tips" style="left:.3rem;" @click="showrule = true">游戏说明</div>
    <div class="tips" style="right:.3rem;" @click="gotoPrizeList()">我的奖励</div>
    <div class="box">
      <div v-if="showmask" class="mask" @touchstart.native="gtouchstart" @touchmove.native="gtouchstart" />
      <scratch-card
        :key="renderCount"
        :card-width="cardWidth"
        :card-height="cardHeight"
        :finish-percent="finishPercent"
        :image-url="mask"
        :brush-url="brushUrl"
        :force-reveal="forceReveal"
        @complete="complete"
      >
        <h2 class="card-content">{{ prizeInfo.name }}</h2>
      </scratch-card>
      <van-image v-if="showmask" class="startbtn" :src="startbtn" @click="shandlelottery" />
    </div>
    <div class="scratch-count">
      您今天还有 <span class="count">{{ activityInfo.allowDrawCount }}</span> 次刮奖机会
    </div>
    <RuleDialog v-if="showrule" :show.sync="showrule" :activity-desc="activityInfo.activityDesc" />
    <InfoDialog v-if="showinfo" :show.sync="showinfo" :type="type" @reset="oneAgain" />
    <LuckyDialog v-if="showlucky" :show.sync="showlucky" :prize-info="prizeInfo" @reset="oneAgain" />
  </div>
</template>

<script>
import { px2rem } from '../redenveloperain/game/gameHelper'
import ScratchCard from 'vue-scratchcard'
import BRUSH from '../../assets/img/brush.png'
import mask from './images/mask.png'
import startbtn from './images/startbtn.png'
import { Button, Dialog, Image as VanImage, Popup } from 'vant'
import wechat from '@/mobile/utils/mixin/wechat'
import InfoDialog from '@/mobile/components/info-dialog'
import RuleDialog from '@/mobile/components/rule-dialog'
import LuckyDialog from '@/mobile/components/lucky-dialog'
export default {
  name: 'Contents',
  components: {
    ScratchCard,
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
      showlucky: false,
      type: '',
      renderCount: 0,
      cardWidth: px2rem(540),
      cardHeight: px2rem(430),
      finishPercent: 45,
      brushUrl: BRUSH,
      mask: mask,
      startbtn: startbtn,
      forceReveal: false,
      money: 0,
      count: 5, // 次數
      state: 6, // 0活动还没开始 1活动结束 2点击开始刮奖 3开始刮奖 4刮完得奖 5没有机会 6初始
      isShow: true // 点我刮奖
    }
  },
  mounted() {
  },
  methods: {
    async shandlelottery() {
      await this.handlelottery()
      this.showmask = false
    },
    gtouchstart(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    oneAgain() {
      this.fetchActInfoByCode()
      this.showmask = true
      this.renderCount++
    },
    complete() {
      if (this.prizeInfo.isInPrize) {
        this.showlucky = true
        this.type = 'lucky'
      } else {
        this.showinfo = true
        this.type = 'unlucky'
      }
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
  background: url('./images/bg.png') no-repeat;
  background-size: contain;
  background-color: #dd3242;
  display: flex;
  justify-content:space-around;
  flex-direction: column;
  align-items: center;
  padding-top: 3.45rem;
  position: relative;
  .tips{
    position: absolute;
  background: #000000;
  opacity: 0.5;
  border-radius: 12px;
  top:.5rem;
  font-size: .14rem;
  color: #FFFFFF;
  padding:.1rem .15rem;
  }
  .box{
    position: relative;
    width:6.04rem;
    height:6.4rem;
    background: url('./images/box.png') no-repeat;
    background-size: 100% 100%;
      padding:1.85rem 0 0 0.15rem;
      box-sizing: border-box;
    .mask{
      width:5.5rem;
      height:4.3rem;
      background-color:transparent;
      position: absolute;
      z-index: 2;
    }
    .startbtn{
      width:4rem;
      height:0.756rem;
      position: absolute;
      top: 4.6rem;
      z-index: 999;
      left:0;
      right:0;
      margin:0 auto;
    }

  }
  .scratchcard {
    width:5.42rem;
    height:4.3rem;
    margin:0 auto;
    .scratchcard-content{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .card-content{
    text-align: center;
    width:100%;
    height:100%;
 display: flex;
      align-items: center;
      justify-content: center;
  }
  .scratch-count{
    padding:0 15px;
    background: #000000;
    opacity: 0.5;
    border-radius: 25px;
    font-size: 26px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 49px;
    text-align: center;
    .count{
      color:#FFF052
    }
  }
}

</style>
