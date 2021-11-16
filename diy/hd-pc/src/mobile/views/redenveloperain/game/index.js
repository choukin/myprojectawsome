import * as PIXI from 'pixi.js-legacy'
import TWEEN from '@tweenjs/tween.js'
// import {
//   rawFetchPost
// } from '@/mobile/utils/request.js'
// import { messageBox } from '@/mobile/utils/popups.js'
import {
  raf,
  cancelRaf,
  isSameSecond,
  parseTimeData,
  _debounce
} from '@/mobile/utils'
// import {
//   API, giftRainCode
// } from '@/mobile/url/api'
// import * as Stats from 'stats.js'
import store from '@/mobile/store'
// import { H5URL } from '@/url/index'
import {
  reSizeSpirte,
  px2rem,
  contain,
  randomInt,
  hitTestRectangle,
  vibrate,
  shuffle,
  getRepeatNum,
  object2Array
} from './gameHelper'

import ResizeSprite from './ResizeSprite'
import {
  getScoreAnimate,
  timeBarProgress,
  heartBeat,
  // fadeOutLeft,
  bounceOutUp,
  bounceOutDown,
  bounceInUp,
  // fadeInfinity,
  // fadeInLeft,
  // fadeIn,
  bounceInDown
} from './animate'
// TODO: 上线时去掉
// const stats = new Stats()
// stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom)
const AnimatedSprite = PIXI.AnimatedSprite
const TextStyle = PIXI.TextStyle
const Text = PIXI.Text
const Graphics = PIXI.Graphics
const Container = PIXI.Container
const TilingSprite = PIXI.TilingSprite

export default class Game extends PIXI.Application {
  //
  container
  options
  root
  realScreen
  gameScene // 游戏容器
  gameBg // 游戏背景图
  resources // 资源
  state
  animatedSp
  duration = 15000
  aniId
  animateId = 0
  speed = 12
  surpriseSize = 4 // 每秒生成4个下落物体
  preSurpriseArray = [] // 预生成下落物体类型数组
  surpriseSum = 0 // 物体总数量
  surpriseArray = [] // 下落中物体数组
  prizeList = [] // 可获得的奖励数量
  awardPrizeList = []
  constructor(element, options, vueElement) {
    super(options)
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.options = options
    this.container = element // document.getElementById(element)
    this.container.appendChild(this.view)
    this.loadResoursce()
    this.root = new Container()
    this.stage.addChild(this.root)
    this.renderer.view.style.display = 'block'
    this.vueElement = vueElement
  }

  /**
   * 加载资源
   */
  loadResoursce() {
    console.log(process.env)
    console.log(`${process.env.VUE_APP_assetsPublicPath}static/game/redenveloperain/startspritesheet.json`)
    this.loader

      .add('start', `${process.env.VUE_APP_assetsPublicPath}static/game/redenveloperain/startspritesheet.json`)
      .add('play', `${process.env.VUE_APP_assetsPublicPath}static/game/redenveloperain/playspritesheet.json`)
      .add('redplay', `${process.env.VUE_APP_assetsPublicPath}static/game/redenveloperain/redenveloperain.json`)
      // .onLoad(this.loadProgressHandler)
      // // .on('progress', this.loadProgressHandler)

    // .load(() => {
    //   this.setUp()
    // })
    this.loader.load((loader, resources) => {
      // console.log('12313')
      // resources is an object where the key is the name of the resource loaded and the value is the resource object.
      // They have a couple default properties:
      // - `url`: The URL that the resource was loaded from
      // - `error`: The error that happened when trying to load (if any)
      // - `data`: The raw data that was loaded
      // also may contain other properties based on the middleware that runs.
      // sprites.bunny = new PIXI.TilingSprite(resources.bunny.texture)
      // sprites.spaceship = new PIXI.TilingSprite(resources.spaceship.texture)
      // sprites.scoreFont = new PIXI.TilingSprite(resources.scoreFont.texture)
    })
    this.loader.onProgress.add(() => {
      store.dispatch('setGameInfo', {
        progress: this.loader.progress
      })
      console.log(this.loader.progress)
    })
    this.loader.onComplete.add(() => {
      this.setUp()
    })
  }
  loadProgressHandler(loader, resource) {
    loader.error && console.error(loader.error) // 提示加载错误信息
    if (loader.progress > 99.99) {
      loader.progress = 100
    }
    store.dispatch('setGameInfo', {
      progress: loader.progress
    })
  }
  // 开始游戏
  setUp = async() => {
    this.resources = this.loader.resources
    this.startTextures = this.resources['start'].textures
    this.playTextures = this.resources['play'].textures
    this.redTextures = this.resources['redplay'].textures
    this.playspritesheet = this.resources['play'].spritesheet
    console.log(this.redTextures['bg.png'])
    console.log(this.gameBg)
    this.gameBg = new ResizeSprite(this.redTextures['bg.png'])
    // this.gameBg = new ResizeSprite(this.startTextures['bg.png'])

    this.root.addChild(this.gameBg)
    this.renderStartScenes()
  }

