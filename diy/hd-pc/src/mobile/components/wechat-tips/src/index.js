import Vue from 'vue'
import wechatTips from './wechat-tips.vue'

const defaults = {
}

// 合并
const merge = function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i]
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        const value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

// 构建 WechatTips 实例
let instance
const WechatTipsConstructor = Vue.extend(wechatTips)

const initInstance = () => {
  instance = new WechatTipsConstructor({
    el: document.createElement('div')
  })
}

// let removeDom = event => {
//   if (event.target.parentNode) {
//     event.target.parentNode.removeChild(event.target)
//   }
// }

/**
 * 微信提示框
 * @param {Object} options
 * @example
 *
 * WechatTips()
 */
const WechatTips = (options) => {
  if (!instance) {
    initInstance()
  }
  const opts = merge({}, defaults, options)
  for (const prop in opts) {
    if (instance.hasOwnProperty(prop)) {
      instance.$set(instance, prop, opts[prop])
    }
  }
  const ua = window.navigator.userAgent.toLowerCase()
  const isWeChat = /MicroMessenger/i.test(ua)
  if (isWeChat) {
    document.getElementById('app').lastChild.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.lockState = true
      instance.value = true
    })
  }
}

export default WechatTips
