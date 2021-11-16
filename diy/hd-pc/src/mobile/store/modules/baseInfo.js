import * as types from '../types'
import { getMobileToken, setMobileToken } from '@/utils/auth'

// 设备及用户信息
const state = {
  parentActivityCode: '',
  token: getMobileToken(),
  memberId: '',
  versionCode: 0,
  versionName: '0',
  mobile: ''
}

const mutations = {
  [types.SET_BASEINFO](state, data) {
    for (const key in data) {
      state[key] = data[key]
    }
  }
}

const actions = {
  setBaseInfo({ commit }, obj) {
    if (obj.token) {
      setMobileToken(obj.token)
    }
    commit(types.SET_BASEINFO, obj)
  }
}

const getters = {
  userInfo: (state) => state
}

export default {
  state,
  actions,
  mutations,
  getters
}
