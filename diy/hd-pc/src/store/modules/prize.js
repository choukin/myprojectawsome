
const state = {
  prize: {
    id: '', // 非必须
    name: '', //	string	名字
    prizeType: '0',	// string	非必须 0 优惠券 1 实物
    count: '', //	number	非必须 数量
    img: '', //	number	非必须图片
    remark:	'', // number	非必须备注
    valid_date: '0', //	number	非必须 领取后XX天失效
    valid_start_time: '', //	number	非必须有效开始时间
    valid_end_time: '', //	number	非必须有效结束时间
    valid_time: '', // 有效时间范围
    valid_time_type: '0'	// number	非必须0 固定有效期 1 领取后XX天有效
  },
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_PRIZE: (state, prize) => {
    for (const key in prize) {
      state.prize[key] = prize[key]
    }
  },
  CLEAR_PRIZE: (state) => {
    state.prize = {}
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
