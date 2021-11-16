const apiHost = process.env.VUE_APP_BASE_API

/**
 * 微信
 */
const WECHAT = {
  auth: `${apiHost}/user/wechat/auth` // 微信根据code授权登陆 自定义分享验证签名接口
}

const ACTIVITY = {
  detail: `${apiHost}/act/detail/info`, // 活动-根据活动code获取活动信息
  lottery: `${apiHost}/act/user/lottery`, // activityCode 活动-抽奖
  saveRecordMemberPrize: `${apiHost}/act/user/saveRecordMemberPrize`, // 活动-根据奖品记录ID录入收货地址
  prizeList: `${apiHost}/act/user/detail/info/prize/list`, // activityCode 活动-奖品记录
  statistics: `${apiHost}/act/detail/statistics`// 我的活动-统计PV和UV
}

const shareOptions = {
  type: 1,
  platform: 1,
  shareText: '！',
  shareContent: '',
  // shareUrl: shareUrl,
  image: `https://static.9f.cn/pos/20191223/1577085241602.png`
}

module.exports = {
  shareOptions,
  WECHAT,
  ACTIVITY
}
