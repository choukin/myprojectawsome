import Vue, { PluginObject } from 'vue'
import { Component } from 'vue-property-decorator'
import jWeixin, { IOnMenuShareAppMessage, ApiMethod } from 'tencent-wx-jssdk'
interface WeChatInfo {
  timestamp: number
  nonceStr: string
  signature: string
  appId: string
}
@Component({
  name: 'wechatMixin'
})
export default class Wechat extends Vue {
  public installWXbridge(inviteUrl: string) {
    var isWeiXinEnv = /MicroMessenger/i.test(navigator.userAgent)
    // 如果是微信环境进行验证签名
    if (isWeiXinEnv) {
      this.wechatAuth(inviteUrl)
    }
  }
  public async wechatAuth(inviteUrl: string) {
    const signature: WeChatInfo = await this.$get(this.$Host + '/gunsApi/shareForSignatureApi/ajax_do_signature', {
      url: window.location.href.split('#')[0]
    })
    this.configWeChat(signature, inviteUrl)
  }
  public configWeChat(weChatInfo: WeChatInfo, inviteUrl: string) {
    if (!weChatInfo) {
      return false
    }
    let jsApiList: ApiMethod[] = [
      // 用到的微信jssdk方法列表
      'updateAppMessageShareData' as ApiMethod, // 类型断言
      <ApiMethod>'updateTimelineShareData',
      <ApiMethod>'onMenuShareAppMessage',
      <ApiMethod>'onMenuShareTimeline',
      // 'hideMenuItems',
      <ApiMethod>'showOptionMenu',
      <ApiMethod>'closeWindow'
    ]
    jWeixin.config({
      debug: false, // TODO: 需要查看问题时可以修改
      appId: weChatInfo.appId || '', //weChatInfo.appId,
      timestamp: weChatInfo.timestamp,
      nonceStr: weChatInfo.nonceStr,
      signature: weChatInfo.signature,
      jsApiList
    })
    // 设置微信
    // jWeixin.ready(function() {
    // 隐藏的菜单
    //   hideMenuItems()
    // })
    let shareinfo: IOnMenuShareAppMessage = {
      title: '自动任务平台，全民任务，提现秒到账',
      link: inviteUrl,
      desc: '自动任务平台，全民任务，提现秒到账',
      imgUrl: `${window.location.protocol + '//' + window.location.host}/static/share.png`,
      dataUrl: '',
      type: 'link',
      success: () => {
        // console.log('sucess')
      },
      cancel: () => {
        // console.log('cancel')
      }
    }
    this.configWeChatShare(shareinfo)
    // })
  }

  public configWeChatShare(shareInfo: { title: string; link: string; imgUrl: string; desc: string }) {
    if (!shareInfo) {
      return false
    }
    shareInfo = JSON.parse(JSON.stringify(shareInfo))

    // 设置微信
    jWeixin.ready(() => {
      // 旧版微信 调用
      // if (jWeixin.onMenuShareTimeline) {
      jWeixin.onMenuShareTimeline(shareInfo)
      jWeixin.onMenuShareAppMessage(shareInfo)
    })
  }
}
