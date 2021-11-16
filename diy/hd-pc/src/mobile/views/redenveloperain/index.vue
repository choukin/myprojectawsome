<!--  -->
<template>
  <div class="game-wrap">
    <!-- 加载进度 -->
    <Progress v-show="isLoading" :progress="gameInfo.progress" />
    <!--  游戏主场 -->
    <div v-show="!isLoading" ref="gameContainer" class="game-container" />
    <!-- 开场时间 -->
    <!-- <transition
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
    >
      <opening-time
        v-show="!isLoading && gameInfo.showOpeningTime"
        ref="openingTime"
        :time="gameInfo.beginTime"
        class="animated"
        @finished="updateGameButton"
      />
    </transition> -->
    <!-- 规则 -->
    <RuleDialog v-if="gameInfo.showRule" :show.sync="gameInfo.showRule" :activity-desc="gameInfo.activityDesc" />
    <InfoDialog v-if="gameInfo.showInfo" :show.sync="gameInfo.showInfo" :type="gameInfo.type" @reset="oneAgain" />
    <LuckyDialog v-if="gameInfo.showPrize" :show.sync="gameInfo.showPrize" :prize-infos="gameInfo.userPrizeList" @reset="oneAgain" />
    <!-- <prize-layer :is-show="gameInfo.showPrize" @close="happyToAccept">
      <template slot="content">
        <div class="game-content animated">
          <div ref="prizeList" class="prize-list">
            <prize-item v-for="(item,index) in gameInfo.userPrizeList" :key="index+item.prizeName" :item="item" />
          </div>
        </div>
      </template>
    </prize-layer> -->
  </div>
</template>

<script>
import Game from './game/index'
import Progress from './components/progress.vue'
// import OpeningTime from './components/opening-time.vue'
// import OverlayRule from './components/overlay-rule'
// import PrizeLayer from './components/prize-layer/prize-layer'
// import PrizeItem from './components/prize-item/prize-item'
import { mapGetters } from 'vuex'
import { giftRainCode } from '@/mobile/url/api'
import { closeWebView } from '@/mobile/utils/app'
import wechat from '@/mobile/utils/mixin/wechat'
import InfoDialog from '@/mobile/components/info-dialog'
import RuleDialog from '@/mobile/components/rule-dialog'
import LuckyDialog from '@/mobile/components/luckys-dialog'

