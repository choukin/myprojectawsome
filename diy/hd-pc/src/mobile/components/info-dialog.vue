<template>
  <van-popup v-model="popShow" style="background: transparent;">
    <div class="info">
      <van-image class="startbtn" :src="type|imageFilter" />
      <div class="desc">
        {{ type==='unlucky'?'来晚了哦，抽奖要趁早~':'活动已经结束了哦~' }}
      </div>
      <van-button color="#1599FF" round style="padding:0 60px;margin:0 auto;" @click="close">
        &nbsp;&nbsp;&nbsp;好吧&nbsp;&nbsp;&nbsp;
      </van-button>
    </div>
  </van-popup>
</template>
<script>
import end from '@/mobile/assets/img/end.png'
import unluckyend from '@/mobile/assets/img/unlucky.png'
import { Button, Image as VanImage, Popup } from 'vant'

export default {
  name: 'InfoDialog',
  components: {
    [Popup.name]: Popup,
    [VanImage.name]: VanImage,
    [Button.name]: Button

  },
  filters: {
    imageFilter(type) {
      console.log('type', type)
      if (type === 'unlucky') {
        console.log(unluckyend)
        return unluckyend
      } else {
        return end
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'unlucky'
    }
  },
  data() {
    return {
      popShow: false,
      endimage: end,
      unlucky: unluckyend,
      desc: ''
    }
  },
  watch: {
    popShow() {
      if (this.popShow === false) {
        this.close()
      }
    }
  },
  created() {
    this.popShow = this.show
  },
  methods: {
    close() {
      this.$emit('update:show', false)
      this.$emit('reset')
    }
  }
}
</script>
<style lang="scss" scoped>
.info{
  width:530px;
  height:720px;
  background: #FFF;
    opacity: 1;
  border-radius: 20px;
  text-align: center;
  padding-top:70px;
  .desc{
    padding:70px 0;
    font-size: 40px;
    font-weight: 400;
    color: #333333;
  }
}
</style>
