import Vue from 'vue'
import router from '../router'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { md5 } from 'md5js'
import qs from 'qs'
import to from 'await-to-js'
const { VUE_APP_HOST } = process.env
import { UserModule } from '@/store/modules/user'
import * as Sentry from '@sentry/browser'
import { getToken, removeToken, getRandomKey, removeRandomKey } from '@/utils/cookies'
import { AES_CBC_encrypt, encode } from '@/utils/aes'
import { Notify, Dialog } from 'vant'
import {isApp} from '@/plugins/global'
import {refreshusertoken} from '@/utils/app'
const HOST = ''
const CancelToken = axios.CancelToken
let isLog: boolean = false
// axios.defaults.headers = {
//   'X-Requested-With': 'XMLHttpRequest',
//   'Content-Type': 'application/x-www-form-urlencoded'
// }
// 请求超时的时间限制
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true

// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
let requestName: any
axios.interceptors.request.use(
  (config: any): AxiosRequestConfig => {
    // 补全baseURL
    if (config.baseURL) {
      config.url = HOST + config.url
    }
    // 设置token TODO:
    let token = config.tokenflag ? UserModule.usertoken :getToken() 
    // token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0NDkzIiwibmJjaG15ZHB0MDAzIjoicW8yaXcxIiwiZXhwIjoxNTkxODczMDIxLCJpYXQiOjE1OTEyNjgyMjF9.FI89JqM-JZOKQz7rO4hU4Cl0zLhulfpv6BGzk0AQJa1PzMbhlVkWWgPUlxnl1BfoW4VljaP-IdjCMDDW5UHT9w'
    console.log(config.tokenflag?'任务token: ':'apptoken: '+ token)
    if (process.env.NODE_ENV === 'development') {
      token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwibmJjaG15ZHB0MDAzIjoiZ241NmY4IiwiZXhwIjoxNTk0MzAxOTMyLCJpYXQiOjE1OTM2OTcxMzJ9.2vlb5tM_cUhVSfFHkLRFSO0PUjfc9P2npw7OEXrqN4_ZtQyeWYZQUucKpXqJN-klC9HPk5qM3ekaanS-sd2Nug' //UserModule.token
    }
    // 'eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJqeXFmdWwiLCJzdWIiOiIxOSIsImV4cCI6MTU3NDkwNzAwNSwiaWF0IjoxNTc0MzAyMjA1fQ.jRkefHbZfEEH7Y7v8kn1O38a8086nphYztPn6ETu5xF_ZC99BvnZ_iLLOdVct8YOgheM9hdJEzFj_ivhLMp0pg'
    config.params = config.params || {}
    config.headers.Authorization = `Bearer ${token}`

    // 请求参数中 有 requestName 用于决定下次请求，取消对应的 相同字段的请求
    //  如果没有就添加一个不同的时间戳
    if (config.method === 'post') {
      if (config.postType !== 'file') {
        console.log(config.data,'config.data')
      
        !config.data && (config.data = { sign: '' })
        // TODO:
        let randomKey = getRandomKey() //UserModule.randomKey // window.localStorage.getItem('randomKey')
        // console.log(UserModule.randomKey, 'randomKey', randomKey)
        let orginData = config.data
        config.data = {}
        let data = { sign: '', object: {},channel:isApp?'APP':'H5' }
        data.object = orginData

        let str = JSON.stringify(orginData) + randomKey
        // console.log(str, 'str')
        // TODO: 增加可以字典排序
        let sign = md5(str, 32)
        data.sign = sign
        // console.log('sign', sign)
        // debugger
        config.data = data
      }
    } 

    return config
  },
  (error: any) => {
    // console.error(error, 'onRequestError')
    return Promise.reject(error)
  }
)

// 对请求结果拦截处理
axios.interceptors.response.use(
  (response: any) => {
    Sentry.captureMessage(JSON.stringify(response.data), Sentry.Severity.Info)
    if (response.status != 200 || response.data.code) {
      return Promise.reject((response.response = response.data))
    }
    return response.data
  },
  (error: any) => {
    Sentry.captureMessage(JSON.stringify(error), Sentry.Severity.Error)
    handlerError(error)
  }
)

