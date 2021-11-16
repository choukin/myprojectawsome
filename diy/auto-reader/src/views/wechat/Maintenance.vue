<template>
  <div class="index assistant">
    <div class="content">
      <QRcode
        qrcodeurl="http://file.molin.work/staging/upload/static/WechatIMG2757.jpeg"
        desc="平台升级维护中，程序猿小哥哥们在努力恢复ing，请关注这个公众号，保障您的收益，请知悉！"
      />

      <!-- <div class="desc">
        <div class="title"><span>通知</span></div>
        <div class="desc-content ct1">
          <span>因平台升级维护，暂停使用，请关注这个公众号提取你的收益，请知悉！ </span>
        </div>
      </div>
    </div>
    <div class="tobar" id="topbar" style="padding: 0; box-shadow: unset">
      <a class="assistant" href="javascript:history.back(-1)">
        返回
      </a>
    </div> -->
    </div>
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import QRcode from '@/components/QRcode.vue'
@Component({
  name: 'maintenace',
  components: {
    QRcode
  }
})
export default class Contact extends Vue {}
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
