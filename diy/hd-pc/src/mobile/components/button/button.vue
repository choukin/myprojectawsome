<template>
  <button
    :type="nativeType"
    :class="btnClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
/**
   * @desc button按钮
   * @module components/button/button
   * @param {Object} props
   * @param {String} [props.type=primary] - 显示类型，接受 primary、white、plain
   * @param {Boolean}[props.disabled=false] - 禁用按钮
   * @param {Boolean}[props.radius=true] - 是否圆角
   * @param {String} [props.block=false] - 按钮宽度，默认自动
   * @param {String} [props.size=normal] - 尺寸，接受 mini, xs, normal, small, large, big
   * @param {String} [props.link] - 跳转url
   * @param {String} [props.native-type] - 原生 type 属性
   * @param {Object} slot
   * @param {Object} slot.default - 默认slot-显示按钮文字
   * @param {Object} event
   * @param {Function} event.click - 点击按钮回调
   * @example
   * <v-button size="small" @click="handle" link="https://www.baidu.com/">圆角按键</v-button>
   */
export default {
  name: 'VButton',
  props: {
    disabled: Boolean,
    size: {
      type: String,
      default: 'normal'
    },
    radius: {
      type: Boolean,
      default: true
    },
    block: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary' // primary、white、plain
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    link: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixClass: 'nb-btn'
    }
  },
  computed: {
    btnClass() {
      let btnClass = this.radius ? `${this.prefixClass} ${this.prefixClass}-radius` : this.prefixClass
      btnClass = `${btnClass} ${this.prefixClass}-${this.size} ${this.prefixClass}-${this.type}`

      if (this.block) {
        btnClass = btnClass + ' nb-btn-block'
      }
      return btnClass
    }
  },
  methods: {
    handleClick(evt) {
      if (this.link) {
        window.location.href = this.link
      }
      this.$emit('click', evt)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '~!/assets/style/base.scss';
  $btnClass: nb-btn;

  .#{$btnClass} {
    box-sizing: border-box;
    height: .64rem;
    padding: 0 .4rem;
    font-size: .24rem;
    text-align: center;
  }

  .#{$btnClass}-block {
    display: block;
    width: 100%;
  }

  /* *******************圆角****************** */

  .#{$btnClass}-radius {
    border-radius: .48rem;
  }

  /* *******************大小****************** */

  .#{$btnClass}-mini {
    height: .40rem;
    font-size: .22rem;
    padding: 0 .2rem;
  }

  .#{$btnClass}-xs {
    height: .54rem;
  }

  .#{$btnClass}-normal {
    height: .64rem;
  }

  .#{$btnClass}-small {
    height: .72rem;
    font-size: .28rem;
  }

  .#{$btnClass}-large {
    height: .80rem;
    font-size: .28rem;
  }

  .#{$btnClass}-big {
    height: .98rem;
    font-size: .34rem;
  }

  /* *******************颜色类型****************** */

  .#{$btnClass}-primary {
    background-image: linear-gradient(90deg, #FB5251 0%, #FF7351 100%);
    color: #fff;
  }

  .#{$btnClass}-primary:active{
    background-image: linear-gradient(90deg, #E63F3E 0%, #E7512C 100%);
    color: #fff;
  }

  .#{$btnClass}-primary:disabled {
    background: #D7D1D7;
    color: #fff;
    box-shadow: none;
  }

  .#{$btnClass}-white {
    background: #FFFFFF;
    @include border(1px, solid, #E5E5E5, '');
    color: #2D2F46;
  }

  .#{$btnClass}-white:active{
    color: #F15B5A;
  }

  .#{$btnClass}-white:disabled {
    color: #B2B4C6;
  }

  .#{$btnClass}-plain {
    background-color: transparent;
    @include border(1px, solid, #B2B4C6, '');
    color: #81849F;
  }

  .#{$btnClass}-plain:active{
    @include border(1px, solid, #2D2F46, '');
    color: #2D2F46;
  }

  .#{$btnClass}-plain:disabled {
    @include border(1px, solid, #D8D9E2, '');
    color: #B2B4C6;
  }

</style>
