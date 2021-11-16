<template>
  <transition name="fade">
    <div
      v-show="show"
      :class="className"
      @touchmove="preventTouchMove"
    >
      <div class="vhcenter">
        <transition
          enter-active-class="bounceInDown"
          leave-active-class="bounceOutUp"
        >
          <img
            v-show="show"
            class="animated content"
            :src="ruledialogimg"
            alt=""
          >
        </transition>
        <transition
          enter-active-class="bounceInUp"
          leave-active-class="bounceOutDown"
        >
          <img
            v-show="show"
            class="btn animated "
            :src="btnimg"
            alt=""
            @click="close"
          >
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
import { preventDefault } from '@/mobile/utils'
const ruledialog = `${process.env.assetsPublicPath}static/game/redenveloperain/explain${process.env.CHANNEL}.png`
const iknowbtn = `${process.env.assetsPublicPath}static/game/redenveloperain/iknowbtn.png`
export default {
  name: 'OverlayRule',
  props: {
    show: Boolean,
    duration: {
      type: [Number, String],
      default: 0
    },
    className: {
      type: String,
      default: 'overlay'
    },
    zIndex: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      ruledialogimg: ruledialog,
      btnimg: iknowbtn
    }
  },
  methods: {
    preventTouchMove(event) {
      preventDefault(event, true)
    },
    close() {
      this.$store.commit('SET_SHOWRULE', false)
    }
  }

}
</script>
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .6s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 1;
  }
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  z-index: 999999;
  .vhcenter{
    width:5.31rem;
    height:6.47rem;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 9999;

    backface-visibility: hidden;
    img.content{
      width:100%;
      height:100%;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    img.btn{
      width:3.28rem;
      position: absolute;
      z-index: 10000;
      left: 50%;
      bottom:-.18rem;
      transform: translate3d(-50%, -50%, 0);
    }
  }

}
</style>
