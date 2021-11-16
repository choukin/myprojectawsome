import TWEEN from '@tweenjs/tween.js'
/**
 * 从上到下入场动画
 */
export const bounceInDown = (sprite, next) => {
  const bounceInDown = new TWEEN.Tween({
    alpha: 0,
    y: -2000
  })
    .to({
      alpha: 1,
      y: sprite.y
    }, 500)
    .yoyo(true)
    .onUpdate(({ y, alpha }) => {
      sprite.y = y
      sprite.alpha = alpha
    })
    .onComplete(() => {
      next && next()
      TWEEN.remove(bounceInDown)
    })
  return bounceInDown
}

/**
 * 向上出场动画
 */
export const bounceOutUp = (sprite, next) => {
  const bounceOutUp = new TWEEN.Tween({
    alpha: 1,
    y: sprite.y
  })
    .to({
      alpha: 0,
      y: -3000
    }, 500)
    .yoyo(true)
    .onUpdate(({ y, alpha }) => {
      sprite.y = y
      sprite.alpha = alpha
    })
    .onComplete(() => {
      next && next()
      TWEEN.remove(bounceOutUp)
    })
  return bounceOutUp
}
/**
 * 从下往上淡入
 * @param {*} sprite
 * @param {*} next
 */
export const bounceInUp = (sprite, next) => {
  const bounceInUp = new TWEEN.Tween({
    alpha: 0,
    y: 300
  })
    .to({
      alpha: 1,
      y: sprite.y
    }, 500)
    .yoyo(true)
    .onUpdate(({ y, alpha }) => {
      sprite.y = y
      sprite.alpha = alpha
    })
    .onComplete(() => {
      next && next()
      TWEEN.remove(bounceInUp)
    })
  return bounceInUp
}

/**
 *
 * @param {*} sprite
 * @param {*} next
 */
export const bounceOutDown = (sprite, next) => {
  const bounceInUp = new TWEEN.Tween({
    alpha: 1,
    y: sprite.y
  })
    .to({
      alpha: 0,
      y: 300
    }, 500)
    .yoyo(true)
    .onUpdate(({ y, alpha }) => {
      sprite.y = y
      sprite.alpha = alpha
    })
    .onComplete(() => {
      next && next()
      TWEEN.remove(bounceInUp)
    })
  return bounceInUp
}

/**
 * 淡入入场
 * @param {*} sprite
 */
export const fadeIn = (sprite, next) => {
  const fadeInDown = new TWEEN.Tween({
    alpha: 0
  })
    .to({
      alpha: 1
    }, 500)
    .delay(500)
    .yoyo(true)
    .onUpdate(({ y, alpha }) => {
      // sprite.y = y
      sprite.alpha = alpha
    })
    .onComplete(() => {
      next && next()
      TWEEN.remove(fadeInDown)
    })
  return fadeInDown
}
/**
 * 淡入入场
 * @param {*} sprite
 */
export const fadeOut = (sprite, next) => {
  const fadeInUp = new TWEEN.Tween({
    alpha: 1
  })
    .to({
      alpha: 0
    }, 500)
    .yoyo(true)
    .onUpdate(({ y, alpha }) => {
      // sprite.y = y
      sprite.alpha = alpha
    })
    .onComplete(() => {
      next && next()
      TWEEN.remove(fadeInUp)
    })
  return fadeInUp
}

/**
 * 淡入
 * @param {*} sprite
 * @param {*} next
 */
export const fadeInfinity = (sprite) => {
  const fadeInfinity = new TWEEN.Tween({
    alpha: 0
  }).to({
    alpha: 1
  }, 1000)
    .yoyo(true)
    .onUpdate(({ x, y, alpha }) => {
      sprite.alpha = alpha
    }).repeat(Infinity)
    .start()
  return fadeInfinity
}
/**
 * 从右侧淡入
 * @param {*} sprite
 * @param {*} next
 */
export const fadeInLeft = (sprite, next) => {
  const fadeInRight = new TWEEN.Tween({
    alpha: 0,
    x: 0
  })
    .to({
      alpha: 1,
      x: sprite.x
    }, 500)
    .yoyo(true)
    .onUpdate(({ x, alpha }) => {
      sprite.x = x
      sprite.alpha = alpha
    })
    .onComplete(() => {
      next && next()
      TWEEN.remove(fadeInRight)
    })
  return fadeInRight
}
/**
 * 从右侧淡入
 * @param {*} sprite
 * @param {*} next
 */
export const fadeOutLeft = (sprite, next) => {
  const fadeInRight = new TWEEN.Tween({
    alpha: 1,
    x: sprite.x
  })
    .to({
      alpha: 0,
      x: -sprite.x
    }, 500)
    .yoyo(true)
    .onUpdate(({ x, alpha }) => {
      sprite.x = x
      sprite.alpha = alpha
    })
    .onComplete(() => {
      next && next()
      TWEEN.remove(fadeInRight)
    })
  return fadeInRight
}

/**
 * 心脏跳动动画
 */
export const heartBeat = (spirte) => {
  const oldScale = spirte.scale.x
  const heartBeat = new TWEEN.Tween({
    scale: 0.8 * oldScale
  }).to({
    scale: oldScale
  }, 500)
    .yoyo(true)
    .onUpdate(({ scale }) => {
      spirte.scale.x = scale
      spirte.scale.y = scale
    }).repeat(Infinity)

  return heartBeat
}

/**
 *
 * @param {*} target
 */
export const timeBarProgress = (target, clock) => {
  console.log('timeBarProgress')
  const targetHeight = target.height
  const innerWidthTW = new TWEEN.Tween({
    width: target.width
  })
    .to({
      width: 0
    }, target.duration)
    .yoyo(true)
    .onUpdate(({ width }) => {
      target.clear()
      target.beginFill(0xff9933)
      target.drawRoundedRect(clock.x, clock.y - 4, width, targetHeight, 9)
      target.endFill()
    })
    .start()
    .onComplete(() => {
      TWEEN.remove(innerWidthTW)
    })
  return innerWidthTW
}

/**
  * 得分动效
  * @param {*} options
  */
export const getScoreAnimate = (options) => {
  // 初始y轴位置
  const originy = options.originy
  // 运动到y轴位置
  const targety = options.targety
  //
  const target = options.target
  const oldscale = target.scale.x
  // +1 动效
  const one = new TWEEN.Tween({
    scale: 0,
    alpha: 0,
    y: originy
  })
    .to({
      scale: 1.2 * oldscale,
      y: targety
    }, 100)
    .easing(TWEEN.Easing.Bounce.InOut)
    .yoyo(true)
    .onUpdate(({ x, y, scale }) => {
      target.y = y
      target.scale.x = scale
      target.scale.y = scale
      target.alpha = 1
      console.log(1213)
    })
    .start()
    .onComplete(() => {
      window.setTimeout(() => {
        target.destroy()
      }, 100)

      TWEEN.remove(one)
    })
}
