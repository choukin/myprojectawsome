<template>
  <div
    :id="id"
    :class="textClass"
    :style="styleObj"
  >
    <ul>
      <li v-for="(item, index) in textList" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>
<script>
import { setStyle, on } from '@/mobile/utils/dom'
export default {
  name: 'TextScroll',
  /**
     * 文本无缝滚动
     * @param {Array} textList 带有可遍历数据的数组
     * @param {number} remove 滚动的距离 行高 高
     * @param {nummber} speed 滚动速度
     * @param {String} color 文字颜色
     * @param {String} fontSize 字体大小
     * @param {Boolean} alignX 是否水平剧中 默认 false
     * @param {Number} width 设置宽的
     * @param {String} addClass 添加样式
     * @param {String} bgColor 设置背景颜色
     * @param {Number} borRadius 设置是否圆角
     */
  props: {
    textList: {
      type: Array,
      default: () => {
        return []
      }
    },
    remove: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 3000
    },
    color: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: ''
    },
    alignX: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    addClass: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    },
    borRadius: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      id: 'textScroll',
      boxClass: 'text-scroll'
    }
  },
  computed: {
    textClass() {
      let textClass = this.alignX ? `${this.boxClass} ${this.boxClass}-center` : `${this.boxClass}`
      textClass = this.addClass ? `${textClass} ${this.addClass}` : textClass
      return textClass
    },
    styleObj() {
      const styleObj = {}
      if (this.remove) {
        styleObj.height = `${this.remove / 100}rem`
        styleObj.lineHeight = `${this.remove / 100}rem`
      }
      styleObj.color = this.color ? this.color : '#333'
      styleObj.fontSize = this.fontSize ? this.fontSize : '.24rem'
      styleObj.width = this.width ? `${this.width / 100}rem` : '100%'
      styleObj.backgroundColor = this.bgColor ? this.bgColor : '#fff'
      styleObj.borderRadius = this.borRadius ? `${this.borRadius / 100}rem` : '0rem'
      return styleObj
    }
  },
  mounted() {
    const _this = this
    this.$nextTick(function() {
      _this.textScroll()
    })
  },
  methods: {

    textScroll() {
      const _this = this
      const _element = document.getElementById(this.id)
      let pushTimer = null
      let removeItem = null
      const option = {
        speed: this.speed || 3000,
        remove: 0,
        fn: function() {
          option.remove += _this.remove
          setStyle(_element.firstChild, {
            'transform': 'translateY(-.' + option.remove + 'rem)',
            'transition': 'all .5s'
          })
          if (pushTimer) {
            clearTimeout(pushTimer)
          }
          pushTimer = setTimeout(function() {
            option.remove = 0
            setStyle(_element.firstChild, {
              'transform': 'translateY(-.' + option.remove + 'rem)',
              'transition': 'all 0s'
            })
            const str = _this.textList.splice(0, 1)
            _this.textList.push(str[0])
          }, 600)
        }
      }

      if (_this.textList.length <= 1) {
        clearInterval(removeItem)
      } else {
        removeItem = setInterval(function() {
          option.fn()
        }, option.speed)
      }
      // 阻止 滚动
      on(_element, 'touchstart', function() {
        clearInterval(removeItem)
      })
      on(_element, 'touchend', function() {
        removeItem = setInterval(function() {
          option.fn()
        }, option.speed)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $textClasd: 'text-scroll';
  .#{$textClasd} {
    margin: 0 auto;
    overflow: hidden;
  }
  .#{$textClasd}-center {
    text-align: center;
  }
</style>
