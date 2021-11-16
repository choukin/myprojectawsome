import Vue from 'vue'
import Clipboard from 'clipboard'
import { Notify } from 'vant'
function clipboardSuccess(type) {
  if (type) {
    // 成功通知
    Notify({ type: 'success', message: '复制成功' })
  } else {
    Vue.prototype.$message({
      message: '复制成功',
      type: 'success',
      duration: 1500
    })
  }
}

function clipboardError(type) {
  if (type !== 'mobile') {
    Vue.prototype.$message({
      message: 'Copy failed',
      type: 'error'
    })
  } else {
    Notify({ type: 'warning', message: '复制失败' })
  }
}

export default function handleClipboard(text, event, type) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess(type)
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(type)
    clipboard.destroy()
  })
  clipboard.onClick(event)
}