  /**
   * 设置开始场景
   */
  renderStartScenes() {
    this.startScenes = new Container()
    this.root.addChild(this.startScenes)
    this.renderHorizontalBatch()
    this.renderStartSensenBottom()
    // this.renderLeafs()
    this.startSenesAnimate()
  }

  /**
   * 渲染底部叶子
   */
  // renderLeafs() {
  //   const rightleaf = new ResizeSprite(this.startTextures['rightleaf.png'])
  //   const leftleaf = new ResizeSprite(this.startTextures['leftleaf.png'])
  //   //
  //   leftleaf.x = 0
  //   leftleaf.y = this.options.height - leftleaf.height
  //   rightleaf.x = this.options.width - rightleaf.width
  //   rightleaf.y = this.options.height - rightleaf.height
  //   this.startScenes.addChild(rightleaf)
  //   this.startScenes.addChild(leftleaf)
  // }

  /**
   * 开始场景头部元素
   */
  renderHorizontalBatch() {
    this.horizontalBatch = new Container()
    this.horizontalBatch.alpha = 0
    // 规则
    const rule = new ResizeSprite(this.startTextures['explainbtn.png'])
    rule.x = 0 // this.options.width - rule.width
    rule.y = px2rem(40)
    rule.buttonMode = true
    rule.interactive = true
    rule.on('tap', () => {
      store.dispatch('setShowRule', true)
    }).on('click', () => {
      store.dispatch('setShowRule', true)
    })
    this.horizontalBatch.addChild(rule)
    // 我的奖励
    const prizebtn = new ResizeSprite(this.startTextures['prizebtn.png'])
    prizebtn.x = 0 // this.options.width - rule.width
    prizebtn.y = px2rem(100)
    prizebtn.buttonMode = true
    prizebtn.interactive = true
    prizebtn.on('tap', () => {
      this.vueElement.gotoPrizeList()
      // pushWindowByRouter('rewardList', {
      //   hideNavBar: false,
      //   showWkLoading: true,
      //   forbiddenBounce: true
      // })
    }).on('click', () => {
      // pushWindowByRouter('rewardList', {
      //   hideNavBar: false,
      //   showWkLoading: true,
      //   forbiddenBounce: true
      // })
    })
    this.horizontalBatch.addChild(prizebtn)
    // 添加喜从天降头图
    // this.batch = new ResizeSprite(this.startTextures['topicon.png'])
    // this.batch.anchor.set(0.5, 0)
    // this.batch.x = this.options.width / 2
    // this.batch.y = px2rem(154)
    // this.horizontalBatch.addChild(this.batch)
    // fontSize 比设计稿大一倍 解决1倍屏幕模糊问题
    // const style = new TextStyle({
    //   fontSize: px2rem(60),
    //   fill: '0xE93B33'
    // })
    // const playTips = '会员回馈金、本金券等等你接~'
    // this.hbmessage = new Text(playTips, style)
    // 解决文字模糊问题
    // this.hbmessage.scale.set(0.5)
    // this.hbmessage.anchor.set(0.5, 0)
    // this.hbmessage.x = this.options.width / 2
    // this.hbmessage.y = this.batch.y + this.batch.height + px2rem(40)
    // const radius = px2rem(20)
    // // 圆角矩形
    // const outerBar = new Graphics()
    // outerBar.beginFill(0xFBDF82)
    // outerBar.anchor.set(0.5, 0)
    // const width = this.hbmessage.width + px2rem(80)
    // const x = (this.options.width - width) / 2
    // this.hbmessage.height + 10
    // const height = px2rem(50)
    // outerBar.drawRoundedRect(x, this.hbmessage.y - px2rem(8), width, height, radius)
    // outerBar.endFill()
    // this.horizontalBatch.addChild(this.batch)
    // this.horizontalBatch.addChild(outerBar)
    // this.horizontalBatch.addChild(this.hbmessage)
    this.startScenes.addChild(this.horizontalBatch)
  }

