import request from '@/utils/request'

/**
 * 奖品管理-新增/编辑奖品
 * @param {*} data
 */
export function addOrupdatePrize(data) {
  return request({
    url: '/merchants/act/prize/addOrupdate',
    method: 'post',
    data
  })
}

/**
 * 奖品管理-列表
 * @param {*} data
 */
export function prizeList(data) {
  return request({
    url: '/merchants/act/prize/list',
    method: 'post',
    data
  })
}

/**
 * 奖品管理-新增库存
 * @param {*} data
 */
export function addPrizeStore(data) {
  return request({
    url: `/merchants/act/prize/addStore/${data.id}`,
    method: 'post',
    data
  })
}

/**
 * 根据id删除奖品
 * @param {*} id
 */
export function deletePrize(id) {
  return request({
    url: `/merchants/act/prize/del/${id}`,
    method: 'delete'
  })
}

/**
 * 添加或者更新奖品
 */
export function addOrUpdate(data) {
  return request({
    url: `/merchants/act/prize/addOrupdate`,
    method: 'post',
    data
  })
}

/**
 * 根据id查询奖品明细
 * @param {*} id
 */
export function getPrizeDetail(id) {
  return request({
    url: `/merchants/prize/getPrizeDetail/${id}`,
    method: 'post'
  })
}
