import request from '@/utils/request'

/**
 * 获取短信验证码
 * @param {*} data
 */
export function getMobileCode(data) {
  return request({
    url: '/admin/user/getCode',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/user/info',
    method: 'post'
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/merchants/officialAccount/updateUserInfo',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/admin/user/logout',
    method: 'post'
  })
}
