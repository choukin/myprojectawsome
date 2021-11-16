import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import {
  setToken,
  setUserToken,
  getUserToken,
  getToken,
  removeToken,
  getRandomKey,
  setRandomKey,
  removeRandomKey,
  setAutoReaderKey,
  getAutoReaderKey,
  getResettype,
  setResettype,
  setIdCodeTipsKey,
  getIdCodeTipsKey,
  getUserBase,
  setUserBase,
  getServiceIMGUrl,
  setServiceIMGUrl,
  IUserBase,
  IUserState
} from '@/utils/cookies'

import * as types from '../types'

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public usertoken  = getUserToken() || ''
  public randomKey = getRandomKey() || ''
  public autoReader: boolean = getAutoReaderKey() === 'true'
  // public resettype: number = Number(getResettype() || 0)
  // public idcode: string = getIdCodeTipsKey() || ''
  public userbase: IUserBase = getUserBase()
  public serviceIMGUrl: string = getServiceIMGUrl()


  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
    setToken(token)
  }
  // @Mutation
  // private SET_IDCODE(idcode: string) {
  //   this.idcode = idcode
  //   setIdCodeTipsKey(idcode)
  // }
  // @Mutation
  // private SET_RESETTYPE(resettype: number) {
  //   this.resettype = resettype
  //   setResettype(resettype + '')
  // }

  @Mutation
  private SET_RANDOMKEY(randomKey: string) {
    this.randomKey = randomKey
    setRandomKey(randomKey)
  }
  @Mutation
  private SET_AUTOREADER(autoreader: boolean) {
    this.autoReader = autoreader
  }
  @Mutation
  SET_USERBASE(userBase: IUserBase) {
    setUserBase(userBase)
  }

  @Mutation
  SET_USERTOKEN(usertoken:string){
    this.usertoken = usertoken
    setUserToken(usertoken)
  }

  @Mutation
  private SET_SERICEIMGURL(serviceIMGUrl: string) {
    this.serviceIMGUrl = serviceIMGUrl
    setServiceIMGUrl(serviceIMGUrl)
  }

  @Action
  public setAutoReader(autoReader: boolean = false) {
    setAutoReaderKey(String(autoReader))
    this.SET_AUTOREADER(autoReader)
  }
  @Action
  public resetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_RANDOMKEY('')
  }
  @Action
  public setUserToken(usertoken:string) {
    this.SET_USERTOKEN(usertoken||'')
  }
  @Action
  public setServiceImgURL(serviceImgURL: string = '') {
    this.SET_SERICEIMGURL(serviceImgURL)
  }
    
  @Action
  public setUserInfo(userInfo: IUserState) {
    this.SET_TOKEN(userInfo?.token||'')
    this.SET_USERTOKEN(userInfo?.usertoken||'')
    this.SET_RANDOMKEY(userInfo?.randomKey||'')
    // this.SET_RESETTYPE(userInfo.resettype)
    // this.SET_IDCODE(userInfo.idcode)
    this.SET_USERBASE(userInfo?.userbase||{})
  }
}
console.log((getModule(User) as any).store.state.user, 'getModule(User)')

export const UserModule = getModule(User)
