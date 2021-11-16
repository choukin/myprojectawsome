import EventEmitter from './utils/event-emitter'
export default class TouchTarget extends EventEmitter {
  constructor(el, options = {}) {
    super()
    const touchTarget = this
    this.el = typeof el === 'string' ? document.querySelector(el) : el

    const DEFAULT_OPTIONS = {
      delay: 200
    }

    this.options = Object.assign({}, DEFAULT_OPTIONS)

    let tapstart, tapmove, tapend
    if ('ontouchstart' in window) {
      tapstart = 'touchstart'
      tapmove = 'touchmove'
      tapend = 'touchend'
    } else {
      tapstart = 'mousedown'
      tapmove = 'mousemove'
      tapend = 'mouseup'
    }

    let startX // tapstart X轴开始坐标
    let startY // tapstart Y轴开始坐标
    let pageX // 当前X轴坐标
    let pageY // 当煎Y轴坐标
    let distX = null // 从 tapstart 到当前位置X轴移动的距离
    let distY = null // 从 tapstart 到当前位置Y轴移动的距离
    let moveX = null // 距离上次 tapmove X轴移动的距离
    let moveY = null // 距离上次 tapmove Y轴移动的距离
    let endX
    let endY

    let prevMoveTime
    let isTapStart = false // 是否已经触发了 tapstart
    const startHandler = function(e) {
      isTapStart = true
      const point = e.touches ? e.touches[0] : e
      startX = pageX = point.pageX
      startY = pageY = point.pageY

      touchTarget.trigger('tapstart', { startX, startY, pageX, pageY, distX, distY, moveX, moveY })
    }

    const moveHandler = function(e) {
      if (!isTapStart) {
        return
      }
      const point = e.touches ? e.touches[0] : e
      const newPageX = point.pageX
      const newPageY = point.pageY

      moveX = newPageX - pageX
      moveY = newPageY - pageY

      distX = newPageX - startX
      distY = newPageY - startY

      pageX = newPageX
      pageY = newPageY

      if (!prevMoveTime && (Date.now() - prevMoveTime >= touchTarget.options.delay)) {
        touchTarget.trigger('tapmove', { startX, startY, pageX, pageY, distX, distY, moveX, moveY })
        prevMoveTime = Date.now()
      }
    }

    const endHandler = function(e) {
      if (!isTapStart) {
        return
      }

      isTapStart = false
      const point = e.changedTouches[0]
      endX = point.pageX
      endY = point.pageY
      moveX = endX - startX
      moveY = endY - startY
      distX = endX - startX
      distY = endY - startY

      pageX = endX
      pageY = endY

      touchTarget.trigger('tapend', { startX, startY, pageX, pageY, distX, distY, moveX, moveY, endX, endY })
    }

    this.utils.addEvent(this.el, tapstart, startHandler)
    this.utils.addEvent(document, tapmove, moveHandler)
    this.utils.addEvent(document, tapend, endHandler)
  }

  utils = {
    addEvent(elem, type, handler) {
      elem.addEventListener(type, handler)
      return {
        remove() {
          elem.removeEventListener(type, handler)
        }
      }
    },
    removeEvent(elem, type, handler) {
      elem.removeEventListener(type, handler)
    }
  }
}
