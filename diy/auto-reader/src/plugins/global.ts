import Vue, { PluginObject } from 'vue'
import { Component } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import {getUserBase} from '@/utils/cookies'
import {replaceURL} from '@/utils/tool'
const userAgent: string = window.navigator.userAgent || ''
//   const isWeChat = /MicroMessenger/i.test(useragent)
//   console.log(isWeChat, isWeChat)
// const dpr:number = document.documentElement.dataset.dpr || 1
export const isIOS: boolean = /iphone|ipad|ipod/i.test(userAgent)
export const isAndroid: boolean = /android/i.test(userAgent)
export const isWeChat: boolean = /MicroMessenger/i.test(userAgent) && !/miniProgram/i.test(userAgent) // 是否是微信环境
const isMiniProgram: boolean = /miniProgram/i.test(userAgent) // 是否是小程序环境
export const isMobile: boolean = /Mobile/i.test(userAgent) // 手机环境
export const isApp: boolean = /renwuzhuan/i.test(userAgent) // 手机环境

console.log(process.env)

@Component({
  name: 'BaseInfoMixin'
})
class BaseInfo extends Vue {
  get token() {
    return UserModule.token
  }

  get randomKey() {
    return UserModule.randomKey
  }
  get autoReader() {
    // console.log(UserModule.autoReader, 'UserModule.autoReader')
    return Boolean(UserModule.autoReader)
  }
  get userBase() {
    return getUserBase()
  }
  // get idCode() {
  //   return UserModule.idcode
  // }
  // get resetType() {
  //   console.log(UserModule.randomKey, UserModule.resettype)
  //   return UserModule.resettype
  // }
  set autoReader(autoReader) {
    UserModule.setAutoReader(autoReader)
  }
}
const global: PluginObject<typeof Vue> = {
  install(_Vue: typeof Vue) {
    // 3. 注入组件选项
    _Vue.mixin(BaseInfo)
    _Vue.prototype.$isIOS = isIOS
    _Vue.prototype.$isAndroid = isAndroid
    _Vue.prototype.$isWeChat = isWeChat
    _Vue.prototype.$isMiniProgram = isMiniProgram
    _Vue.prototype.$Host = process.env.VUE_APP_HOST
    _Vue.prototype.$tutorial = process.env.VUE_APP_TUTORIAL_UEL
    _Vue.prototype.$channelCode = process.env.VUE_APP_CHANNEL
    _Vue.prototype.$appPath = process.env.VUE_APP_PATH
    _Vue.prototype.$channel = 'orderWX'
    _Vue.prototype.$isApp = isApp
    _Vue.prototype.$replaceURL = replaceURL
    
  }
}
export default global
