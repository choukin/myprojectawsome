<template>
  <div class="index assistant">
    <div class="content">
      <div class="top-radius-box">
        <div class="title">
          <span>邀请好友一起阅读</span>
          <div class="line" />
        </div>
        <div
          ref="copytext"
          class="content"
        >
          全自动任务平台[阴险][阴险]最近我发现一个，玩游戏、阅读也能赚钱💰💰的自动任务平台哦~只要下载后打开，就有收益！实时提现微信秒到💰💰👉👉点开链加入我们！{{ inviteUrl }}
        </div>
        <van-button
          type="info"
          round
          size="large"
          class="downloadbtn"
          text="复制链接"
          @click="copyText"
        />
      </div>
      <div class="desc">
        <div class="title">
          <span>邀请好友小窍门</span>
        </div>
        <div class="desc-content ct1">
          <ol>
            <li>1. 复制个人专属推广，分享群、朋友圈、好友，好友点击进入，即可终身绑定好友，躺赚好友终身30%收益；</li>
            <li>2. 邀请您的家人、朋友、同学、同事，邀请成功好友成功率最高；</li>
            <li>3. 每天分享3个以上的微信群，成功收徒几率提升200%；</li>
            <li>4. 邀请好友越多，收益越多</li>
          </ol>
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
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QRcode from '@/components/QRcode.vue'
import WeChat from '@/plugins/wechatMixin'
import copy from 'copy-text-to-clipboard'
import {
  Button,
  Toast
} from 'vant'
const { VUE_APP_HOST } = process.env
@Component({
  name: 'Share',
  components: {
    QRcode,
    [Button.name]: Button,
  }
})
export default class Share extends Mixins(WeChat) {
  // 邀请链接
  public inviteUrl: string = ''
  async created() {
    let reInviteUrl = `${VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userBase.id}`
    // //http://lnurl.cn/weixin/short?url_long=http://www.baidu.com 
    // this.inviteUrl = 'http://www.baidu.com'
    let [,data] = await  this.$fetchGet(`${VUE_APP_HOST}/gunsApi/shareForSignatureApi/getShortUrl?url=`+ encodeURI(reInviteUrl))
    this.inviteUrl = data
   
  }
  copyText() {
    let copytext = (this.$refs.copytext as HTMLElement).innerText
    copy(copytext)
    Toast('复制成功')
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
.top-radius-box {
  background: #fff;
  padding-bottom: 60px;
  padding-top: 0.3rem;
  border-radius: 0 0 26px 26px;
  -webkit-box-shadow: 0px 18px 26px #d3d3d3;
  box-shadow: 0px 18px 26px #d3d3d3;
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
  ol li{
    line-height: 1.5;
  }
}
.top-radius-box {
  background: #fff;
  padding-bottom: 60px;
  border-radius: 0 0 26px 26px;
  -webkit-box-shadow: 0px 18px 26px #d3d3d3;
  box-shadow: 0px 18px 26px #d3d3d3;
  padding-left: .15rem;
  padding-right: .15rem;
  .content{
    margin-top: .3rem;
    padding:.3rem;
    font-size: .28rem;
    background-color:#ededed;
    margin-bottom: .3rem;
  }

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
  width: 0.5rem;
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
