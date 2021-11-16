/* eslint-disable prefer-const */
import axios from 'axios'
import { stringify } from 'qs'
import { sortAndSha1, encryptByAES } from '@/mobile/utils/tool'
import store from '../store'
import { messageBox, toast, loading } from '@/mobile/utils/popups'
import { toLogin, closeWebView, isApp } from '@/mobile/utils/app'
import { removeMobileToken } from '@/utils/auth'

// axios 配置
// 超时时间
axios.defaults.timeout = 8000
// 默认 post 通过表单提交
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'

/**
 * 设置公共头部信息
 * @param {*} options
 */
function applyHeaderDataTemplate(options = {}) {
  const baseInfo = store.state.baseInfo
  const template = {
    // 'channel': process.env.CHANNEL.toUpperCase(),
    'loginChannel': isApp ? 'APP' : 'WEIXIN',
    'sign': sortAndSha1(options),
    'token': baseInfo.token ? baseInfo.token : ''
  }
  if (process.env.CHANNEL === 'qb') {
    template.memberId = baseInfo.memberId
  }
  return template
}

// 应用请求参数模板，适用于post请求
function applyDataTemplate(data = {}) {
  const baseInfo = store.state.baseInfo
  const template = {
    token: baseInfo.token,
    memberId: baseInfo.memberId,
    deviceId: baseInfo.deviceId,
    versionCode: baseInfo.versionCode,
    versionName: baseInfo.versionName,
    timestamp: new Date().getTime(),
    platform: 'h5',
    model: data
  }
  template.model.channel = process.env.CHANNEL.toUpperCase()
  return { data: JSON.stringify(template) } // 服务端接受格式要求
}

/**
 * 基于axios的请求方法封装
 * 默认: 使用POST请求方式、套用参数模板格式、统一拦截处理异常code
 *
 * @param {string} url 接口
 * @param {object} options 配置
 * @param {string} [options.method] - 请求方式，默认post
 * @param {object} [options.params] - 请求params参数
 * @param {object} [options.data] - 请求data参数
 * @param {object} [options.headers] - 请求头配置
 * @param {object} [options.responseType] - 请求返回数据的格式
 * @param {boolean} [options.useDataTemplate] - 套用请求参数模板
 * @param {object|string} [options.codeHandle] - 异常code码拦截配置: 'skip'-全部不统一拦截处理，'silent'-全部静默无需处理，对象格式配置见下方example
 * @param {boolean} [options.showLoading] - 自动显示loading，true-显示[默认]，false-不显示
 *
 * @returns {Promise<any>}
 *
 * @example
 * request('/data/api/path', {
 *   data: {},
 *   useDataTemplate: false,
 *   codeHandle: {
 *       8801: 'messageBox', // 使用messageBox提示
 *       8802: 'skip',       // 不拦截处理8802
 *       2023: 'silent'      // 静默无需处理
 *   }
 * })
 */
