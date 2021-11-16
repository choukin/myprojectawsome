import * as types from '../types'
// import { rawFetchPost } from '@/mobile/utils/request.js'
// import { API, giftRainCode } from '@/mobile/url/api'
// import { messageBox } from '@/mobile/utils/popups.js'
import { getURLParam } from '@/mobile/utils'

import { lottery } from '@/mobile/api'

function getWordCnt(prizes) {
  var obj = []
  for (var i = 0, l = prizes.length; i < l; i++) {
    var item = prizes[i]
    const index = obj.findIndex(element => {
      return element.id === item.id
    })
    if (index !== -1) {
      item.count = obj[index].count + 1
      obj[index] = item
    } else {
      item.count = 1
      obj.push(item)
    }
  }
  return obj
}
// 设备及用户信息
const state = {
  progress: 0,
  beginTime: 0, // 距离下一场开始剩余时间(毫秒)
  continueTime: 15000, // 单场活动持续时间(单位：秒)
  hasJoin: true, // 是否已参与true-已参与 false-未参与
  playNumKey: '', // 当天活动场次
  coin: 0,
  redpacket: 0,
  showRule: false,
  showOpeningTime: false,
  // TODO:
  showPrize: false,
  showInfo: false,
  type: '',
  gameState: 'pending', // pending 待定 start 开始 play 进行中 pause 暂停 end 结束
  userPrizeList: [],
  prizeInfo: {
    id: '',
    img: '',
    isInPrize: '',
    name: '',
    prizeType: '',
    validTime: '',
    value: ''
  }
}

const mutations = {
  [types.SET_GAMEINFO](state, data) {
    for (const key in data) {
      state[key] = data[key]
    }
  },
  [types.SET_SHOWRULE](state, showRule) {
    state.showRule = showRule
  },
  [types.SET_USERPRIZELIST](state, prizeList) {
    state.userPrizeList = prizeList
  },
  [types.SET_PRIZEINFO](state, payload) {
    state.prizeInfo = payload
  }
}

const actions = {
  setPrizeInfo({ commit }, obj) {
    commit(types.SET_PRIZEINFO, obj)
  },
  setGameInfo({ commit }, obj) {
    commit(types.SET_GAMEINFO, obj)
  },
  setShowRule({ commit }, obj) {
    commit(types.SET_SHOWRULE, obj)
  },
  sendUserPrizeList({ commit, state }, payload) {
    // console.log(payload, 'payload') payload.awardPrizecount
    // payload.awardPrizeList = []
    const activityCode = getURLParam('activityCode')
    // TODO:
    lottery(activityCode + `/${payload.awardPrizeCount}`).then(res => {
      console.log(res)
      this.prizeList = [res.data]
      // })
      // rawFetchPost(API.prizeSend, { awardPrizeList: payload.awardPrizeList, playNumKey: state.playNumKey, activityCode: giftRainCode }, { showLoading: false, encrypt: true })
      //   .then(res => {
      commit(types.SET_GAMEINFO, {
        gameState: 'end'
      })
      // 获取奖励
      if (res.data && res.data.length > 0) {
        const prizeList = res.data
        const prizes = getWordCnt(prizeList)
        commit(types.SET_USERPRIZELIST, prizes)
        commit(types.SET_GAMEINFO, {
          showPrize: true,
          type: 'lucky'
        })
      } else {
        commit(types.SET_GAMEINFO, {
          showInfo: true,
          type: 'unlucky'
        })
      }
    }).catch(e => {
      commit(types.SET_GAMEINFO, {
        gameState: 'end'
      })
      console.error(e)
    })
  }
}

const getters = {
  gameInfo: (state) => state,
  prizeInfo: (state) => state.prizeInfo
}

export default {
  state,
  actions,
  mutations,
  getters
}
