<template>
  <div class="app-header-wrap">
    <div
      ref="header"
      class="app-header"
      :style="{
        color: fontColor
      }"
    >
      <div class="status-bar-placeholder" :style="{ height: `${$safeAreaTop}px`}" />
      <div
        class="app-header-bar"
        :class="{ 'shadow-border': borderShow }"
        :style="{ height: `${$appHeadHeight}px`, lineHeight: `${$appHeadHeight}px` }"
      >
        <div class="app-header-left" :style="{ fontSize: `${16 * $dpr}px` }">
          <button
            v-if="!backBtnHide"
            type="button"
            class="btn-back"
            :style="{color:btnColor}"
            @click="navBack"
          >
            <i class="iconfont icon-arrow-left" />
          </button>
          <button
            v-if="closeBtnShow"
            type="button"
            class="btn-close"
            :style="{color:btnColor}"
            @click="closeWebView"
          >
            <i class="iconfont icon-close" />
          </button>
        </div>

        <div class="app-header-center" :style="{ fontSize: `${17 * $dpr}px` }">
          <slot>
            <p class="title">{{ title }}</p>
          </slot>
        </div>

        <div v-if="rightBtnText" class="app-header-right" :style="{ fontSize: `${16 * $dpr}px` }">
          <button type="button" @click="rightBtnFnHandle">{{ rightBtnText }}</button>
          <slot name="headerRight" />
        </div>
      </div>
    </div>

    <div
      ref="appheaderbg"
      class="app-header-bg"
      :style="{
        backgroundColor: backgroundColor,
        height: `${$appHeadHeight}px`,
        paddingTop: `${$safeAreaTop}px`,
        opacity: bgOpacity
      }"
    />
    <div v-if="isPlaceholder">
      <div :style="{ height: `${$safeAreaTop}px`, backgroundColor: backgroundColor }" />
      <div :style="{ height: `${$appHeadHeight}px`, backgroundColor: backgroundColor }" />
    </div>
  </div>
</template>

<script>
/**
   * @desc App Header
   * @module components/app-header/index
   * @param {Object} props
   * @param {String} [props.bgColor=#fff] - 头部背景色，接受css支持的颜色字符串
   * @param {String} [props.color] - 头部文字颜色
   * @param {String} [props.title] - 头部Title
   * @param {String} [props.rightBtnText] - 右侧按钮文字
   * @param {Function} [props.rightBtnFn] - 右侧按钮方法
   * @param {Function} [props.backBtnFn] - 返回按钮方法，默认为有路由则go(-1)，没有使用路由则关闭WebView
   * @param {Boolean}[props.backBtnHide=false] - 隐藏返回按钮
   * @param {Boolean}[props.closeBtnShow=false] - 显示关闭按钮
   * @param {Boolean}[props.borderShow=false] - 显示下边线
   * @param {Boolean}[props.isPlaceholder=true] - 是否需要占位
   * @param {String} [props.scrollColor] - 头部滚动后文字颜色
   *    * @param {String} [props.scrollBgColor] - 头部滚动后头部背景颜色
   * @param {Object} slot
   * @param {Object} slot.default - 替换默认title位置内容
   * @example
   * <app-header title="标题" bgColor="#f15b5a" :closeBtnShow="true" rightBtnText="按钮" />
   *     <!-- 自定义头部 -->
   *  <app-header ref="header"
   *              :title="title"
   *              bg-color="transparent"
   *              scroll-bg-color="#ffffff"
   *              color="#FFFFFF"
   *              scroll-color="#1F2136"
   *              :is-bg-transparent="true"
   *              :is-placeholder="false"
   *  />
   */

