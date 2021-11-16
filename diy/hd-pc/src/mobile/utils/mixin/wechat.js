import { stringify } from 'qs'
// import { configWeChat, configWeChatShare } from '../wechat/index'
// import { isWeChat } from '@/mobile/utils/app'
import { getURLParams, getURLParam, to } from '@/mobile/utils'

// import { WECHAT } from '@/url/api'
// import api from '@/url'

// const { fetch } = require('@/utils/request.js')

import { fetchActInfoByCode, statistics, weChatAuth, lottery } from '@/mobile/api'
import store from '@/mobile/store'
// import { data } from 'autoprefixer'

/**
 * 获取微信权限验证数据
 */
// export const fetchWeChatAuth = () => {
//   const params = {
//     url: window.location.href.split('#')[0],
//     channel: process.env.CHANNEL.toUpperCase()
//   }
//   return fetch(WECHAT.auth, {
//     type: 'POST',
//     data: params,
//     userHeaderTemplate: false,
//     useJSONType: false
//   })
// }

// 微信工具方法

/**
 * 设置微信验证签名方法
 * @param {*} weChatInfo
 */
export const configWeChat = (weChatInfo, cb) => {
  if (!weChatInfo && !window.wx) {
    return false
  }
  wx.config({
    debug: false, // TODO: 需要查看问题时可以修改
    appId: weChatInfo.appId,
    timestamp: weChatInfo.timestamp,
    nonceStr: weChatInfo.nonceStr,
    signature: weChatInfo.signature,
    jsApiList: [ // 用到的微信jssdk方法列表
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'hideMenuItems',
      'showOptionMenu',
      'closeWindow'
    ]
  })
  // 设置微信
  wx.ready(function() {
    // 隐藏的菜单
    hideMenuItems()
    cb && cb()
  })
}

/**
 * 隐藏微信菜单
 */
export const hideMenuItems = () => {
  //  批量隐藏菜单项
  wx.hideMenuItems({
    menuList: [
      'menuItem:readMode', // 阅读模式
      'menuItem:copyUrl', // 复制链接
      'menuItem:openWithQQBrowser', // 在QQ浏览器里打开
      'menuItem:openWithSafari', // 在safari 中打开
      'menuItem:share:email', // 邮件
      'menuItem:share:qq', // 分享到 QQ
      'menuItem:share:weiboApp', // 分享到微博
      'menuItem:share:QZone', // 分享到qq空间
      'menuItem:refresh', // 刷新
      'menuItem:favorite', // 收藏
      'menuItem:refresh',
      'menuItem:exposeArticle' // 举报
    ],
    success: function(res) {
      // console.log('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮')
    },
    fail: function(res) {
      // console.log(JSON.stringify(res))
    }
  })
}

/**
 * 隐藏微信菜单
 */
export const hideMenuWeiXin = () => {
  //  批量隐藏菜单项
  wx.hideMenuItems({
    menuList: [
      'menuItem:share:appMessage', // 发送给朋友
      'menuItem:share:timeline' // 分享到朋友圈
    ],
    success: function(res) {
      // console.log('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮')
    },
    fail: function(res) {
      // console.log(JSON.stringify(res))
    }
  })
}

/**
 * 配置自定已微信分享信息
 * @param {Object} shareInfo 分享信息
 * @param {String} shareInfo.title 分享标题
 * @param {String} shareInfo.link
 * @param {String} shareInfo.imgUrl
 * @param {Function} shareInfo.success
 * @example
 * configWeChatShare({
 * title:'',
 * link:'',
 * imgUrl:'',
 * success:function(){}
 * })
 */
export const configWeChatShare = (shareInfo) => {
  if (!shareInfo) {
    return false
  }
  shareInfo = JSON.parse(JSON.stringify(shareInfo))
  // 设置微信
  wx.ready(function() {
    // 旧版微信 调用
    if (wx.onMenuShareTimeline) {
      wx.onMenuShareTimeline({
        title: shareInfo.title, // 分享标题
        link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl // 分享图标
      })

      wx.onMenuShareAppMessage({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc, // 分享描述
        link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
      })
    } else {
      wx.updateAppMessageShareData({
        title: shareInfo.title,
        desc: shareInfo.desc,
        imgUrl: shareInfo.imgUrl,
        link: shareInfo.link,
        success: function() {
          // 设置成功
          console.log('updateAppMessageShareData 设置成功')
        }
      })
      wx.updateTimelineShareData({
        title: shareInfo.title,
        desc: shareInfo.desc,
        imgUrl: shareInfo.imgUrl,
        link: shareInfo.link,
        success: function() {
          // 设置成功
          console.log('updateTimelineShareData 设置成功')
        } }
      )
    }
  })
}
/**
 * 微信验证签名 minx
 */
