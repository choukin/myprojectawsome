import { toLogin } from '@/mobile/utils/app'
/**
 * 判断需要登陆修饰器
 * @param {*} str
 */
export const needLogin = (str) => {
  return (target, name, descriptor) => {
    const oldValue = descriptor.value
    descriptor.value = function(...args) { // 这里不能用剪头函数，否则this指向错误
      // 用户未登陆跳转登陆
      const userInfo = window.$vueInstance.$store.state.baseInfo
      if (!userInfo.token) {
        toLogin()
      } else {
        // 修饰方法时 this 是vue实例 target 是vue 实例的method对象
        oldValue.apply(this, args)
      }
    }
    return descriptor
  }
}

/**
 * 防抖
 * 触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
 * @param {*} delay 200
 * @example
 * methods: {
 *    @debounce(500)
 *    @needLogin()
 *    handle () {
 *      console.log('登陆后才能看到 事件防抖' + new Date().getTime())
 *    }
 * }
 */
export const debounce = (delay = 200) => {
  let timeout
  return (target, name, descriptor) => {
    // 保存原来的方法
    const targetFun = descriptor.value
    descriptor.value = function(...args) { // 这里不能用剪头函数，否则this指向错误
      if (timeout) clearTimeout(timeout)
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
      // 立即执行
      if (callNow) targetFun.apply(this, args)
    }
    return descriptor
  }
}
