/* 基于 ant-design-mobile 高清解决方案 */
const doc = window.document
const docEl = doc.documentElement
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
const isAndroid = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
const wWidth = window.innerWidth >= window.screen.width || window.innerWidth === 0 ? window.screen.width : window.innerWidth
const fontScale = 0.5 /* 设计稿是750px的2倍图 */
const baseFontSize = 100 /* 规定 1rem = 100px */
let dpr = window.devicePixelRatio || 1

/**
 * 修正rem支持问题导致计算不准
 * 如Samsung S7，fontSize设置为100px，实际1rem!=100px，
 */
let adjustScale = 1
docEl.style.fontSize = '100px'
const tempDiv = doc.createElement('div')
tempDiv.setAttribute('style', 'width:1rem; display:none')
docEl.appendChild(tempDiv)
const realWidth = window.getComputedStyle(tempDiv).width
docEl.removeChild(tempDiv)
if (realWidth !== docEl.style.fontSize) {
  adjustScale = 100 / parseInt(realWidth)
}

/**
 * 以下情况不适用高清缩放
 *   1. 非iOS
 *   2. Android4.3及以下
 *   3. iPhone678：钱包iOS使用UIWebView，在iphone6下缩放，内容宽度会变成376，导致页面可以左右滑动
 */
if ((!isIOS && !(isAndroid && isAndroid[1] > 534)) || (isIOS && wWidth === 375)) {
  dpr = 1
}
const scale = 1 / dpr
docEl.setAttribute('data-dpr', dpr)

let metaEl = doc.querySelector('meta[name="viewport"]')
if (!metaEl) {
  metaEl = doc.createElement('meta')
  metaEl.setAttribute('name', 'viewport')
  doc.head.appendChild(metaEl)
}
metaEl.setAttribute(
  'content',
  'width=device-width,viewport-fit=cover,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale
)
docEl.style.fontSize = dpr * fontScale * baseFontSize * adjustScale + 'px'
