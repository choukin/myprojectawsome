import EventEmitter from './utils/event-emitter'
import TouchTarget from './touch-target'
import { extend } from './utils'

export default class TapSwiper extends EventEmitter {
  constructor(el, options = {}) {
    super()

    // 默认值
    const DEFAULT_OTTIONS = {
      direction: 'v',
      slidesWrapperClass: '.slides-wrapper',
      slidesClass: '.slide'
    }

    this.options = extend(DEFAULT_OTTIONS, options) // 合并默认值

    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.elWidth = this.el.offsetWidth
    this.elHeight = this.el.offsetHeight

    this.slidesWrapper = this.el.querySelector(this.options.slidesWrapperClass)
    this.slidesWrapper.addEventListener('transitionend', () => {
      this.slidesWrapper.style.transition = 'transform ease 0s'
    })

    this.slidesCount = this.slidesWrapper.querySelectorAll(this.options.slidesClass).length

    this.slideIndex = 0 // 当前索引值

    this.touchTarget = new TouchTarget(this.el)

    this.touchTarget.on('tapstart', () => {
      this.trigger('tapstart')
    })

    this.touchTarget.on('tapmove', ({ distX, distY }) => {
      if (this.options.direction === 'h') {
        this.slidesWrapper.style.transform = `translate(${-this.slideIndex * this.elWidth + distX}px,0)`
      } else {
        this.slidesWrapper.style.transform = `translate(0, ${-this.slideIndex * this.elHeight + distY}px)`
      }
    })

    this.touchTarget.on('tapend', ({ distX, distY }) => {
      let distance, perSlideWidth

      if (this.options.direction === 'h') {
        distance = distX
        perSlideWidth = this.elWidth
      } else {
        distance = distY
        perSlideWidth = this.elHeight
      }

      // 水平方向
      if (Math.abs(distance) / perSlideWidth >= 0.1) {
        if (distance < 0) {
          if (this.slideIndex === this.slidesCount - 1) {
            this._backFix()
          } else {
            this.slideNext()
          }
        } else {
          if (this.slideIndex === 0) {
            this._backFix()
          } else {
            this.slidePrev()
          }
        }
      } else {
        this._backFix()
      }
    }, this)
  }
  slideNext() {
    this.slideTo(this.slideIndex + 1)
  }

  slidePrev() {
    this.slideTo(this.slideIndex - 1)
  }

  slideTo(slideIndex) {
    this.slideIndex = slideIndex
    let x = 0; let y = 0
    if (this.options.direction === 'h') {
      x = -this.slideIndex * this.elWidth
    } else {
      y = -this.slideIndex * this.elHeight
    }
    this._transform(x, y)
  }

  _backFix() {
    let x = 0; let y = 0
    if (this.options.direction === 'h') {
      x = -this.slideIndex * this.elWidth
    } else {
      y = -this.slideIndex * this.elHeight
    }
    this._transform(x, y)
  }

  _transform(x, y) {
    this.slidesWrapper.style.transition = 'transform ease .2s'
    this.slidesWrapper.style.transform = `translate(${x}px, ${y}px)`
  }
}
