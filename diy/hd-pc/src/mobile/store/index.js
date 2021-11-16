// Store
import Vue from 'vue'
import Vuex from 'vuex'

import baseInfo from './modules/baseInfo'
import gameInfo from './modules/game'

Vue.use(Vuex)

// 严格模式开启
const debug = process.env.TARGET !== 'production'

// 创建 store 实例
export default new Vuex.Store({
  modules: {
    baseInfo,
    gameInfo
  },
  strict: debug
})
