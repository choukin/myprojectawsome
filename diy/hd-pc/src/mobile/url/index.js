const {
  actHost, // h5活动域名
  staticHost, // 静态资源域名
  appHost, // api3域名
  apiHost, // 2.6 api域名
  actApiHost, // 活动api域名
  htmlHost, // M站域名
  oapiHost
} = ['', '', '', '', '', '', '']
// 常量文件
// const constant = require(`./constant_${process.env.CHANNEL}`)
export const { H5URL, APPURL } = ['', '']
const apiAddress = require('./api')

export default {
  actHost,
  htmlHost,
  appHost,
  apiHost,
  actApiHost,
  staticHost,
  H5URL,
  APPURL,
  oapiHost,
  WXAPPID: process.env.VUE_APP_WXAPPID,
  ...apiAddress
}
