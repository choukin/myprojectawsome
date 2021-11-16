<template>
  <div ref="wechatTips" class="wechat-tips-wrapper" @touchmove.prevent>
    <div
      v-show="lockState"
      class="wechat-tips-bg"
      :class="{ ios: isIOS, android: !isIOS}"
      @click="cancelHandle"
    />
  </div>
</template>

<script>

export default {
  name: 'WeChatTips',
  data() {
    return {
      lockState: true
    }
  },
  computed: {
    isIOS: () => /iphone/i.test(window.navigator.userAgent)
  },

  mounted() {
  },
  destroyed() {

  },
  methods: {
    cancelHandle() {
      this.lockState = false
      this.$refs.wechatTips.parentNode.removeChild(this.$refs.wechatTips)
    }
  }
}
</script>

<style lang="scss">
@import '~!/assets/style/base.scss';

.wechat-tips-wrapper {
  z-index: 9999;
  width:100%;
  position: relative;
}
.wechat-tips-bg {
  background-color: rgba(0, 0, 0, .8);
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  // background-image: url('./img/guide-wx-android.png');
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 100% auto;
    &.ios {
      background-image: url("./img/guide-wx-ios.png");
      background-size: 5.5rem 8.1rem;
    }
    &.android {
      background-image: url("./img/guide-wx-android.png");
      background-size: 6.4rem 5.19rem;
    }

}
.wechat-tips {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 5.6rem;
  border-radius: .24rem;
  font-size: .26rem;
  -webkit-user-select: none;
  overflow: hidden;
  backface-visibility: hidden;
  transition: .2s;
}

.msgbox-bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.msgbox-bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>