// import { setLeftBackItemAction } from '@/mobile/utils/app/wk/jsbridge'
export default {
  name: 'RedPackRain',
  components: {
    Progress,
    // OpeningTime,
    RuleDialog,
    InfoDialog,
    // PrizeLayer,
    // PrizeItem,
    LuckyDialog
  },
  mixins: [wechat],
  data() {
    return {
      isLoading: true,
      game: null
    }
  },
  computed: {
    ...mapGetters(['gameInfo'])
  },
  watch: {
    gameInfo: {
      handler: function(val, oldVal) {
        if (this.gameInfo.progress === 100) {
          setTimeout(() => {
            this.isLoading = false
          }, 1000)
        }
      },
      deep: true
    }
  },
  async mounted() {
    this.getRainInfo()
  },
  created() {
    window.handlerBackBtn = () => {
      const gameState = this.gameInfo.gameState
      // 游戏不是进行中的状态直接关闭页面
      if (gameState !== 'play') {
        closeWebView()
      } else {
        // 弹框提示
        this.game && this.game.pause()
        this.$messageBox({
          title: '退出将错过更多奖励哦~确定退出吗？',
          message: '已接到的奖励将下发到您的账户中。',
          buttons: ['继续接红包', '残忍离开']
        }).then((index) => {
          // 点击离开 如果接到了物体先发放
          if (index === 1) {
            // 请求获奖接口
            if (this.game && this.game.awardPrizeList) {
              this.game.gameEnd()
              // this.$store.dispatch('sendUserPrizeList', { awardPrizeList: this.game.awardPrizeList })
            } else {
              closeWebView()
            }
          } else {
            // 继续游戏
            this.game && this.game.gemeRestart()
          }
        })
      }
    }
    if (this.$isApp) {
      if (this.$isQBApp) {

        // Navigation.setLeftItemAction('window.handlerBackBtn()')
      } else if (this.$isWKApp) {
        // setLeftBackItemAction(window.handlerBackBtn)
      }
    }
  },
  methods: {
    oneAgain() {
      this.fetchActInfoByCode()
      // 渲染开始界面
      this.game.renderStartScenes()
      // 销毁界面
      this.game.destoryPayingScenes()
    },
    async getRainInfo() {
      // 请求数据
      // const [rainInfo, error] = await this.$fetchPost(ACTIVITY.detail + '/' + this.userInfo.activityCode, { activityCode: giftRainCode }, { showLoading: false,
      //   codeHandle: {
      //     '10000026': 'skip', // 活动已结束
      //     '10000036': 'skip' // 本场红包雨已经结束
      //   }})

      // this.$loading(false)
      // console.log(error, rainInfo)
      // error && this.handleError(error)
      // if (rainInfo.activityEnd) {
      //   this.handleError({ code: '1', message: '活动已结束去看看其他活动吧' })
      //   return false
      // }
      // !error && this.setGameInfo(rainInfo)
      this.game = new Game(
        this.$refs.gameContainer,
        {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          backgroundColor: '0xc52420'
        },
        this)

      // document.addEventListener('backbutton', () => {
      //   this.game.pause()
      // })
    },
    /**
       * 倒计时结束
       */
    updateGameButton() {
      this.game.updateBtnTexture()
      this.$store.dispatch('setGameInfo', { showOpeningTime: false, gameState: 'start', beginTime: 0 })
    },
    /**
       * 收下礼物
       */
    async happyToAccept() {
      this.$store.dispatch('setGameInfo', { showPrize: false })
      // 请求数据
      const [rainInfo, error] = await this.$fetchPost('', { activityCode: giftRainCode }, { showLoading: false,
        codeHandle: {
          '10000026': 'skip', // 活动已结束
          '10000036': 'skip' // 本场红包雨已经结束
        }})
      error && this.handleError(error)
      if (rainInfo.activityEnd) {
        this.handleError({ code: '1', message: '活动已结束去看看其他活动吧' })
        return false
      }
      setTimeout(() => {
        !error && this.setGameInfo(rainInfo)

        // 渲染开始界面
        this.game.renderStartScenes()
        // 销毁界面
        this.game.destoryPayingScenes()
      }, 500)
    },
    handleError(errorInfo) {
      if (errorInfo && errorInfo.code && errorInfo.message) {
        this.$messageBox({
          message: errorInfo.message,
          buttons: ['返回首页']
        }).then((res) => {
          closeWebView()
        })
        return false
      }
    },
    /**
       * 设置游戏初始信息
       */
    setGameInfo(rainInfo) {
      this.$store.dispatch('setGameInfo', {
        ...rainInfo,
        beginTime: rainInfo.beginTime,
        showOpeningTime: rainInfo.beginTime > 0,
        gameState: rainInfo.beginTime > 0 ? 'pending' : 'start',
        showPrize: false
      })
    }
  }
}

</script>
<style lang='scss' >
.game-wrap{
  background-color:#6f0c0a;
}
.game-container{
    min-width: 100%;
    min-height: 100%;
    width: 100%;
    height: 100%;
    border: 0;
    margin: 0;
    padding: 0;
    background: #444;
    overflow: hidden;
}

    .game-content {
      position: relative;
      width: 5.66rem;
      height: 5.42rem;
      box-sizing: border-box;
      padding: .64rem .48rem 0;
      margin: 0 auto;
      text-align: center;
      background: url('./img/prize.png') no-repeat;
      background-size: 100% auto;
      .coin-small {
        display: block;
        position: absolute;
        top: 4.72rem;
        left: -0.26rem;
        width: .37rem;
        height: .39rem;
      }
      .coin-big {
        display: block;
        position: absolute;
        top: 1.5rem;
        left: 4.6rem;
        width: .54rem;
        height: .58rem;
      }
     .prize-list {
       width:4.02rem;
       height: 2.5rem;
      //  padding: 0rem .4rem;
          margin: auto;
       overflow:scroll;
       box-sizing: border-box;
    }
    }

</style>