  // ------------------ 动画 ---------------
  /**
   * 游戏开场动画
   */
  startSenesAnimate() {
    // 头部云和横批动画
    bounceInDown(this.horizontalBatch).start()
    bounceInUp(this.centerContainer.startButton).start()
    // 右侧淡入 fade
    this.buttonTw = heartBeat(this.centerContainer.startButton).start()
    this.animate()
  }
  /**
   * 开始游戏销毁开始前元素动画
   */
  detoryStartScenesAnimate() {
    // 头部云和横批动画
    bounceOutUp(this.horizontalBatch).start()
    bounceOutDown(this.centerContainer.startButton).start()

    this.destroyStartScenes()
  }

  renderStartSensenBottom() {
    this.centerContainer = new Container()
    this.centerContainer.y = this.horizontalBatch.height + px2rem(80)
    this.startScenes.addChild(this.centerContainer)
    this.renderStartButton()
  }

  /**
   * 渲染底部button
   * @param {*} giftbox
   */
  renderStartButton(giftbox) {
    this.buttonContainer = new Container()
    // this.buttonContainer.y = giftbox.height + px2rem(60)
    const buttonimg = 'btn.png'// store.state.gameInfo.gameState === 'pending' ? 'shoppingbtn' : 'playbtn'

    const startButton = new ResizeSprite(this.redTextures[buttonimg])
    startButton.alpha = 0
    startButton.anchor.x = 0.5
    startButton.interactive = true
    startButton.buttonMode = true
    startButton.x = this.options.width / 2
    startButton.y = this.centerContainer.y + px2rem(660)
    this.buttonContainer.addChild(startButton)
    this.centerContainer.startButton = startButton
    this.centerContainer.startButtonClickAble = true
    this.centerContainer.addChild(this.buttonContainer)
    // 给按钮添加事件
    startButton.on('touchstart', _debounce(() => {
      if (this.centerContainer.startButtonClickAble) {
        this.handlerButton()
        this.centerContainer.startButtonClickAble = true
      }
    }, 800))
  }
  /**
   * 更新开始按钮图片
   */
  updateBtnTexture() {
    this.centerContainer && (this.centerContainer.startButton.texture = this.startTextures['playbtn.png'])// this.resources['startbtn'].texture)
  }
  /**
   * 点击开始按钮
   */
  handlerButton() {
    const gameInfo = store.state.gameInfo
    if (!gameInfo.activityCode) {
      return false
    }
    console.log(gameInfo)

    this.detoryStartScenesAnimate()
    // rawFetchPost(API.prizeInfo,
    // { playNumKey: gameInfo.playNumKey, activityCode: giftRainCode },
    // { showLoading: false,
    //   codeHandle: {
    //     '10000030': 'skip', // 已经参与本场活动
    //     '10000026': 'skip', // 活动已结束
    //     '10000036': 'skip' // 本场红包雨已经结束
    //   }
    // })
    // .then(res => {
    //   this.centerContainer.startButtonClickAble = true
    //   this.prizeList = res.prizeList
    //   this.detoryStartScenesAnimate()
    // }).catch(e => {
    //   // 处理异常情况
    //   messageBox({ message: e.message, buttons: ['返回首页'] })
    //     .then(res => {
    //       closeWebView()
    //     })
    //   console.error(e)
    // })
  }

