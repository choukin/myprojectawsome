import {IUserState,IUserBase} from '@/utils/cookies'
export function getUserInfo() {
  return new Promise((resolve, reject)=>{
    let userInfoApp:any = {}
    let userInfo: IUserState = {}
    try{
      userInfoApp = window.client.getLoginBean() || "{}"
      console.log(userInfoApp+'userInfo1====')
      console.log(JSON.parse(userInfoApp))
      // 获取任务token
      let usertoken = window.client?.getUserToken()  || ''
      let userId = window.client.getUserId() || ''
      userInfoApp = JSON.parse(userInfoApp)||{}
      let userbase: IUserBase = {
        "idcode":userInfoApp.idcode,
        id:userId
      }
      userInfo = {
        autoReader: false,
        randomKey: userInfoApp.randomKey,
        token: userInfoApp.token,
        userbase: userbase,
        usertoken
      }
    } catch(e) {
      console.error(e)
      userInfo = {}
    }
    console.log('------------')
    console.log(userInfo )
    console.log('------------')
    resolve(userInfo)
  })
}

export function getUserId() {
  let userid = ''
  try{
    userid = window.client.getUserId()
  }catch(e){
    console.error(e)
  }
  return userid
}

export function openBrowser(url:string) {
  try{
    window.client.openBrowser(url)
  }catch(e){
    window.location.href = url
  }
}

export function setTitle(title: string) {
  try{
    window.client.setTitle(title)
  }catch(e){
    document.title = title
  }
}

export function gotoHome() {
  try{
    window.client.gotoHome('')
  }catch(e){
    console.error(e)
    console.log('[APP 回到首页]')
  }
}

/**
 * 打开webview
 * @param url 
 */
export function openPage(url: string){
  try{
    window.client.gotoWebActivity(url)
  }catch(e){
    console.error(e)
    window.location.href = url
  }
}

/**
 * web端token失效后通知app重新获取，app会刷新页面
 */
export function refreshusertoken() {
  try{
    window.client.refreshUserToken()
  } catch(e){
    console.error(e,'[APP refreshusertoken]')
  }
}
/**
 * 下载图片
 * @param imgSrc 
 * @param type  保存图片类型 0 base64 1 图片链接
 */
type ImageType = 0 | 1
export function downloadPic(imgSrc:string,type:ImageType) {
  try {
    window.client.downloadPic(imgSrc,type)
  } catch (error) {
    console.error(error, '[APP downloadPic]');
  }
}
/**
 * 跳转
 * @param path
 * @param query
 */
export const pushWindowByRouter = (path: string, query: any = {}) => {
  const indexURl = window.location.href.split('#')[0]
  let queryStr = ''
  if (typeof query === 'object') {
    const queryArr: Array<string> = []
    for (const key in query) {
      queryArr.push(`${key}=${query[key]}`)
    }

    if (queryArr.length) {
      queryStr = `?${queryArr.join('&')}`
    }
  } else if (typeof query === 'string') {
    queryStr = /^\?/.test(query) ? query : `?${query}`
  }

  openPage(`${indexURl}#/${path}${queryStr}`)
}


