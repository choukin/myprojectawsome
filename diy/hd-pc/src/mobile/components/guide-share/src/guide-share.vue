<template>
  <div ref="wechatTips" class="wechat-tips-wrapper" @touchmove.prevent>
    <div
      v-show="lockState"
      class="wechat-tips-bg"
      @click="cancelHandle"
    >
      <div class="tips">点击右上角进行分享</div>
    </div>
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
  methods: {
    cancelHandle() {
      this.lockState = false
      this.$refs.wechatTips.parentNode.removeChild(this.$refs.wechatTips)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~!/assets/style/base.scss';

.wechat-tips-wrapper {
  z-index: 9999;
  width:100%;
  position: relative;
}
.wechat-tips-bg {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, .8) url('./img/guide_share_bg.png') no-repeat 94% 0;
  background-size: 3.07rem 3.65rem;
}

.tips {
  margin: 2.5rem 0 0 4rem;
  color: #fff;
  font-size: .3rem;
}
</style>