  /**
   * TODO:
   * 删除开始场景
   */
  destroyStartScenes() {
    cancelRaf(this.animateId)
    this.root.removeChild(this.startScenes)
    // 优化会重复渲染游戏场景的情况
    if (store.state.gameInfo.gameState !== 'play') {
      this.renderPayingScenes()
    }
  }
  /**
   * 渲染游戏开始界面
   */
  renderPayingScenes() {
    this.playContainer = new Container()
    this.playContainer.isMask = true
    // this.playContainer.alpha =
    let readyGo = new AnimatedSprite(this.playspritesheet.animations['ready_go'])
    readyGo = reSizeSpirte(readyGo)
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0x000000, 0.8)
    graphics.drawRect(0, 0, 5000, 5000)
    graphics.endFill()
    this.playContainer.addChild(graphics)
    this.playContainer.addChild(readyGo)
    readyGo.anchor.set(0.5)
    // 设置动画精灵的速度
    readyGo.animationSpeed = 0.02
    readyGo.x = this.options.width / 2
    readyGo.y = this.options.height / 2
    readyGo.loop = false
    readyGo.play()
    readyGo.onComplete = () => {
      readyGo.destroy()
      this.renderMonkey()
      this.renderClock()
      this.preSurpriseArray = this.preCreatSurprise()
      this.surpriseSum = this.preSurpriseArray.length
      store.dispatch('setGameInfo', {
        gameState: 'play'
      })
      this.gameStart()
    }
    this.stage.addChild(this.playContainer)
  }
  /**
   * 销毁游戏场景
   */
  destoryPayingScenes() {
    this.playContainer && this.playContainer.destroy()
  }
  /**
   * 渲染游戏进行时的倒计时进度条
   */
  renderClock() {
    this.clockContainer = new Container()
    this.clock = new ResizeSprite(this.playTextures['clock.png'])
    this.clock.anchor.set(0.5)
    this.clock.x = px2rem(192)
    const timeProgressWidth = px2rem(350)
    const timeProgressHeight = px2rem(21)
    const radius = px2rem(9)
    // 圆角矩形
    const outerBar = new Graphics()
    outerBar.beginFill(0xffd5a3)
    outerBar.drawRoundedRect(this.clock.x, this.clock.y - 4, timeProgressWidth, timeProgressHeight, radius)
    outerBar.endFill()
    const style = new TextStyle({
      fontSize: px2rem(28),
      fill: '0xf5a446'
    })

    // 倒计时时间展示
    const gameTimeText = new Text(``, style)
    gameTimeText.x = this.clock.x + outerBar.x + outerBar.width + 6
    gameTimeText.y = outerBar.y - outerBar.height / 2
    this.clockContainer.gameTimeText = gameTimeText
    // 添加平铺背景图片
    const progSprite = new TilingSprite(this.playTextures['progress.png'])
    //, timeProgressWidth, timeProgressHeight
    progSprite.width = timeProgressWidth
    progSprite.height = timeProgressHeight
    // 垂直放大平铺图形 偷懒实现方式
    progSprite.tileScale.y = 6
    progSprite.x = this.clock.x
    progSprite.y = this.clock.y - 4
    this.clockContainer.progSprite = progSprite

    const innerBar = new Graphics()
    innerBar.beginFill(0xff9933)
    innerBar.drawRoundedRect(this.clock.x, this.clock.y - 4, timeProgressWidth, timeProgressHeight, radius)
    innerBar.endFill()
    this.clockContainer.innerBar = innerBar
    progSprite.mask = innerBar
    // 设置动画时间
    const continueTime = store.state.gameInfo.continueTime
    innerBar.duration = continueTime
    // 倒计时进度条动效
    this.innerWidthTW = timeBarProgress(innerBar, this.clock)
    this.endTime = Date.now() + continueTime
    // 获取剩余时间
    const remain = this.getRemain()
    const timeData = parseTimeData(remain)
    gameTimeText.text = `${timeData.seconds}s`
    this.clockContainer.addChild(innerBar)
    this.clockContainer.addChild(outerBar)
    this.clockContainer.addChild(gameTimeText)
    this.clockContainer.addChild(progSprite)
    this.clockContainer.addChild(this.clock)
    this.clockContainer.y = px2rem(110)
    this.playContainer.innerBar = innerBar
    this.playContainer.addChild(this.clockContainer)
  }
  /**
   * 渲染游戏角色
   */
  renderMonkey() {
    this.monkeyContainer = new Container()

    this.monkey = new ResizeSprite(this.redTextures['plate.png'])
    this.monkeyContainer.addChild(this.monkey)
    // -1 解决间隙问题
    this.monkeyContainer.height = this.monkey.height
    this.monkeyContainer.width = this.monkey.width
    // 设置动画精灵可交互
    this.monkeyContainer.interactive = true
    // 设置动画精灵按钮模式
    this.monkeyContainer.buttonMode = true

    // 添加监听事件
    this.monkeyContainer
      .on('touchstart', this.onDragStart)
      .on('touchcancel', this.onDragEnd)
      .on('touchend', this.onDragEnd)
      .on('touchendoutside', this.onDragEnd)
      .on('touchmove', () => {
        this.onDragMove(this.monkeyContainer)
      })
      .on('mousedown', this.onDragStart)
      .on('mouseup', this.onDragEnd)
      .on('mouseupoutside', this.onDragEnd)
      .on('mousemove', () => {
        this.onDragMove(this.monkeyContainer)
      })
    this.monkeyContainer.y = this.options.height - this.monkey.height - px2rem(34)
    // 游戏角色居右
    this.monkeyContainer.x = (this.options.width - this.monkeyContainer.width) / 2
    this.playContainer.addChild(this.monkeyContainer)
  }
  /**
   * 开始拖拽
   * @param {*} event
   */
  onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data
    // this.alpha = 0.5
    this.dragging = true
  }
  /**
   *  放弃拖砖
   */
  onDragEnd() {
    this.dragging = false
    // set the interaction data to null
    this.data = null
  }
  /**
   * 开始拖拽
   * @param {*} animatedSp
   */
  onDragMove(hero) {
    if (hero.dragging) {
      const newPosition = hero.data.getLocalPosition(hero.parent)
      hero.position.x = newPosition.x
      // 限制猴子的滑动范围
      contain(hero, {
        x: 0,
        y: 0,
        width: this.options.width,
        height: this.options.height,
        resolution: 2
      })
    }
  }

  /**
   * 暂停重新开始
   */
  gemeRestart() {
    this.endTime = Date.now() + parseInt(this.continueTime) * 1000
    const innerBar = this.playContainer.innerBar
    innerBar.duration = this.getRemain()
    this.innerWidthTW = timeBarProgress(innerBar, this.clock)
    this.gameStart()
  }
  /**
   * 游戏开始
   */
  gameStart() {
    store.dispatch('setGameInfo', {
      gameState: 'play'
    })

    // stats.begin()
    this.rafId = raf(() => {
      const remain = this.getRemain()
      // 平铺图片运动
      const leftTime = parseTimeData(remain).seconds
      this.continueTime = leftTime
      this.clockContainer.gameTimeText.text = leftTime + 's'
      if (!isSameSecond(remain, this.remain) || this.remain === 0) {
        this.createSurprise(this.surpriseSize)
      }
      this.setRemain(remain)
      this.fallingDown()
      // stats.end()
      TWEEN.update()
      if (this.remain !== 0) {
        this.gameStart()
      }
    })
  }
  /**
   * 游戏暂停
   */
  pause() {
    store.dispatch('setGameInfo', {
      gameState: 'pause'
    })
    TWEEN.remove(this.innerWidthTW)
    // this.innerWidthTW.stop()
    cancelRaf(this.rafId)
  }
  /**
   * 游戏结束
   */
  gameEnd() {
    this.pause()
    this.surpriseArray = []
    // 统计数组里重复元素个数
    const tempArray = getRepeatNum(this.awardPrizeList)
    // 对象转数组格式
    this.awardPrizeList = object2Array(tempArray)
    console.log(this.awardPrizeList)
    const awardPrizeCount = this.awardPrizeList[0] ? this.awardPrizeList[0].prizeNumber : 0
    // 请求获奖接口
    // TODO:
    store.dispatch('sendUserPrizeList', { awardPrizeCount, awardPrizeList: this.awardPrizeList })
  }
  /**
   * 惊喜物体降落
   * 碰撞检测
   */
  fallingDown() {
    this.surpriseArray.forEach((surprise, i) => {
      surprise.y += px2rem(surprise.vy)
      const globalPositionFlag = true
      // 猴子和箱子都检测碰撞
      const monkeyHitflag = hitTestRectangle(surprise, this.monkey, globalPositionFlag)
      // const boxHitflag = hitTestRectangle(surprise, this.monkeyBox, globalPositionFlag)

      if (monkeyHitflag) {
        const surpriseType = surprise.surpriseType
        // 物体可见并且不是雪花时才显示得分
        if (surprise.visible && surpriseType !== 'snow') {
          surprise.visible = false
          this.playContainer.removeChild(surprise)
          this.surpriseArray.splice(i, 1)
          // 碰撞后调用震动
          vibrate(200)
          this.score()
          // this.scoreData.index.push(i)
          this.awardPrizeList.push(surpriseType)
        } else {
          surprise.alpha = 0.7
        }
      }
    })
  }

  setRemain(remain) {
    this.remain = remain
    if (this.remain === 0) {
      this.gameEnd()
    }
  }
  getRemain() {
    return Math.max(this.endTime - Date.now(), 0)
  }
  /**
   * 预生成生成下落惊喜数组
   */
  preCreatSurprise() {
    const array = []
    const numbers = parseInt(this.duration / 1000 * this.surpriseSize)
    // for (let i = 0; i < this.prizeList.length; i++) {
    // const prizeTypeItem = this.prizeList[i]
    let redbgnums = store.state.gameInfo.allowDrawCount
    redbgnums = redbgnums > 15 ? 15 : redbgnums
    for (let j = 0; j < redbgnums; j++) {
      const prizeItem = {}
      prizeItem.surpriseType = 'redbg'// prizeTypeItem.prizeType
      array.push(prizeItem)
      // }
    }
    const snownumbers = numbers - array.length + 10
    for (let s = 0; s < snownumbers; s++) {
      array.push({
        surpriseType: 'snow'
      })
    }
    console.log(shuffle(array))
    return shuffle(array)
  }
  /**
   * TODO:
   * 生成惊喜下落物体
   */
  createSurprise(number) {
    // surprisecoupon.png 红包
    // surprisepoint.png 金币
    // surprisesnow.png 雪花
    // watermelon.png 西瓜
    //  lemon.png 柠檬
    const showSurprise = this.preSurpriseArray.splice(0, number)
    // 剩余下落物体数量
    const stackLength = this.preSurpriseArray.length
    // 前一半物体最大下落速度是 10 后面的是 12
    const speed = stackLength < number * 3 ? 8 : this.speed
    for (let i = 0; i < showSurprise.length; i++) {
      const surpriseType = showSurprise[i].surpriseType // randomInt(1, 3)
      let surprise
      // // 把雪花换成西瓜或者柠檬
      if (surpriseType === 'snow') {
        let tempType = 'raindrop'
        const yue = i % 3
        switch (yue) {
          case 0:
            tempType = 'raindrop'
            break
          case 1:
            tempType = 'snowflake'
            break
          case 2:
            tempType = 'gold'
            break

          default :
            tempType = 'raindrop'
            break
        }
        surprise = new ResizeSprite(this.redTextures[tempType + '.png'], 2)
      } else {
        console.log(surpriseType, 'surpriseType')
        surprise = new ResizeSprite(this.redTextures[`${surpriseType}.png`], 2)
      }
      surprise.surpriseType = surpriseType
      surprise.y = randomInt(0, 2 * surprise.height)
      surprise.x = randomInt(0, this.options.width - surprise.width)
      surprise.vy = speed
      this.surpriseArray.push(surprise)
      this.playContainer.addChild(surprise)
    }
  }
  /**
   * 接到一个物体后加展示 +1
   */
  score() {
    // 添加 +1 素材
    const plusOne = new ResizeSprite(this.playTextures['plus.png'])
    plusOne.alpha = 0
    // 获取盒子 全局定位
    const globalPoint = this.monkey.getGlobalPosition()
    plusOne.x = globalPoint.x
    plusOne.y = globalPoint.y
    this.playContainer.addChild(plusOne)
    getScoreAnimate({
      originy: globalPoint.y,
      targety: globalPoint.y - px2rem(40),
      target: plusOne
    })
  }
  animate = () => {
    TWEEN.update()
    this.animateId = raf(() => {
      this.animate()
    })
  }
}
