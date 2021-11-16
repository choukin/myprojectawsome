/**
 * 封装常用环境常量
 */
export const dpr = document.documentElement.dataset.dpr || 1
export const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
export const isAndroid = /android/i.test(navigator.userAgent)
export const isQBApp = /jfwallet/i.test(navigator.userAgent)
export const isWKApp = /jfwklc/i.test(navigator.userAgent)
export const isWeChat = /MicroMessenger/i.test(navigator.userAgent) && !/miniProgram/i.test(navigator.userAgent)// 是否是微信环境
export const isMiniProgram = /miniProgram/i.test(navigator.userAgent) // 是否是小程序环境
export const isApp = isQBApp || isWKApp // 是否是app环境
export const isQB = process.env.CHANNEL === 'qb' // 钱包渠道
export const isWK = process.env.CHANNEL === 'wk' // 悟空渠道

/**
 * 当前机型是否为：iPhone X/Xr/Xs/Xs Max
 * @returns {boolean}
 */
export const isIPhoneX = () => {
  const screenH = window.screen.height
  const screenW = window.screen.width
  const isX = isIOS && ((screenH === 812 && screenW === 375) || (screenH === 896 && screenW === 414))
  return isX
}

export const safeAreaTop = (isQBApp && isIOS ? (isIPhoneX() ? 44 : 20) : 0) * dpr

export const safeAreaBottom = (isQBApp && isIOS ? (isIPhoneX() ? 34 : 0) : 0) * dpr
export const appHeadHeight = 44 * dpr // 标题栏高度
export const appHeaderHeight = appHeadHeight + safeAreaTop // 标题栏加状态栏高度

/**
 * 微信里在设置 document.title 基础上修改页面标题
 */
export const setWeChatTitle = () => {
  const body = document.getElementsByTagName('body')[0]
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.setAttribute('src', 'https://h5.9f.cn/bfe/9f-op/app-launcher/index.html')
  var d = function() {
    window.setTimeout(function() {
      iframe.removeEventListener('load', d)
      document.body.removeChild(iframe)
    }, 0)
  }
  iframe.addEventListener('load', d)
  body.appendChild(iframe)
  console.log('[APP] Navigation.setTitle')
}
