import request from '@/utils/mobilerequest'

/**
 * 获取活动数据
 */
export function fetchActInfoByCode(activityCode) {
  return request({
    url: `/act/detail/info/${activityCode}`,
    method: 'post'
  })
}

/**
 * 抽奖
 * @param {*} activityCode
 */
export function lottery(activityCode, data) {
  return request({
    url: `/act/user/lottery/${activityCode}`,
    method: 'post',
    data,
    codeHandle: 'skip'
  })
}

/**
 * PVUV
 */
export function statistics(activityCode) {
  return request({
    url: `/act/detail/statistics/${activityCode}`,
    method: 'post',
    data: { deviceId: '' }
  })
}

/**
 * 录入奖品地址
 * @param {*} activityCode
 */
export function saveRecordMemberPrize(data) {
  return request({
    url: `/act/user/saveRecordMemberPrize`,
    method: 'post',
    data
  })
}

/**
 * 获取奖品列表
 * @param {*} activityCode
 */
export function fetchPrizeList(activityCode) {
  return request({
    url: `/act/user/detail/info/prize/list/${activityCode}`,
    method: 'get'
  })
}

/**
 * 微信认证
 * @param {*} code
 */
export function weChatAuth(data) {
  return request({
    url: `/user/wechat/auth`,
    method: 'post',
    data: data
  })
}

