import * as PIXI from 'pixi.js-legacy'
import { px2rem } from './gameHelper'

export default class ResizeSprite extends PIXI.Sprite {
  constructor(options, size = 1) {
    super(options)
    this.width = px2rem(this.width) * size
    this.height = px2rem(this.height) * size
  }
}
// let nums = [-1, 0, 1, 2, -1, -4]
// let nums2 = []
// for (var i = 0; i < nums.length; i++) {
//   console.log(!nums2.includes(nums[i]), '!nums2.includes(nums[i])')
//     if (!nums2.includes(nums[i])) {
//         nums2.push(nums[i])
//     }
// }
// console.log(nums2)
