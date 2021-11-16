<template>
  <van-popup v-model="show" style="background: transparent;">
    <div class="rule">
      <div class="title">游戏说明</div>
      <div class="content" v-html="activityDesc" />
      <van-button color="#DD403E" round style="padding:0 30px;" @click="close">
        &nbsp;&nbsp;&nbsp;我知道啦&nbsp;&nbsp;&nbsp;
      </van-button>
    </div>
  </van-popup>
</template>
<script>
import end from '@/mobile/assets/img/end.png'
import { Button, Image as VanImage, Popup } from 'vant'

export default {
  name: 'RuleDialog',
  components: {
    [Popup.name]: Popup,
    [VanImage.name]: VanImage,
    [Button.name]: Button

  },
  props: {
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
      endimage: end
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.rule {
  height:590px;
  width:640px;
  background: #FFFADB;
  border: 12px solid #DD403E;
  opacity: 1;
  border-radius: 20px;
  overflow: auto;
  text-align:center;
  padding-bottom: 50px;
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