let retryCount = 0
let retryMax = 3
function handlerError(error: any) {
  console.error(error)
  console.log(error.config)

  let config = error.config
  if (error.message === 'Network Error' || error.message === 'timeout of 20000ms exceeded') {
    if (config.retry && retryCount < retryMax) {
      retryCount += 1
      console.log(config.retry, retryCount, 'config.__retryCount')
      return axios(config)
    }
  }
  Sentry.captureMessage(JSON.stringify(error), Sentry.Severity.Error)
  const code = parseInt((error.response && error.response.status) || error.code)
  if (
    code === 701 || // token为空
    code == 702 || // 请通过好友分享过来
    code === 700 || // token 过期 验证失败
    code === 703 || // token非法
    (code === 500 &&
      (error.response.data.code === 701 ||
        error.response.data.code == 702 ||
        error.response.data.code === 700 ||
        error.response.data.code === 703))
  ) {
    Notify({
      type: 'danger',
      message: (error.response && error.response.data && error.response.data.message) || error.message
    })
    if (process.env.NODE_ENV !== 'development') {
      window.location.replace(`${VUE_APP_HOST}/gunsApi/redirectIndexApi/redirect`)
    }
    // web token错误重新熟悉token  
    if (isApp) {
      refreshusertoken()
    }
  } else {
    if (error.message !== 'Network Error' && error.message !== 'timeout of 20000ms exceeded') {
      // code === 904没有机会阅读被锁住了 code === 902 文章阅读完毕
      Dialog.alert({
        title: '温馨提示',
        message: (error.response && error.response.data && error.response.data.message) || error.message,
        confirmButtonText: '我知道了'
      })
    }
    // 停止自动阅读
    // UserModule.setAutoReader()
  }
}
/**
 * 封装 get 请求
 * @param url
 * @param params
 */
const axiosGet = (url: any, params: any = {}, options: any = {}) => {
  console.log(options.codeHandle, 'options.codeHandle')
  let codeHandle = options.codeHandle||''
  let {tokenflag = false} = options
  let retry: boolean = true
  let skip: boolean = true
  
  let encrypt: boolean = options.encrypt || false
  params.timeplate = new Date().getTime()
  if (encrypt) {
    let randomKey = getRandomKey() || ''
    let reverseRandomKey: string = randomKey
      .split('')
      .reverse()
      .join('')
    let viAndkey = `nb${reverseRandomKey}ad${randomKey}`
    let paramsstr = JSON.stringify(params)
    let em = AES_CBC_encrypt(paramsstr, viAndkey, viAndkey)
    params = { em }
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url, { params, retry, tokenflag })
      .then((res: any) => {
        console.log(res, 'consoleres')
        resolve(res)
      })
      .catch((error: any) => {
        const code = parseInt((error.response && error.response.status) || error.code)
        // web token错误重新熟悉token  
        if (isApp && code == 700) {
          refreshusertoken()
        }
        const isSkipCode = codeHandle && (codeHandle === 'skip' || codeHandle[code] === 'skip')
        if (error.code && isSkipCode) {
          console.error(error, 'error')
          reject(error)
        } else {
          handlerError(error)
          reject(error)
        }
      })
  })
}

/**
 * 封装post 请求
 * @param url
 * @param params
 */
const axiosPost = (url: any, data: any, config: any={}) => {
  let codeHandle = config.codeHandle||''
  return new Promise((resolve, reject) => {
    // console.log(qs.stringify(params), 'qs.stringify(params)')
    // TODO:
    config.params = data
    axios
      .post(url, data,config)
      .then((res: any) => {
        resolve(res)
      })
      .catch((error: any) => {
        const code = parseInt((error.response && error.response.status) || error.code)
        // web token错误重新熟悉token  
        if (isApp && code == 700) {
          refreshusertoken()
        }
        const isSkipCode = codeHandle && (codeHandle === 'skip' || codeHandle[code] === 'skip')
        if (error.code && isSkipCode) {
          console.error(error, 'error')
          reject(error)
        } else {
          handlerError(error)
          reject(error)
        }
      })
  })
}

const fetchGet = (url: any, params: any = {}, options: any = {}) => {
  return to(axiosGet(url, params, options))
}
const fetchPost = (url: any, params: any = {}, options: any = {}) => {
  return to(axiosPost(url, params, options))
}
Vue.prototype.$get = axiosGet
Vue.prototype.$post = axiosPost
Vue.prototype.$fetchGet = fetchGet
Vue.prototype.$fetchPost = fetchPost
