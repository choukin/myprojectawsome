// 引入mockjs
import { API } from '../url/api'
const Mock = require('mockjs')
// const acitvity = 'qb_spring_card_activity'
const gameInfoData = Mock.mock({
  'code': 0,
  'data': {
    'activityEnd': false, // 未结束
    'beginTime': 3000, // 距离下一场开始时间
    'continueTime': 15000, // 游戏持续时间
    'hasJoin': false, // 是否已参与
    'playNumKey': '1', // 当天活动场次
    'prizeList': [
      {
        'prizeNumber': 10,
        'prizeType': 0
      },
      {
        'prizeNumber': 10,
        'prizeType': 1
      }
    ],
    'surplusTime': 1
  },
  'message': '测试内容v1x0'
})
// 输出结果
Mock.mock(API.rainInfo, 'post', gameInfoData)

const prizeInfoData = Mock.mock({
  'code': 0,
  'data': {
    'prizeList': [
      {
        'prizeNumber': 20,
        'prizeType': 'point'
      },
      {
        'prizeNumber': 5,
        'prizeType': 'coupon'
      }
    ]
  },
  'message': {}
})
// 输出结果
Mock.mock(API.prizeInfo, 'post', prizeInfoData)

const gamePrizeData = Mock.mock({
  'code': 0,
  'data': {
    'prizeList': [
      {
        'prizeImg': '积分',
        'prizeNumber': 11,
        'prizeName': '积分'
      },
      {
        'prizeImg': '本金券',
        'prizeNumber': 12,
        'prizeName': '本金券'
      },
      {
        'prizeImg': '本金券',
        'prizeNumber': 10,
        'prizeName': '加息券'
      },
      {
        'prizeImg': '本金券',
        'prizeNumber': 10,
        'prizeName': '会员回馈'
      }
    ]
  },
  'message': '测试内容7oki'
})
// 输出结果
Mock.mock(API.prizeSend, 'post', gamePrizeData)

// const rainInfoData = Mock.mock({
//         'code': 0,
//         'data': {
//             'beginTime': 10000,
//             'continueTime': 10000,
//             'earlyMorningTime': 1,
//             'hasJoin': false,
//             'hintInfo': '测试内容j8xe',
//             'lastScene': false,
//             'playNumKey': 'GIFT_RAIN_JOIN_KEY_18_15',
//             'surplusTime': 1
//         },
//         'message': '测试内容vt7o'
// })
// // 输出结果
// Mock.mock(API.rainInfo, 'post', rainInfoData)
