import Cookies from 'js-cookie'
export interface IUserBase {
  headimgurl?: string
  id?: number
  nickname?: string
  idcode?: string
  resettype?: number
}
export interface IUserState {
  token?: string
  usertoken?:string
  randomKey?: string
  autoReader?: boolean
  userbase?: IUserBase
}
const tokenKey = 'vue_typescript_reader_token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)

const usertokenKey = 'vue_typescript_reader_usertoken'
export const getUserToken = () => Cookies.get(usertokenKey)
export const setUserToken = (token: string) => Cookies.set(usertokenKey, token)
export const removeUserToken = () => Cookies.remove(usertokenKey)

const randomKeyStr = 'vue_typescript_reader_randomKey'
export const getRandomKey = () => Cookies.get(randomKeyStr)
export const setRandomKey = (randomKey: string) => Cookies.set(randomKeyStr, randomKey)
export const removeRandomKey = () => Cookies.remove(randomKeyStr)
const authURLKEYStr = 'vue_typescript_reader_authURL'
export const getAuthURLKey = () => Cookies.get(authURLKEYStr)
export const setAuthURLKey = (authurl: string) => Cookies.set(authURLKEYStr, authurl)
export const removeAuthURLKey = () => Cookies.remove(authURLKEYStr)

const autoReaderKey = 'vue_typescript_reader_autoReaderKey'
export const getAutoReaderKey = () => Cookies.get(autoReaderKey)
export const setAutoReaderKey = (readerKey: string) => Cookies.set(autoReaderKey, readerKey)
export const removeAutoReaderKey = () => Cookies.remove(autoReaderKey)

const idCodeTipsKey = 'vue_typescript_idCode_tipsKey'
export const getIdCodeTipsKey = () => Cookies.get(idCodeTipsKey)
export const setIdCodeTipsKey = (idCodeTips: string) => Cookies.set(idCodeTipsKey, idCodeTips)
export const removeIdCodeTipsKey = () => Cookies.remove(idCodeTipsKey)

const resettypeKey = 'vue_typescript_resetType'
export const getResettype = () => Cookies.get(resettypeKey)
export const setResettype = (resetType: string) => Cookies.set(resettypeKey, resetType)
export const removeResettype = () => Cookies.remove(resettypeKey)

const userBaseInfo = 'vue_typescript_userbase'
export const getUserBase = (): IUserBase => {
  try {
    let struserBase: string | undefined = Cookies.get(userBaseInfo)
    return JSON.parse(struserBase || '{}') as IUserBase
  } catch(e){
    console.error('>>>>>>')
    console.error(e)
    console.error('>>>>>>')
    return {}
  }
  
}
export const setUserBase = (userBase: IUserBase) => {
  Cookies.set(userBaseInfo, JSON.stringify(userBase))
}
export const removeUserBase = () => Cookies.remove(userBaseInfo)


const showstepsKey = 'show_steps'
export const getShowSteps = () => Cookies.get(showstepsKey)
export const setShowSteps = (token: string) => Cookies.set(showstepsKey, token)
export const removeShowSteps = () => Cookies.remove(showstepsKey)

const serviceIMGUrl = 'vue_typescript_serviceIMGurl'
export const getServiceIMGUrl = () => {
  return Cookies.get(serviceIMGUrl) || ''
}

export const setServiceIMGUrl=(imgUrl: string) => {
  Cookies.set(serviceIMGUrl, imgUrl)
}
export const removeServiceIMGUrl = () => Cookies.remove(serviceIMGUrl)
