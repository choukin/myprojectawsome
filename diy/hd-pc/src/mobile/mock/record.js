// 引入mockjs
import { API } from '../url/api'
const Mock = require('mockjs')
const produceNewsData = Mock.mock({
  'data': {
    'totalPage': 2,
    'prizeList|10-30': [
      {
        'prizeName': '10元本金券',
        'rewardTime': '2018-07-09  22:22:22'
      }
    ]
  },
  'message': '\u6309\u94ae\u72b6\u6001(1,\u5373\u5c06\u5f00\u59cb,2.\u7acb\u5373\u79d2\u6740,3\u5df2\u79d2\u67404.\u5df2\u62a2\u5149,50\u7a7a\u7c89\u5e01\u62ff,6\u6211\u8981\u62ff,7\u67e5\u770b\u8fdb\u5ea6,8\u9886\u53d6,9\u5df2\u9886\u53d6)',
  'code': '000000'
})
// 输出结果
Mock.mock(API.record, 'post', produceNewsData)
// console.log(JSON.stringify(produceNewsData, null, 4))
