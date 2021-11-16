import request from '@/utils/request'

/**
 * 获取公众号列表
 * @param {*} data
 */
export function fetchOfficialAccountList(data) {
  return request({
    url: `/merchants/officialAccount/list`,
    method: 'post',
    data
  })
}
/**
* 更新或新建公众号信息
* @param {*} data
*/
export function fetchOfficialAccount(data) {
  return request({
    url: `/merchants/officialAccount/${data.id}`,
    method: 'post'
  })
}

/**
* 更新用户公众号信息
* @param {*} data
*/
export function updateOfficialAccount(data) {
  return request({
    url: '/merchants/officialAccount/addOrUpdate',
    method: 'post',
    data
  })
}

export function deleteeOfficial(id) {
  return request({
    url: `/merchants/officialAccount/del/${id}`,
    method: 'delete'
  })
}

/**
 * 绑定微信账户回调接口
 * @param {} auth_code
 */
export function bindOfficial(auth_code) {
  return request({
    url: '/user/loginwechat/auth/jump',
    method: 'get',
    params: { auth_code }
  })
}
