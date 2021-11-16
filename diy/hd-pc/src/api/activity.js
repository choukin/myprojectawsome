
import request from '@/utils/request'

/**
 * 获取活动数据
 */
export function fetchActInfo(page = 1) {
  return request({
    url: `/merchants/act/info?page=${page}`,
    method: 'post'
  })
}

/**
 * 创建或者更新公众号活动
 */
export function addOrUpdateOfficialAccount(data) {
  return request({
    url: '/merchants/act/officialAccount',
    method: 'post',
    data
  })
}

export function fetchActivityDetailByCode(activityCode) {
  return request({
    url: `/merchants/act/detail/${activityCode}`,
    method: 'get'
  })
}
/**
 * 删除活动
 */
export function deleteActivity(activityCode) {
  return request({
    url: `/merchants/act/${activityCode}`,
    method: 'delete'
  })
}

/**
 * 查询活动的奖品列表信息
 * @param {*} data
 */
export function fetchPrizeList(data) {
  return request({
    url: '/merchants/prize/detail',
    method: 'post',
    data
  })
}

/**
 * 更新奖品状态
 * @param {*} data
 */
export function updatePrizeStatus(data) {
  return request({
    url: `/merchants/act/updatePrizeStatus/${data.id}/${data.status}`,
    method: 'post'
  })
}

/**
 * 创建或者更新H5活动
 */
export function addOrUpdateCommonAddOrUpdate(data) {
  return request({
    url: '/merchants/act/commonAddOrUpdate',
    method: 'post',
    data
  })
}
