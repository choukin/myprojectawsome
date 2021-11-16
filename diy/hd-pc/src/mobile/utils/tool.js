
import dayjs from 'dayjs'
// import { JSEncrypt } from 'jsencrypt'
import sha1 from 'sha1'
import CryptoJS from 'crypto-js'
const iv = '21520baeed8a48eb'
/**
 * 获取Url参数中指定name的值
 * @param name 参数名称
 * @returns {string}
 */
export const getURLParam = name => {
  const re = new RegExp('(^|&)' + name + '=([^&#]*)(&|$)')
  let value = ''
  const arrHash = window.location.hash.split('?')
  const arrSearch = window.location.search.substr(1).split('?')
  arrHash.shift()
  const arr = arrSearch.concat(arrHash)

  for (let i = 0; i < arr.length; i++) {
    const r = arr[i].match(re)
    if (r !== null && r[2]) {
      value = r[2]
      break
    }
  }
  return value
}

/**
 * 返回包含当前URL参数的对象
 * @param {string} url
 * @returns {object}
 */
export const getURLParams = (url = window.location.href) =>
  (url.match(/([^?=&]+)(=([^&#]*))/g) || []).reduce((a, v) => {
    a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)
    return a
  }, {})

/**
 * 对象拷贝
 * @param {object} target 目标对象
 * @param {object} source 源对象
 * @param {boolean} isDeep
 */
export const clone = (target, source, isDeep = true) => {
  for (const name in source) {
    const copy = source[name]
    if (isDeep && copy instanceof Array) {
      target[name] = clone([], copy, isDeep)
    } else if (isDeep && copy instanceof Object) {
      target[name] = clone({}, copy, isDeep)
    } else {
      target[name] = source[name]
    }
  }
  return target
}

/**
 * rem 换算 px
 * @param rem 设计稿rem值
 * @returns {number} px值
 */
export const rem2px = rem => {
  const rootFontSize = parseFloat(window.document.documentElement.style.fontSize)
  return parseFloat(rem) * rootFontSize
}

/**
 * 保留两位小数、千分位格式化，格式：12,345.67
 * @param {string|number} amount
 * @returns {string}
 */
export const formatAmount = (amount) => {
  return (+amount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

/**
 * 数组切片
 * @param {array} array
 * @param {number} size
 * @returns {Array}
 * @example
 * sliceArray(['a', 'b', 'c', 'd'], 2)
 * => [['a', 'b'], ['c', 'd']]
 */
export const sliceArray = (array, size = 1) => {
  const result = []
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    result[i] = array.slice(size * i, size * (i + 1))
  }
  return result
}

/**
  * 异步延迟
  * @param {number} time 延迟的时间,单位毫秒
  */
export const sleep = (time = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

/* eslint-disable */
export const getCookie = (name) => {
  let cookie = decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
  if (cookie) {
    return cookie
  } else {
    let arr = ''
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2])
    }
  }
}

export const isIphone = () => {
  let ua = navigator.userAgent.toLocaleLowerCase()
  if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1 || ua.indexOf('macintosh') > -1) {
    return true
  } else {
    return false
  }
}


/**
 * 深复制
 * @param {boolean} deep
 * @param {object} target 目标对象
 * @param {object} options 附加参数
 */
export const extend = (deep, target, options) => {
  for (let name in options) {
    let copy = options[name]
    if (deep && copy instanceof Array) {
      target[name] = extend(deep, [], copy)
    } else if (deep && copy instanceof Object) {
      target[name] = extend(deep, {}, copy)
    } else {
      target[name] = options[name]
    }
  }
  return target
}


/**
 * 根据rem高度计算实际高度
 * @param rem 设计稿rem高度值
 * @returns {number} 高度px值
 */
export const getPxHeight = (rem) => {
  let fontSize = document.documentElement.style.fontSize.split('p')[0]
  let wWidth = document.compatMode === 'BackCompat' ? document.body.clientWidth : document.documentElement.clientWidth
  return (wWidth * 2 / 750) * rem * fontSize
}

    // 保存原来的方法
    // const targetFun = descriptor.value
    // descriptor.value = function (...args) { // 这里不能用剪头函数，否则this指向错误
    //   if (timeout) clearTimeout(timeout)
    //   let callNow = !timeout
    //   timeout = setTimeout(() => {
    //       timeout = null
    //   }, delay)
    //   // 立即执行
    //   if (callNow) targetFun.apply(this, args)
    // }
    // return descriptor
/**
 * 防抖
 * @param {*} fn 回调函数
 * @param {*} delay 延时时间
 */
export const _debounce = (fn, delay) => {
  let timeout
  // 保存原来的方法
  return function() {
    let args = arguments
    if (timeout) clearTimeout(timeout)
    let callNow = !timeout
    timeout = setTimeout(() => {
        timeout = null
    }, delay)
    // 立即执行
    if (callNow) fn.apply(this, args)
  }
  // delay = delay || 200
  // let timer
  // return function() {
  //   let th = this
  //   let args = arguments
  //   if (timer) {
  //     clearTimeout(timer)
  //   }
  //   timer = setTimeout(function() {
  //       timer = null
  //       fn.apply(th, args)
  //   },   delay)
  // }
}




