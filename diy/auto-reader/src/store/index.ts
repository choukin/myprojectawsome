import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { IUserState } from '@/utils/cookies'
Vue.use(Vuex)
export interface IRootState {
  user: IUserState
}
const debug = process.env.NODE_ENV !== 'production'
// 先生成 空的 store 动态生成其他模块
export default new Vuex.Store<IRootState>({
  plugins: [createPersistedState()], // 同步数据到localStorage
  strict: debug
})
