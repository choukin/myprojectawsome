/* eslint-disable prefer-const */
/**
 * px 换算 rem
 * @param size 设计稿px值
 * @returns {number} rem值
 */
export const px2rem = size => {
  const rootFontSize = parseFloat(window.document.documentElement.style.fontSize)
  return (size * rootFontSize) / 100
}

/**
 * 生成随机数
 * @param {*} min
 * @param {*} max
 */
export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 *
 */
export const reSizeSpirte = (spirte) => {
  spirte.width = px2rem(spirte.width)
  spirte.height = px2rem(spirte.height)
  return spirte
}
// 碰撞检测
export const hitTestRectangle = (r1, r2, globalFlag) => {
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy
  // console.log(r2.x + 'r2.x r2.x  ' + r2.y)
  let point = {
    x: r2.x,
    y: r2.y
  }
  // 默认没有碰撞
  hit = false
  // 计算每个精灵的中心点
  r1.centerX = r1.x + r1.width / 2
  r1.centerY = r1.y + r1.height / 2
  if (globalFlag) {
    point = r2.getGlobalPosition()
  }
  r2.centerX = point.x + r2.width / 2
  r2.centerY = point.y + r2.height / 2

  r1.halfWidth = r1.width / 2
  r1.halfHeight = r1.height / 2
  r2.halfWidth = r2.width / 2
  r2.halfHeight = r2.height / 2
  // 计算两个精灵中心点的间距
  vx = r1.centerX - r2.centerX
  vy = r1.centerY - r2.centerY

  // 计算两个精灵合并的 一半高度和宽度
  combinedHalfWidths = r1.halfWidth + r2.halfWidth
  combinedHalfHeights = r1.halfHeight + r2.halfHeight
  // x 轴间距对比
  if (Math.abs(vx) < combinedHalfWidths) {
    // x y 间距都小于连个精灵半径和 就是碰撞了
    if (Math.abs(vy) < combinedHalfHeights) {
      hit = true
    } else {
      hit = false
    }
  } else {
    hit = false
  }

  return hit
}

/**
 * 限制精灵的移动范围
 * @param {*} sprite 精灵
 * @param {*} container 范围
 */
export const contain = (sprite, container) => {
  // 精灵碰撞到容器的位置
  let collision
  if (sprite.x < container.x) {
    sprite.x = container.x
    collision = 'left'
    // console.log(sprite.x + ' ' + container.x)
  }

  if (sprite.y < container.y) {
    sprite.y = container.y
    collision = 'top'
  }
  //  console.log(sprite.x + sprite.width + ' ' + container.width)
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width
    //  console.log(sprite.x + ' ' + container.width)
    collision = 'right'
  }

  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height
    collision = 'bottom'
  }
  //  console.log(collision)
  return collision
}

/**
 * 调用手机震动，当手机打开震动时才起作用
 * @param {number} vibrateTime 震动时间
 */
export function vibrate(vibrateTime) {
  // 振动2秒
  navigator.vibrate = navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate
  navigator.vibrate && navigator.vibrate(vibrateTime)
}

/**
 * 随机洗牌
 * @param {*} input
 */
export function shuffle(input) {
  for (let i = input.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const itemAtIndex = input[randomIndex]
    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  return input
}

/**
 * 获取数组中相同元素个数
 * input ["coupon","coupon","point","coupon","coupon","point","point","point"];
 * output {coupon:4,point: 4}
 */
export function getRepeatNum(array) {
  return array.reduce(function(prev, next) {
    prev[next] = (prev[next] + 1) || 1
    return prev
  }, {})
}

/**
 * 对象转数组
 * input {coupon:4,point: 4}
 * output [{prizeType: "point",prizeNumber: 4},{prizeType: "coupon",prizeNumber: 4}]
 * @param {*} obj
 */
export function object2Array(obj) {
  const targetArray = []
  for (const item in obj) {
    const arrayitem = {
      prizeType: item,
      prizeNumber: obj[item]
    }
    targetArray.push(arrayitem)
  }
  return targetArray
}