function request(url, options = {}) {
  const baseInfo = store.state.baseInfo
  let {
    method = 'POST',
    useDataTemplate = false,
    userHeaderTemplate = true,
    useJSONType = true,
    codeHandle = {},
    showLoading = true,
    encrypt = false,
    // appendActivityCode = true,
    data = {}
  } = options
  // 如果需要拼接活动code
  // appendActivityCode && (url += store.state.baseInfo.parentActivityCode)
  // 没有特殊配置，则自动显示加载中loading
  if (showLoading) {
    loading(true)
  }

  // TODO: 临时固定值
  // data.activityCode = 'qb_welfare_fight'
  // 是否使用

  if (encrypt) {
    console.log(encryptByAES, baseInfo)
    data = { data: encryptByAES(data, baseInfo.token) }
    console.log('data:', encryptByAES(data, baseInfo.token))
  }
  const timestamp = new Date().getTime()
  data.timestamp = timestamp

  const userHeaders = userHeaderTemplate ? applyHeaderDataTemplate(data) : {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  // console.log('data:', encryptByAES(data, baseInfo.token))
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method,
      data: method === 'POST' ? data : '',
      params: method === 'GET' ? data : '',
      responseType: options.responseType || 'json',
      headers: userHeaders,
      transformRequest: [
        data => (useDataTemplate ? applyDataTemplate(data) : data), // 是否需要配置数据模版默认不需要
        data => (useJSONType ? JSON.stringify(data) : stringify(data)) // 是否使用json格式默认使用json
      ]
    })
      .then(response => {
        const code = response.data.code
        /**
         * 自动隐藏loading规则
         * 配置项codeHandle里，设置为允许通过的异常code，则不自动隐藏，交由业务场景控制
         */
        const isSkippedCode = codeHandle === 'skip' || codeHandle[code] === 'skip'
        if (!isSkippedCode || code === '000000' || code === 0) {
          loading(false)
        }

        if (code === '000000' || code === 0 || code === 200) {
          /**
           * 请求正常
           */
          if (response.data.model || response.data.data || response.data.data === null) {
            resolve(response.data.model || response.data.data)
          } else {
            toast({ type: 'fail', message: '数据异常请稍后再试！' })
          }
        } else if (codeHandle === 'skip') {
          /**
           * 允许所有异常code通过:
           * codeHandle: 'skip'
           */
          reject(response.data)
          loading(false)
        } else if (codeHandle === 'silent') {
          /**
           * 所有异常code静默:
           * codeHandle: 'silent'
           */
          console.log(`[request] 已配置所有异常code静默 ${code}: ${response.data.message}`)
          return false
        } else if (~Object.keys(codeHandle).indexOf((code || '').toString())) {
          /**
           * 单个异常code的配置:
           * codeHandle: {
           *     9999: 'messageBox', // 使用messageBox弹窗提示
           *     8888: 'skip',       // 不拦截处理
           *     7777: 'silent'      // 静默无需处理
           * }
           */
          if (codeHandle[code] === 'messageBox') {
            messageBox(response.data.message).finally()
          } else if (codeHandle[code] === 'skip') {
            reject(response.data)
          } else if (codeHandle[code] === 'silent') {
            console.log(`[request] 已配置当前code静默 ${code}: ${response.data.message}`)
            return false
          }
        } else if (code === '000003' || code === 2023 || code === 2030) {
          /**
           * 统一处理账号超时、被踢
           *  2023-您的登录信息已过期，请重新登录
           *  2030-账号在另一个设备上进行登录
           */
          messageBox(response.data.message)
            .then(toLogin)
            .then(() => window.location.reload())
            .catch(() => closeWebView())
        } else {
          /**
           * 通用异常处理方式：toast提示
           */
          if (response.data.code === 3019) {
            removeMobileToken()
          }
          toast({ type: 'fail', message: response.data.message })
          reject(response.data)
        }
      })
      .catch(error => {
        console.log(error)
        loading(false)
        if (codeHandle === 'skip') {
          /**
           * 允许所有异常code通过:
           * codeHandle: 'skip'
           */
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ code: '503', message: '网络异常请稍后再试！' })
        } else {
          toast({
            type: 'fail',
            message: (error.response && error.response.status === 404) ? '服务异常请稍后再试！' : '网络异常请稍后再试！'
          })
        }
      })
  })
}

/**
 * https://github.com/scopsy/await-to-js
 * 包装请求请求promise返回数据的格式：[正常数据，异常数据]
 * 适用于async/await形式的写法，可以避免使用try catch处理异常返回的数据
 * @param promise
 * @returns {Q.Promise<*[]>}
 */
const to = (promise) => {
  return promise
    .then(data => {
      return [data, null]
    }
    )
    .catch(err => {
      return [undefined, err]
    })
}

/**
 * Post请求
 * 返回数据格式经过to方法处理
 */
function fetch(url, options = {}) {
  return to(request(url, options))
}

/**
 * Get请求
 * 返回数据格式经过to方法处理
 */
function fetchGet(url, params, options = {}) {
  options.method = 'GET'
  options.params = params
  return to(request(url, options))
}

/**
 * Post请求
 * 返回数据格式经过to方法处理
 */
function fetchPost(url, data, options = {}) {
  options.method = 'POST'
  options.data = data
  return to(request(url, options))
}

/**
 * Post请求
 * 适用于Promise().then().catch()形式的写法、以及用于Promise.all()
 */
function rawFetch(url, options = {}) {
  return request(url, options)
}

/**
 * Get请求
 * 适用于Promise().then().catch()形式的写法、以及用于Promise.all()
 */
function rawFetchGet(url, params, options = {}) {
  options.method = 'GET'
  options.params = params
  return request(url, options)
}

/**
 * Post请求
 * 适用于Promise().then().catch()形式的写法、以及用于Promise.all()
 */
function rawFetchPost(url, data, options = {}) {
  options.method = 'POST'
  options.data = data
  return request(url, options)
}

function install(Vue) {
  Vue.prototype.$fetch = fetch
  Vue.prototype.$fetchGet = fetchGet
  Vue.prototype.$fetchPost = fetchPost

  Vue.prototype.$rawFetch = rawFetch
  Vue.prototype.$rawFetchGet = rawFetchGet
  Vue.prototype.$rawFetchPost = rawFetchPost
}
export { fetch, fetchGet, fetchPost, rawFetchPost }
export default { install }
