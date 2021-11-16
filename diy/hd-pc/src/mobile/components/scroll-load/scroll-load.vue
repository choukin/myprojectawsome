<template>
  <div class="scroll-load">
    <i v-show="isLoading" class="load-icon" />
    <span class="load-label">{{ noMore ? noMoreText : loadingText }}</span>
  </div>
</template>

<script>
export default {
  name: 'ScrollLoad',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
      required: true
    },
    noMore: {
      type: Boolean,
      default: false,
      required: true
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    noMoreText: {
      type: String,
      default: '没有更多数据了'
    },
    scrollElement: {
      type: [HTMLDocument, Element, Window],
      default() {
        return window
      }
    }
  },

  watch: {
    scrollElement(newEl, oldEl) {
      if (newEl === oldEl) return
      this.unbindScroll(oldEl)
      this.bindScroll()
    }
  },

  mounted() {
    this.bindScroll()
  },

  beforeDestroy() {
    this.unbindScroll()
  },

  methods: {
    onScroll() {
      if (this.isLoading || this.noMore) return
      const el = this.scrollElement
      const isWindow = el === window
      const scrollTop = isWindow ? window.scrollY : el.scrollTop
      const scrollHeight = isWindow ? document.documentElement.scrollHeight || document.body.scrollHeight : el.scrollHeight
      const elHeight = isWindow ? window.innerHeight : el.offsetHeight
      const distance = scrollHeight - scrollTop - elHeight
      if (distance <= 30) {
        this.$emit('onreachend')
      }
    },
    bindScroll() {
      this.scrollElement.addEventListener('scroll', this.onScroll)
    },
    unbindScroll(el) {
      el = el || this.scrollElement
      el.removeEventListener('scroll', this.onScroll)
    }
  }
}
</script>

<style lang="scss">
  .scroll-load {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: .4rem;
    padding-bottom: .4rem;
  }

  .load-icon {
    display: block;
    width: .28rem;
    height: .28rem;
    margin-right: .2rem;
    background: url('./img/loading.png') center center no-repeat;
    background-size: .28rem .28rem;
    animation: loadrotate 0.75s linear infinite;
  }

  .load-label {
    color: #8c8fa7;
    font-size: .24rem;
    line-height: .4rem;
  }

  @keyframes loadrotate {
    100% {
      transform: rotate(1turn);
    }
  }
</style>
