// 公用样式
import './assets/style/reset.css'
// import './assets/style/animate.scss'
// import 'core-js/modules/es6.promise'
// import 'core-js/modules/es6.array.iterator'
// Libs
import Vue from 'vue'
import router from './router'
import { sync } from 'vuex-router-sync'
// 引入全局插件
import Popups from './utils/popups'
import Request from './utils/request'
import globalPlugin from '@/mobile/utils/plugins/global'
import store from './store'
import './libs/fastclick'
// 业务模块
import App from './App'
import { getURLParam } from '@/mobile/utils/'
import { Notify } from 'vant'
// import Vant from 'vant'
// import 'vant/lib/index.css'

Vue.use(Notify)
Vue.use(globalPlugin)
Vue.use(Popups)
Vue.use(Request)

// if (process.env.TARGET !== 'production' && process.env.TARGET !== 'beta' && process.env.TARGET !== 'gray') {
//   const VConsole = require('vconsole')
//   //  /* eslint-disable no-new */
//   window.VConsole = VConsole
//   const Launch = require('vconsole-launchapp')
//   const vConsole = new VConsole() // eslint-disable-line
//   const launchApp = new Launch(vConsole, {}, 'LaunchAPP', 'LaunchAPP')
//   vConsole.addPlugin(launchApp)
// }

Vue.config.productionTip = false // 关闭生产提示
sync(store, router) // 路由信息同步store
// 开发环境并且打开 mock 开关引入 mockjs
if (process.env.TARGET === 'development' && process.env.MOCK) {
  require('./mock')
}
// FastClick
// document.addEventListener('DOMContentLoaded', function() {
//   window.FastClick.attach(document.body)
// })

let userInfo = {}
console.log(process.env)
if (process.env.NODE_ENV === 'development') {
  userInfo = { token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjozLFwidXNlclR5cGVcIjpcIkNfVVNFUlwifSIsImNyZWF0ZWQiOjE2MTAwMzA2OTAyMDEsImV4cCI6MTYxMjYyMjY5MH0.Y-JwTJFRB_RTYwFFD_dN8xIH33Aaqd7hOu8ycCd3AfKgcVbaMK-ardtrLycnoNi8z8dNdpmZ_20S5P3lYcNtMA' }
}

main(userInfo)

// 业务入口
function main(baseInfo) {
  const activityCode = getURLParam('activityCode')
  baseInfo.activityCode = activityCode
  // baseInfo.parentActivityCode = getURLParam('parentActivityCode') || 'qb_spring_card_activity'
  // baseInfo = { token: 'e0140300cd1b03008c0305e16450431d86d0209962d76eba', 'memberId': '1000007201' }
  // baseInfo = {
  // token: '281503003d1a03009185fd8a4ff547febdd966ea7184b254',
  // memberId: '1000065039',
  // token: '2815030035a60200476987522af747689125c1bdbbf9e54d',
  // memberId: '1000104836'
  // token: 'ae140300-cb427b2b046f4bb8b8e4b194208b23b9'
  // }
  // 1000065039
  // "mobile":"15810505381","token":"e0140300a70902004b2eddf895c1450eab156a82f019eb12"{,"memberId":"1000007201","invitationCode":"5381MPGA"}
  store.dispatch('setBaseInfo', baseInfo)
  if (window.$vueInstance) {
    return false
  }
  /* eslint-disable no-new */
  window.$vueInstance = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
