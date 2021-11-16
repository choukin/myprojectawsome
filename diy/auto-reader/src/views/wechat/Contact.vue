<template>
  <div class="index assistant">
    <div class="content">
      <QRcode
        v-if="$channelCode=='CS2'"
        qrcodeurl="http://file.molin.work/production/upload/static/202003031221.png"
        btntext="长按识别二维码联系qq客服"
      />   
      <QRcode 
        v-if="$channelCode=='CS2'"
        qrcodeurl="http://file.molin.work/staging/upload/static/WechatIMG2757.jpeg"
        desc="长按关注公众号，永不迷路"
      />      

      <QRcode
        v-if="$channelCode=='RWZ'"
        qrcodeurl="http://file.molin.work/youngbazaar/upload/static/renwuzhuankf.png"
        desc="长按识别二维码联系客服"
      />       
      <QRcode 
        v-if="$channelCode=='RWZ'"
        qrcodeurl="http://file.molin.work/youngbazaar/upload/static/rwzgzh.jpg"
        desc="长按关注公众号，永不迷路"
      />         
      <div class="desc">
        <div class="title">
          <span>注意事项</span>
        </div>
        <div class="desc-content ct1">
          <span>欢迎关注，公众号随时发送新入口，定期推送最新活动和动态以及更多好玩的挣钱项目，为避免无法第一时间获得消息，关注后请不要取关！请不要取关!
          </span>
        </div>
      </div>
    </div>
    <div
      id="topbar"
      class="tobar"
      style="padding: 0; box-shadow: unset"
    >
      <a
        class="assistant"
        href="javascript:history.back(-1)"
      >
        返回
      </a>
    </div>
  </div>
</template>
<script>
import { Component, Mixins } from 'vue-property-decorator'
import QRcode from '@/components/QRcode.vue'
import WeChat from '@/plugins/wechatMixin'

@Component({
  name: 'Contact',
  components: {
    QRcode
  }
})
export default class Contact extends Mixins(WeChat) {
  created() {
    let inviteUrl = `${process.env.VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userBase.id}` 
    // `http://wechat03.nblh.24527e.cn/gunsApi/redirectIndexApi/redirect?parentId=${this.userInfo.id}`

    //  验证签名
    this.installWXbridge(inviteUrl)
  }
}
</script>
<style lang="scss" scoped>
.index.assistant .content {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.index.assistant {
  background: #ededed;
}

.index.assistant .content {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.index.assistant .qr-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 18px;
}

.index.assistant .qr-box .qr-code {
  border: 1px solid #d3d3d3;
  width: 320px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 40px;
  height: 320px;
  border-radius: 34px;
}

.index.assistant .qr-box .qr-code .qr-code-img {
  height: 100%;
  width: 100%;
  border: 1px dashed #d3d3d3;
}

.index.assistant .desc {
  margin-top: 40px;
  padding: 0 80px;
}

.index.assistant .desc .title {
  font-size: 26px;
  color: #565656;
  margin-bottom: 26px;
}

.index.assistant .desc .desc-content {
  color: #888888;
  font-size: 24px;
  line-height: 88px;
  margin-top: 8px;
}
.top-radius-box {
  background: #fff;
  padding-bottom: 60px;
  border-radius: 0 0 26px 26px;
  -webkit-box-shadow: 0px 18px 26px #d3d3d3;
  box-shadow: 0px 18px 26px #d3d3d3;
}

.top-radius-box .title {
  margin-top: 40;
  position: relative;
  text-align: center;
  color: #2e2e2e;
  font-size: 34px;
  overflow: visible;
}

.top-radius-box .title .line {
  position: absolute;
  left: 50%;
  -webkit-transform: translate(-50%);
  -ms-transform: translate(-50%);
  transform: translate(-50%);
  bottom: -17px;
  height: 6.8px;
  width: 0.85333rem;
  background: #2782ff;
  border-radius: 6.8px;
}

.top-radius-box .child-box {
  margin-top: 40px;
  overflow: hidden;
}

.top-radius-box .btn-group {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 40px;
}

.top-radius-box .btn-group .btn {
  margin-left: auto;
  margin-right: auto;
  padding-left: 14px;
  padding-right: 14px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 24px;
  height: 80px;
  line-height: 40px;
  width: 80%;
  text-align: center;
  background: #2782ff;
  border-radius: 48px;
  color: #fff;
  outline: 0;
}
</style>