/**
 * 图片预加载
 * @param {String} imageSrc  预加载图片链接
 */
export const loadImage = (imageSrc) => {
  let image = new Image()
  return new Promise((resolve, reject) => {
    image.onload = function () {
      resolve()
    }
    image.onerror = function () {
      reject()
    }
    image.src = imageSrc
  })
}

// 密码加密
// export const encryptstr = (str) => {
//   // 使用公钥加密
//   let encrypt = new JSEncrypt()
//   // 设置公钥
//   let publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOAvi4p9BUpNeXgXyNLM1uSnK4uIvfREAM72lhb5MwHmfO6FD7SyId1auo3JtCEG8oUS6AKYmxcTGj+yrI728G0CAwEAAQ=='
//   encrypt.setPublicKey(publicKey)
//   // 加密
//   let encrypted = encrypt.encrypt(str)
//   return encrypted
// }

// 密码加密
// export const encryptstr = (str) => {
//   // 使用公钥加密
//   let encrypt = new JSEncrypt()
//   // 设置公钥
//   let publicKey = 'MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEA4C+Lin0FSk15eBfI0szW5Kcri4i99EQAzvaWFvkzAeZ87oUPtLIh3Vq6jcm0IQbyhRLoApibFxMaP7KsjvbwbQIDAQABAkEAl9jcZVNFEAzl56gEiHPiYkGwxvQ55YdiHMz84Faua+vTOdOcacwfhaHqJBkQZbS+eeJZOC+pfBUbfmNqdGMFqQIhAP5W2CzQMB6tDsHoLDICxOZ8FFfsudPyO4DmBXXVBxBTAiEA4aZLuK5dEpOb3pddGU2ZWQiKMEqZY/aiD17TvpOQ5D8CIQCP9shWVWFne72mtKyPglHBxOoe+rgU6EAWLh1ZHUPqUQIgJ/wMvOwAyBLp8taFg79RZgpyWj5N0f3ZF7oo8UM60IcCIBH2olpNNuZ53c0JtKMG/o0I5BWsZZntv3iyDXMnfKlM'
//   encrypt.setPublicKey(publicKey)
//   // 加密
//   let encrypted = encrypt.encrypt(str)
//   return encrypted
// }

/**
 * 是否是数字
 * @param {any} n
 * @example
 * validateNumber('1') // =>false
 * validateNumber(1) // =>true
 * validateNumber(undefined) // =>false
 * validateNumber(null) //=>false
 * validateNumber('str') //=>false
 * validateNumber('0') // =>false
 * validateNumber(Number('0')) // =>true
 */
export const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) === n


/**
 * 格式化时间
 * @param {String} date 时间
 * @param {String} formatStr 格式
 * @example
 * formatTime('1560954591215') // => 2019-06-19 22:29:51
 * formatTime('1560954591215','YYYY年MM月DD日 HH时mm分ss') // => 2019年06月19日 22时19分51秒
 */
export const formatTime = (date, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return ''
  return dayjs(date).format(formatStr)
}

export const loadAllImg = (imgs) => {
  const promiseArr = imgs.map((img) => {
    return loadImage(img)
  })
  return Promise.all(promiseArr)
}

/**
 * 通过时间获取星期
 * @param {String} value 时间
 * @returns {String}
 */
export const day = (value) => {
  let day
  switch (dayjs(value).day()) {
    case 1:
      day = '一'
      break
    case 2:
      day = '二'
      break
    case 3:
      day = '三'
      break
    case 4:
      day = '四'
      break
    case 5:
      day = '五'
      break
    case 6:
      day = '六'
      break
    case 0:
      day = '日'
      break
  }
  return `星期${day}`
}
export const scrollTop = (instance = 0) => {
  document.body.scrollTop = instance
}


/**
 * 排序并且sha1 编码
 * @param {*} options
 */
export const  sortAndSha1 = (options) => {
  let keys = Object.keys(options)
  let array = []
  for (var i = 0; i < keys.length; i++) {
    let optionitem = options[keys[i]]
    if ( optionitem instanceof Array) {
      optionitem = JSON.stringify(optionitem)
    }
    array.push(optionitem)
  }
  let strData = array.sort().join('')
  return sha1(strData).toUpperCase()
}

/**
 * 合并
 */
export default function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/**
 * 加密
 */
export function encryptByAES(message, key) {
  console.log(key, 11111)
  message = JSON.stringify(message)
  key = key.substr(0,16)
  console.log(key,'key')
  var keyHex = CryptoJS.enc.Utf8.parse(key)
  var encrypted = CryptoJS.AES.encrypt(message, keyHex, {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

/**
 * 解密
 */
export function decryptByAES(ciphertext, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key)

  var decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    },
    keyHex,
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  )

  return decrypted.toString(CryptoJS.enc.Utf8)
}
