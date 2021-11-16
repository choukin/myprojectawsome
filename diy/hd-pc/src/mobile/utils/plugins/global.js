// import { isAndroid, isIOS, dpr, isQBApp, isWKApp, isApp, isWeChat, isQB, isWK, isIPhoneX, safeAreaTop, safeAreaBottom, appHeadHeight, appHeaderHeight } from '../app'
import { mapGetters } from 'vuex'
import {
  dpr,
  isIOS,
  isAndroid,
  isQBApp,
  isWKApp,
  isWeChat, // 是否是微信环境
  isApp, // 是否是app环境
  isQB, // 钱包渠道
  isWK,
  isIPhoneX,
  safeAreaTop,
  safeAreaBottom,
  appHeadHeight, // 标题栏高度
  appHeaderHeight// 标题栏加状态栏高度
} from '@/mobile/utils/app/utils'
// APP环境
window.$isAndroid = isAndroid
window.$isIOS = isIOS
window.$dpr = dpr
window.$isQBApp = isQBApp // 是否钱包APP
window.$isWKApp = isWKApp // 是否悟空app
window.$isAPP = isApp // 是否是app环境
window.$isWeChat = isWeChat // 是否是微信环境
window.$isQB = isQB // 钱包渠道
window.$isWK = isWK // 悟空渠道
window.$isIPhoneX = isIPhoneX
window.$safeAreaTop = safeAreaTop
window.$safeAreaBottom = safeAreaBottom
window.$appHeaderHeight = appHeaderHeight
window.$appHeadHeight = appHeadHeight
const channel = process.env.CHANNEL || 'qb'
window.channel = channel
/**
 * 环境插件
 * @param {*} Vue
 * @example
 * // Vue 组件里面
 * this.$isQBApp
 */
const globalPlugin = {
  install(Vue) {
    // 3. 注入组件选项
    Vue.mixin({
      computed: {
        ...mapGetters(['userInfo'])
      },
      created: function() {

      },
      methods: {
        resetForm(formname) {
          this.$refs[formname].resetFields()
        },
        gotoRouterName(pathname) {
          this.$router.push(pathname)
        }
      }
    })
    Vue.prototype.$imghost = process.env.VUE_APP_IMGHOST
    Vue.prototype.$dpr = dpr
    Vue.prototype.$channel = channel
    Vue.prototype.$isIOS = isIOS
    Vue.prototype.$isAndroid = isAndroid
    Vue.prototype.$isQBApp = isQBApp
    Vue.prototype.$isWKApp = isWKApp
    Vue.prototype.$isWKApp = isWKApp
    Vue.prototype.$isApp = isApp
    Vue.prototype.$isWeChat = isWeChat
    Vue.prototype.$isQB = isQB
    Vue.prototype.$isWK = isWK
    Vue.prototype.$isIPhoneX = isIPhoneX
    Vue.prototype.$safeAreaTop = safeAreaTop
    Vue.prototype.$safeAreaBottom = safeAreaBottom
    Vue.prototype.$appHeadHeight = appHeadHeight
    Vue.prototype.$appHeaderHeight = appHeaderHeight
  }
}

export default globalPlugin
