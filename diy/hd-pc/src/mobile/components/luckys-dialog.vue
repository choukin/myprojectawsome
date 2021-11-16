<template>
  <van-popup v-model="popShow" style="background: transparent;">
    <div class="lucky">
      <div class="lucky-warp">
        <div v-for="(prizeInfo,index) in prizeInfos" :key="index" class="prize-item">
          <div>
            <van-image width="1.9rem" height="1.2rem" :src="$imghost+prizeInfo.img" />
          <!-- <van-image :src="$imghost+prize" /> -->
          </div>
          <div class="count">x {{ prizeInfo.count }}张</div>
          <!-- TODO: -->
          <van-button color="linear-gradient(180deg, #FBECBF 0%, #F2DC91 100%)" round style="padding:0 .6rem;" @click="close">
            &nbsp;&nbsp;&nbsp;去兑换&nbsp;&nbsp;&nbsp;
          </van-button>
        </div>
      </div>
    </div>
    <div style="text-align:center;padding-top:.7rem;" @click="close">
      <van-image :src="closebtn" />
    </div>
  </van-popup>
</template>
<script>
import prize from '@/mobile/assets/img/prize.png'
import closebtn from '@/mobile/assets/img/close.png'
import { Button, Image as VanImage, Popup } from 'vant'
const dataList = { 'code': 2000, 'message': 'SUCESS!', 'date': '1603133563079', 'data': [{ 'img': 'data/img/7yX8yfOA70vip100.png', 'validTime': '2020-11-12 02:52:42', 'id': 13, 'name': '手办', 'value': '手办', 'isInPrize': true, 'prizeType': 1 }, { 'img': 'data/img/7yX8yfOA70vip100.png', 'validTime': '2020-11-12 02:52:42', 'id': 13, 'name': '手办', 'value': '手办', 'isInPrize': true, 'prizeType': 1 }, { 'img': 'data/img/7yX8yfOA70vip100.png', 'validTime': '2020-11-12 02:52:42', 'id': 13, 'name': '手办', 'value': '手办', 'isInPrize': true, 'prizeType': 1 }, { 'img': 'data/img/w2Nu5vqv69vip100.png', 'validTime': '2020-10-22 02:52:42', 'id': 11, 'name': '爱奇艺会员卡', 'value': 'Ns6zp175', 'isInPrize': true, 'prizeType': 0 }, { 'img': 'data/img/7yX8yfOA70vip100.png', 'validTime': '2020-11-12 02:52:42', 'id': 13, 'name': '手办', 'value': '手办', 'isInPrize': true, 'prizeType': 1 }, { 'img': 'data/img/7yX8yfOA70vip100.png', 'validTime': '2020-11-12 02:52:42', 'id': 13, 'name': '手办', 'value': '手办', 'isInPrize': true, 'prizeType': 1 }, { 'img': 'data/img/w2Nu5vqv69vip100.png', 'validTime': '2020-10-22 02:52:42', 'id': 11, 'name': '爱奇艺会员卡', 'value': 'BWrxU176', 'isInPrize': true, 'prizeType': 0 }, { 'img': 'data/img/7yX8yfOA70vip100.png', 'validTime': '2020-11-12 02:52:42', 'id': 13, 'name': '手办', 'value': '手办', 'isInPrize': true, 'prizeType': 1 }, { 'img': 'data/img/w2Nu5vqv69vip100.png', 'validTime': '2020-10-22 02:52:42', 'id': 11, 'name': '爱奇艺会员卡', 'value': 'aht7h177', 'isInPrize': true, 'prizeType': 0 }, { 'img': 'data/img/w2Nu5vqv69vip100.png', 'validTime': '2020-10-22 02:52:42', 'id': 11, 'name': '爱奇艺会员卡', 'value': 'iDToE178', 'isInPrize': true, 'prizeType': 0 }, { 'img': 'data/img/7yX8yfOA70vip100.png', 'validTime': '2020-11-12 02:52:43', 'id': 13, 'name': '手办', 'value': '手办', 'isInPrize': true, 'prizeType': 1 }, { 'img': 'data/img/7yX8yfOA70vip100.png', 'validTime': '2020-11-12 02:52:43', 'id': 13, 'name': '手办', 'value': '手办', 'isInPrize': true, 'prizeType': 1 }, { 'img': 'data/img/7yX8yfOA70vip100.png', 'validTime': '2020-11-12 02:52:43', 'id': 13, 'name': '手办', 'value': '手办', 'isInPrize': true, 'prizeType': 1 }], 'success': true }
export default {
  name: 'LuckyDialog',
  components: {
    [Popup.name]: Popup,
    [VanImage.name]: VanImage,
    [Button.name]: Button

  },
  props: {
    prizeInfos: {
      type: Array,
      default() {
        return []
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
    console.log(dataList)
    return {
      popShow: false,
      closebtn: closebtn,
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
  background-image: url('~@/mobile/assets/img/luckys.png');
  background-size: 100% 100%;
  opacity: 1;
  border-radius: 20px;
  overflow: auto;
  text-align:center;
  position: relative;
  padding: 150px 30px 25px;
  box-sizing: border-box;
  overflow: hidden;
  .lucky-warp{
    height: 550px;
    overflow: auto;
    padding:20px 20px;
    box-sizing: border-box;
  }
  .prize-item{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    .count{
    font-size: 32px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    line-height: 54px;
    color: #FEFEFF;
    opacity: 1;
    padding:0 26px 0 28px;
    }
  }
  .prize-info{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: 400;
    color: #D16A08;
    .prize-desc{
      text-align: left;
      padding-left: 52px;
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
