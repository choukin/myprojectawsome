<template>
  <div class="index assistant">
    <van-collapse v-model="activeNames">
      <van-collapse-item
        title="1、手动点点阅读返回工作量太大，有么有更省力的办法？"
        name="1"
      >
        安卓手机可以点击下载助手，安装后即可自动翻阅文章。
      </van-collapse-item>
      <van-collapse-item
        title="2、总收益和阅读收益是什么意思？"
        name="2"
      >
        阅读收益是用户阅读文章获得的收益，单价会根据市场情况有所浮动，一般白天价格稍低，晚上7点以后价格稍高；
        总收益是阅读收益和其它收益的总和，是用户能直接提现的金额。
      </van-collapse-item>
      <van-collapse-item
        title="3、我通过文章阅读了，怎么提现呢？"
        name="3"
      >
        在主界面有提现功能，满1元即可提现，按提示操作即可，提现的金额会实时进入用户微信零钱。如果您的微信号没有进行实名认证，可能存在无法收到的情况，请关注客服公众号留言，有客服处理。
      </van-collapse-item>
      <van-collapse-item
        title="4、下载阅读助手页面打不开怎么办？"
        name="4"
      >
        下载阅读助手需要复制链接，在浏览器打开才能下载。
      </van-collapse-item>
      <van-collapse-item
        title="5、下载阅读助手后怎么设置？"
        name="5"
      >
        下载阅读助手并正常安装后，有悬浮窗和无障碍服务两处授权需要用户手动找到并打开，授权过程中有图片指导用户怎么进入设置。
      </van-collapse-item>
      <van-collapse-item
        title="6、点开始阅读后，界面显示红色背景的提示：“小知正在努力拉单，请稍后继续参加吧…”是什么意思？"
        name="6"
      >
        我们设置了每个人每天阅读文章的上限，当您的阅读数量达到上限后，当天将不能再进行阅读，0点过后才能继续进行阅读。
      </van-collapse-item>
      <van-collapse-item
        title="7、点开始阅读后，界面显示红色背景的提示：“您暂时还不能接单做任务，请联系管理员解锁才可以…”是什么意思？"
        name="7"
      >
        如果您的微信号活跃度非常低，或者没有进行实名认证，过于频繁的阅读文章，可能会引起微信限制功能，为了避免对您造成损失，后台会自动检测您的微信状态，限制有异常的微信号进行阅读，请您提升该微信号的活跃度之后再来尝试。
      </van-collapse-item>
      <van-collapse-item
        title="8、我在自动阅读的过程中，需要停止任务进行聊天打电话等其他操作时怎么办？"
        name="8"
      >
        自动阅读过程中需要对手机进行其他操作，按音量增加键，即可停止任务，在忙完后需要继续做任务，请完全退出阅读助手后重新开始打开。
      </van-collapse-item>
      <van-collapse-item
        title="9、怎样正确的推荐给朋友？"
        name="9"
      >
        邀请朋友阅读，需要您进入主页面，点屏幕右上角三个点，选择发送给朋友或者分享到朋友圈，您的朋友点击您分享的链接进入才算你邀请的用户，或者直接生成您的邀请二维码，发给朋友，扫描二维码进入。
      </van-collapse-item>
      <van-collapse-item
        title="10、阅读助手显示一直执行中是什么情况？"
        name="10"
      >
        微信自身会有缓存，清理一下，再点开始阅读，助手会继续执行任务。
      </van-collapse-item>
      <van-collapse-item
        v-if="$channelCode=='YD'"
        title="11、还有什么可能会导致异常的操作？"
        name="11"
      >
        每天第一次进入阅读文章，平台会对用户进行权限检测，如果点X强退或者微信阅读功能被限制的用户账号会被锁定，如有误操作请加客服QQ
        1605436586。
      </van-collapse-item>
      <van-collapse-item
        v-if="$channelCode=='YD'"
        title="12、怎么联系平台？"
        name="12"
      >
        官方客服QQ
        <a
          href="javascript:void(0)"
          @click="callQQ"
        >1605436586</a>，有任何疑问或者业务合作，欢迎来聊！！
        <!-- http://wpa.qq.com/msgrd?v=3&uin=874066774&site=qq&menu=yes -->
        <!-- <a
          target="_blank"
          href="mqqwpa://im/chat?chat_type=wpa&uin=1605436586&version=1&src_type=web&web_src=oicqzone.com"
        ><img
          border="0"
          src="http://wpa.qq.com/pa?p=2:874066774:41"
          alt="点击这里给我发消息"
          title="点击这里给我发消息"
        ></a>
        <a
          target="_blank"
          href="//shang.qq.com/wpa/qunwpa?idkey=0378a8d1b3d2d41e720b22681221afae59b4b090dca6ba15a11ea13a1bf2f546"
        ><img
          border="0"
          src="//pub.idqqimg.com/wpa/images/group.png"
          alt="测试客服群"
          title="测试客服群"
        ></a> -->
        长按识别二维码加入客服群
        <img
          src="http://file.molin.work/production/upload/static/202003031221.png"
          class="bg"
        >
      </van-collapse-item>
    </van-collapse>
    <!-- <QRcode
      qrcodeurl="http://file.molin.work/staging/upload/static/WechatIMG2299.jpeg"
      desc="添加客服微信"
      btntext="长按添加客服"
    /> -->
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { Collapse, CollapseItem } from 'vant'
import QRcode from '@/components/QRcode.vue'
import WeChat from '@/plugins/wechatMixin'
@Component({
  name: 'QA',
  components: {
    QRcode,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  }
})
export default class Contact extends Mixins(WeChat) {
  public activeNames: Array<string> = ['1']

  created() {
    // 
    // let inviteUrl = `${process.env.VUE_APP_SHARE_URL}?parentId=${this.userBase.id}`
    let inviteUrl = `${process.env.VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect?parentId=${this.userBase.id}` 

    //  验证签名
    this.installWXbridge(inviteUrl)
  }

  callQQ() {
    let url = 'mqqwpa://im/chat?chat_type=wpa&uin=1605436586&version=1&src_type=web&web_src=oicqzone.com'
    // 'http://wpa.qq.com/msgrd?v=3&uin=1605436586&site=qq&menu=yes'
    window.open(url)
    // window.location.href =
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
  padding: 0.3rem 0;
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
  height: auto;
  border-radius: 34px;
}

.index.assistant .qr-box .qr-code .qr-code-img {
  height: auto;
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
