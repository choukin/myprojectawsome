import request from '@/utils/request'

/**
 * 获取用户企业信息
 * @param {*} data
 */
export function fetchEnterpriseInfo() {
  return request({
    url: '/merchants/officialAccount/enterpriseInfo',
    method: 'post'
  })
}

/**
 * 更新用户企业信息
 * @param {*} data
 */
export function updateEnterpriseInfo(data) {
  return request({
    url: '/merchants/officialAccount/updateEnterpriseInfo',
    method: 'post',
    data
  })
}
