<template>
  <transition name="fade">
    <div v-show="isShow" class="layer-wrapper">
      <div class="mask">
        <transition
          enter-active-class="prizeBounceInDown"
          leave-active-class="prizeBounceOutUp"
        >
          <div v-show="isShow" class="container animated">
            <!-- <img class="coin-small" src="./img/coin_small.png">
            <img class="coin-big" src="./img/coin_big.png"> -->
            <slot name="content">
              <div class="content ">
                <div class="tips">首次进入活动即可获得开门红包哦~</div>
                <div class="prize-list">
                  <div v-for="(item, index) in prizeList" :key="index" class="prize-item">
                    <span class="prize-value">{{ item.prizeValueDesc }}</span>
                    <span class="prize-name">{{ item.prizeName }}</span>
                  </div>
                </div>
              </div>
            </slot>
            <transition
              enter-active-class="bounceInUp"
              leave-active-class="bounceOutDown"
            >
              <div v-show="isShow" class="animated footer">
                <div class="btn" @click="close" />
                <div class="position">奖励已下发至【我的】-【{{ couponPageName }}】中，请您尽快使用。</div>
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { getRect } from '@/mobile/utils'
var iCancel = window.cancelAnimationFrame || window.clearTimeout
const cubic = value => Math.pow(value, 3)
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2
export default {
  name: 'PrizeLayer',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    prizeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scrolled: false,
      couponPageName: process.env.CHANNEL === 'qb' ? '福利券' : '优惠福利'
    }
  },
  watch: {
    isShow(value) {
      if (value && !this.scrolled) {
        // 获奖框滚动
        this.$nextTick(() => {
          const el = document.querySelector('.prize-list')
          const rect = getRect(el)
          setTimeout(() => {
            this.scrolled = true
            this.scrollTo(el, rect.height)
          }, 1000)
        })
      }
    }
  },
  mounted() {
  },
  methods: {
    close() {
      this.$emit('update:isShow', false)
      this.$emit('close')
    },
    scrollTo(el, height) {
      const beginTime = Date.now()
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
      let rafid = 0
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 800
        if (progress < 1) {
          el.scrollTop = 1 * (1 + easeInOutCubic(progress))
          iCancel(rafid)
          rafid = rAF(frameFunc)
        } else {
          el.scrollTop = height
          iCancel(rafid)
        }
      }
      rafid = rAF(frameFunc)
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .6s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 1;
  }
  .layer-wrapper {
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }

  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
      .coin-small {
        display: block;
        position: absolute;
        top: 4.72rem;
        left:1.1rem;
        z-index: 9;
        width: .37rem;
        height: .39rem;
      }
      .coin-big {
        display: block;
        position: absolute;
        top: 1.5rem;
        left: 5.9rem;
        width: .54rem;
        height: .58rem;
        z-index: 9;
      }
    // .content {
    //   position: relative;
    //   width: 4.8rem;
    //   height: 6.09rem;
    //   box-sizing: border-box;
    //   padding: 2.38rem 0 0;
    //   margin: 0 auto;
    //   text-align: center;
    //   background: url('./img/bg.png') no-repeat;
    //   background-size: 100% auto;

    //   .prize-list {
    //    padding: .22rem 0 0;
    //   }

    // .prize-item {
    //   display: flex;
    //   width: 3.78rem;
    //   height: .74rem;
    //   line-height: .74rem;
    //   margin: .1rem auto 0;
    //   background: url('./img/prize_item_bg.png') no-repeat;
    //   background-size: 100% auto;
    //   color: rgb(126, 21, 19);
    //   text-align: left;
    //   .prize-value {
    //     width: 1.58rem;
    //     margin: 0 0 0 .58rem;
    //     font-size: .3rem;
    //   }
    //   .prize-name {
    //     flex: 1;
    //     font-size: .22rem;
    //   }
    // }
    // }
    .tips {
      font-size: .22rem;
      color: rgb(242, 199, 153);
      line-height: 1;
    }

  }
  .footer{
    width: 100%;
    left: 50%;
    position: relative;
    transform: translate3d(-50%, -50%, 0);
    text-align: center
  }
  .btn {
    position: relative;
    left: 0;
    right:0;
    width: 3.95rem;
    height: .88rem;
    line-height: .88rem;
    // margin: -0.5rem auto 0;
    box-sizing: border-box;
    padding: .13rem 0 0;
    background: url('./img/happbtn.png') no-repeat;
    background-size: 100% auto;
    font-size: .3rem;
    color: rgb(148, 26, 16);
    text-align: center;
    top: -0.26rem;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

  }
  .position {
    top:0rem;
    position: relative;
    width: 100%;
    font-size: .22rem;
    color: rgb(255, 255, 255);
    text-align: center;
  }
</style>