import { closeWebView } from '@/mobile/utils/app'
const defaultBtnColor = process.env.CHANNEL === 'wk' ? '#ff5c6c' : ''
export default {
  name: 'AppHeader',
  props: {
    bgColor: {
      type: String,
      default: '#fff'
    },
    btnColor: {
      type: String,
      default: defaultBtnColor
    },
    scrollBgColor: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#2d2f46'
    },
    scrollColor: {
      type: String,
      default: '#2D2F46'
    },
    isBgTransparent: Boolean,
    title: {
      type: String,
      default: ''
    },
    rightBtnText: {
      type: String,
      default: ''
    },
    rightBtnFn: {
      type: Function,
      default: null
    },
    backBtnFn: {
      type: Function,
      default: null
    },
    backBtnHide: {
      type: Boolean,
      default: false
    },
    closeBtnShow: {
      type: Boolean,
      default: false
    },
    borderShow: {
      type: Boolean,
      default: false
    },
    isPlaceholder: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      bgOpacity: 1,
      fontColor: '#2d2f46',
      backgroundColor: '#ffffff',
      headerHeight: 44
    }
  },
  computed: {
  },
  watch: {
    $appHeadHeight: function(val) {
      this.headerHeight = val
    }
  },
  created() {
    this.backgroundColor = this.bgColor || this.backgroundColor
  },
  mounted() {
    this.fontColor = this.color
    this.backgroundColor = this.bgColor

    // 添加页面监听滚动
    if (this.isBgTransparent) {
      // IOS 只有在手离开时才触发变更
      document.addEventListener('scroll', this.handleScroll)
      if (this.$isIOS) {
        // IOS  不能触发 双向绑定需要设置 dom 样式
        window.addEventListener('touchmove', this.handleScroll)
      }
    }

    // console.log(this.$appHeadHeight)
  },
  destroyed() {
    // 删除监听页面滚动
    if (this.isBgTransparent) {
      document.removeEventListener('scroll', this.handleScroll)
      if (this.$isIOS) {
        window.removeEventListener('touchmove', this.handleScroll)
      }
    }
  },
  methods: {
    handleScroll() {
      // 获取页面滚动距离
      const scrollTop = window.scrollY

      // header 背景
      const appheaderbg = this.$refs.appheaderbg
      // header
      const header = this.$refs.header
      // 移动偏移量大于头部高度时 设置成滚动后样式
      if (scrollTop > this.appHeaderHeight) {
        this.bgOpacity = 1
        this.fontColor = this.scrollColor
        this.backgroundColor = this.scrollBgColor
        header.style.color = this.scrollColor
        appheaderbg.style.opacity = 1
        appheaderbg.style.backgroundColor = this.scrollBgColor
        // 偏移量小于 5 时 恢复成默认样式
      } else if (scrollTop <= 5) {
        this.fontColor = this.color
        this.backgroundColor = this.bgColor
        appheaderbg.style.backgroundColor = this.bgColor
        header.style.color = this.color
      } else { // 偏移量在 头部高度和5之间时 设置成中间状态 主要修改 opcity
        this.fontColor = this.scrollColor
        this.backgroundColor = this.scrollBgColor
        this.bgOpacity = Math.min(window.scrollY / this.$appHeaderHeight, 1)
        appheaderbg.style.opacity = Math.min(window.scrollY / this.$appHeaderHeight, 1)
        appheaderbg.style.backgroundColor = this.scrollBgColor
        header.style.color = this.color
      }
    },
    navBack() {
      if (this.backBtnFn) {
        this.backBtnFn()
      } else {
        this.closeWebView()
      }
    },
    closeWebView() {
      try {
        closeWebView()
      } catch (e) {
        window.history.go(-1)
      }
    },
    rightBtnFnHandle(evt) {
      this.$emit('rightBtnFn', evt)
    }
  }
}
</script>

<style lang="scss" scoped>
  // @import "~/assets/font/base/iconfont.css";
  // @import "~/assets/style/base.scss";
  .app-header-wrap{
    position: relative;
    z-index: 99;
  }

  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    .icon-base {
      font-size: inherit;
    }
  }
  .app-header-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 98;
    box-sizing: content-box;
  }

  .app-header-bar {
    position: relative;
    &.shadow-border {
      /*box-shadow: 0 1px 0 #f7f6f8;*/
      // @include border(1px, solid, #EBEBEB, bottom);
      box-sizing: border-box;
    }
    .app-header-left {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      height: inherit;
      button {
        display: block;
        height: inherit;
        color: inherit;
        font-size: inherit;
        padding: 0 .3rem;
        background-color: transparent;
        appearance: none;
      }
      .btn-back {
        padding-right: .15rem;
      }
    }
    .app-header-center {
      position: absolute;
      left: 50%;
      bottom: 0;
      height: inherit;
      line-height: inherit;
      transform: translateX(-50%);
      overflow: hidden;
    }
    .app-header-right {
      position: absolute;
      right: 0;
      bottom: 0;
      height: inherit;
      display: flex;
      align-items: center;
      button {
        display: block;
        height: inherit;
        color: inherit;
        font-size: inherit;
        padding: 0 .3rem;
        background-color: transparent;
        appearance: none;
      }
    }
  }
</style>
