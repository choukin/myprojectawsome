<template>
  <van-popup v-model="popShow" style="background: transparent;" @click-overlay="true">
    <div class="lucky">
      <div class="prize-info">
        <div style="width:1.9rem;height:1.2rem;">
          <van-image :src="$imghost+prizeInfo.img" />
        </div>
        <div class="prize-desc">
          <div>{{ prizeInfo.name }}</div>
          <!-- TODO: -->
          <div>有效期：{{ prizeInfo.validTime }}</div>
        </div>
      </div>
      <van-button color="linear-gradient(180deg, #FBECBF 0%, #F2DC91 100%)" class="btn" round style="" @click="close">
        &nbsp;&nbsp;&nbsp;收下&nbsp;&nbsp;&nbsp;
      </van-button>
    </div>
  </van-popup>
</template>
<script>
import prize from '@/mobile/assets/img/prize.png'
import { Button, Image as VanImage, Popup } from 'vant'

export default {
  name: 'LuckyDialog',
  components: {
    [Popup.name]: Popup,
    [VanImage.name]: VanImage,
    [Button.name]: Button

  },
  props: {
    prizeInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    prizeimage: {
      type: String,
      default: ''
    },
    activityDesc: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      popShow: false,
      prize: prize
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
.lucky {
  height:732px;
  width:666px;
  background-image: url('~@/mobile/assets/img/binggo.png');
  background-size: 100% 100%;
  opacity: 1;
  border-radius: 20px;
  overflow: auto;
  text-align:center;
  padding-bottom: 50px;
  position: relative;
  padding-top:242px;
  box-sizing: border-box;
  overflow: hidden;
  .prize-info{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: 400;
    color: #D16A08;
    .prize-desc{
      text-align: left;
      padding-left: 20px;
      font-size: 0.24rem;
    }
  }
  .btn{
font-size: 32px;
color: #C36F0A!important;
padding:0 60px;
position: relative;
top: 136px;
  }
  .title{
  font-size: 52px;
  font-weight: 500;
  color: #333333;
  padding:70px 0 ;
  text-align: center;
  }
  .content
  {
    padding:.15rem;
    font-size: .24rem;
    ol{
    padding:auto;
    list-style: decimal;
    }
  }
}
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