const wechatMixin = {
  data() {
    return {
      code: '',
      activityCode: '',
      activityInfo: {
        activityCode: '',
        activityType: '',
        activityDesc: '',
        allowDrawCount: '',
        shareImg: '',
        shareTitle: '',
        shareContext: '',
        drawActPrizeVo: [
        ],
        openShare: true,
        isNeedAuth: true
      },
      prizeInfo: {
        img: '', // 奖品图片
        validTime: '', // 有效期描述
        id: '', // 奖品记录id
        name: '', // 奖品名字
        value: '', // 奖品内容
        isInPrize: '', // 是否中奖
        prizeType: 0// 0 虚拟 1 实物
      },
      callbacks: []
    }
  },
  created() {
    // 如果是微信环境进行验证签名
    console.log(this.$isWeChat)

    // TODO:
    // this.wechatAuth()
    // TODO:
    this.activityCode = getURLParam('activityCode')
    this.fetchActInfoByCode()

    if (this.$isWeChat) {
      this.activityCode = getURLParam('activityCode')
      this.code = getURLParam('code')
      if (getURLParam('redirectType')) {
        this.redirect()
      } else {
        // token 过期或未获取重新获取
        if (!this.userInfo.token) {
          this.wechatAuth()
        }
        // 拿到首页的openid
        // this.configWeChatShare({
        //   title: 'lIFECARDSHAREOPTIONS.shareText',
        //   desc: 'lIFECARDSHAREOPTIONS.shareContent',
        //   link: '', // formatRouter('downstream', { redirectType: true, shareMemberId: decodeURIComponent(getURLParam('shareMemberId')), shareRouter: 'downstream' }),
        //   imgUrl: 'lIFECARDSHAREOPTIONS.shareImage'
        // })
        // this.getHelpInfo()
      }
    }
  },
  mounted() {
    console.log(window.location.href)
    // 统计pvvu
    if (this.activityCode) {
      statistics(this.activityCode)
    }
  },
  methods: {
    async handlelottery() {
      const [data] = await to(lottery(this.activityCode))
      this.prizeInfo = data.data
      return data.data
    },
    /**
     *
     */
    fetchActInfoByCode() {
      fetchActInfoByCode(this.activityCode).then(res => {
        const gameInfo = res.data
        // 大转盘处理数据
        if (gameInfo.activityType === 100 && gameInfo.drawActPrizeVo.length > 0) {
          gameInfo.drawActPrizeVo = gameInfo.drawActPrizeVo.map(item => {
            item.active = false
            return item
          })
        }
        this.activityInfo = gameInfo
        this.$store.dispatch('setGameInfo', { ...gameInfo })
      }).catch(error => {
        console.error(error)
      })
    },
    gotoPrizeList() {
      this.gotoRouterName('/prizeList?activityCode=' + this.activityCode)
    },
    /**
     * 配置分享信息
     * @example
     * this.configWeChatShare({
     *               title: '',
     *               link: '',
     *               desc: '',
     *               imgUrl: ''
     *             })
     */
    configWeChatShare,
    hideMenuWeiXin,
    wechatAuth: function() {
      // 微信公众号验签
      weChatAuth({ code: this.code, activityCode: this.activityCode }).then(data => {
        console.log('weChatAuth', data)
        store.dispatch('setBaseInfo', { token: data.data })
        this.fetchActInfoByCode()
        // configWeChat(data[0], () => {
        //   this.callbacks.forEach(fn => fn())
        // })
      })
    },
    /**
    * 获取要分享的链接
    * @param {*} routerName 分享后要跳转的页面路由
    * @param {*} params 分享要带的参数
    * @example
    *  getShareUrl('activePage', {
    *  activityCode: '12312313',
    *  shareRouter: 'home', // 分享后用户进入的页面路由
    * })
    */
    getShareUrl(routerName, params) {
      const redirectType = params.redirectType || ''
      // redirectType == 'redirect' 表示链接需要通过微信授权重定向
      if (!redirectType) {
        params.redirectType = 'redirect'
      }
      const prefixUrl = window.location.href.replace(window.location.hash, '').replace(window.location.search, '')
      const strParams = stringify(params)
      const url = `${prefixUrl}#/${routerName}?${strParams}`
      return url
    },
    /**
    * 格式化URL
    */
    formatUrl() {
      const params = getURLParams() || {}
      const prefixUrl = window.location.href.replace(window.location.hash, '').replace(window.location.search, '')
      // 获取中转后的
      const routerName = params.shareRouter || ''
      if (params.redirectType) { // 删除重定向标示参数
        delete params.redirectType
      }
      if (params.shareRouter) { // 删除分享路由参数
        delete params.shareRouter
      }

      const strParams = stringify(params)
      const urlpath = `${prefixUrl}#/${routerName}?${strParams}`
      return urlpath
    },
    /**
    * 转换为微信地址
    * @param {String} redirect_uri -需要重定向到的地址
    * @param {String} type -授权类型
    *                    snsapi_base 不弹授权提示只获取用户 openid
    *                    snsapi_userinfo  snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
    * @example
    *
    */
    redirect() {
      const scope = 'snsapi_userinfo'
      let redirect_uri = this.formatUrl()
      redirect_uri = encodeURIComponent(redirect_uri)
      const WXAPPID = process.env.VUE_APP_WXAPPID
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WXAPPID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}#wechat_redirect`
      window.location.replace(url)
    }
  }
}

export default wechatMixin
