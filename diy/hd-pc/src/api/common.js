
import request from '@/utils/request'

/**
 * 获取活动数据
 */
export function fetchActInfo() {
  return request({
    url: '/merchants/upload',
    method: 'post'
  })
}

