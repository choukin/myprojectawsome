// import { H5URL } from '~/url'
// import { stringify } from 'qs'
// import store from '../../store'
// import { messageBox } from '@/mobile/utils/popups'
// // export const {
// //   runInApp,
// //   getAppUserInfo,
// //   getAppVersion,
// //   toLogin,
// //   realName,
// //   setTitle,
// //   setHeaderRightBtn,
// //   pushWindow,
// //   toHome,
// //   toInvest,
// //   toMine,
// //   toMemberClub,
// //   toOrders,
// //   toCoupon,
// //   toProductDetail,
// //   closeWebView,
// //   closeAllWindow,
// //   showConfirm,
// //   setLoading,
// //   openUrlInBrowser,
// //   closeToRoot,
// //   callbackExecute,
// //   showDelayTip,
// //   setStatusBarStyle,
// //   setH5Data,
// //   getH5Data,
// //   appShare,
// //   shareImg,
// //   setRightBtn
// // } = require(`./${process.env.CHANNEL}/`)

// export const {
//   dpr,
//   isIOS,
//   isAndroid,
//   isQBApp,
//   isWKApp,
//   isWeChat, // 是否是微信环境
//   isApp, // 是否是app环境
//   isQB, // 钱包渠道
//   isWK,
//   isIPhoneX,
//   safeAreaTop,
//   safeAreaBottom,
//   appHeadHeight, // 标题栏高度
//   appHeaderHeight// 标题栏加状态栏高度
// } = require('./utils')

// /**
//  * 打开协议PDF 页面
//  * @param {Object} options
//  * @param {string} options.file
//  * @param {string} options.titlename
//  * @example pushAgreement({file:'https://static.9f.cn/pos/%E4%B8%AD%E5%9B%BD%E6%B0%91%E7%94%9F%E9%93%B6%E8%A1%8C%E4%B8%AA%E4%BA%BA%E2%80%9C%E9%9A%8F%E5%BF%83%E5%AD%98%E2%80%9D%E5%AE%A2%E6%88%B7%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf,titlename:123'})
//  */
// export const pushAgreement = (options) => {
//   const windowUrl = H5URL.pdfViewer
//   pushWindow(`${windowUrl}?${stringify(options)}`)
// }

// /**
//    * 引导到app里打开页面
//    * @param {String} url  要打开的链接
//    */
// export const launchApp = (url) => {
//   let targeturl = url || window.location.href
//   targeturl = window.encodeURIComponent(targeturl)
//   window.location.href = `${H5URL.launchAppUrl}?open=${targeturl}`
// }
// /**
//    * 打开指定 vue-router path 页面
//    * @param {string} path 页面路径 vue-router path
//    * @param {string|object} query 查询字段
//    * @param {object} router vue 路由实例
//    * @example pushWindowByRouter('recharge',
//                            {}, this.$router)

//    */
// export const pushWindowByRouter = (path, query = {}, router) => {
//   const indexURl = window.location.href.split('#')[0]
//   let queryStr = ''
//   if (typeof query === 'object') {
//     if (query.hasOwnProperty('hideNavBar') && query.hideNavBar) {
//       query.forbiddenBounce = true
//     }
//     // 默认取消app隐藏loading
//     if (!query.hasOwnProperty('autoCancelLoading')) {
//       query.autoCancelLoading = false
//     }
//     queryStr = `?${stringify(query)}`
//   } else if (typeof query === 'string') {
//     queryStr = /^\?/.test(query) ? query : `?${query}`
//   }
//   const targetUrl = `${indexURl}#/${path}${queryStr}`
//   if (isQBApp || isWKApp) {
//     pushWindow(targetUrl)
//   } else { // 解决部分浏览器开发环境打不开页面问题
//     if (router) {
//       router.push(`${path}${queryStr}`)
//     } else {
//       window.location.href = targetUrl
//     }
//   }
// }

// /**
//  * 监听点击 android 实体返回事件
//  * @param {function} callback 默认是关闭当前webview操作
//  */
// export const listenBackButton = (callback) => {
//   if (!callback || typeof callback !== 'function') return
//   document.removeEventListener('backbutton', window.goback)
//   window.goback = callback
//   document.addEventListener('backbutton', window.goback)
// }

// export const loginIntercept = (fn) => {
//   const userInfo = (store && store.state.baseInfo) ? store.state.baseInfo : {}
//   return function(...arg) {
//     if (!userInfo.token && !userInfo.memberId) {
//       toLogin()
//     } else {
//       fn.apply(this, arg)
//     }
//   }
// }

// export const wechatIntercept = (fn) => {
//   console.log(111, store)
//   const userInfo = (store && store.state.baseInfo) ? store.state.baseInfo : {}
//   return function(...arg) {
//     if (!isApp) {
//       launchApp()
//     } else if (!userInfo.token) {
//       messageBox('登录信息已过期，请重新登录')
//         .then(toLogin)
//         .then(() => window.location.reload())
//         .catch(() => closeWebView())
//     } else {
//       fn.apply(this, arg)
//     }
//   }
// }

// /**
//  * viewResume方法
//  * 兼容钱包及悟空
//  * @param callback
//  */

// export const viewResumeCom = (callback) => {
//   isWK && document.addEventListener('viewResume', callback)
//   isQB && (isIOS ? document.addEventListener('viewResume', callback) : document.addEventListener('resume', callback))
// }

// export const formatRouter = (name, ext = {}) => {
//   const url = window.location.href.replace(window.location.hash, '').replace(window.location.search, '')
//   if (ext.hasOwnProperty('nativeBar') && ext.nativeBar) {
//     ext.hideNavBar = true
//     ext.forbiddenBounce = true
//     delete ext.nativeBar
//   }
//   const parmsformat = stringify(ext)
//   return (`${url}#${name}?${parmsformat}`)
// }
