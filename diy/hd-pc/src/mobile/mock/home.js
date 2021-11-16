// 引入mockjs
import api from '../url/api'
const Mock = require('mockjs')
const produceNewsData = Mock.mock({
  'data': {
    'state': 2,
    'seckillList': [],
    'leftTime': 15029100,
    'goodList|10-30': [
      {
        'description': '\u597d\u4f7f',
        'storeLeft': 11,
        'startTime': '9\u70b9',
        'originPrice': 10000000,
        'goodType': 1,
        'goodsImage': 'http://pic27.nipic.com/20130313/9252150_092049419327_2.jpg',
        'goodName': '10%\u52a0\u606f\u5238',
        'needPrice': 1,
        'goodsId': 11,
        'state': 1
      }
    ]
  },
  'message': '\u6309\u94ae\u72b6\u6001(1,\u5373\u5c06\u5f00\u59cb,2.\u7acb\u5373\u79d2\u6740,3\u5df2\u79d2\u67404.\u5df2\u62a2\u5149,50\u7a7a\u7c89\u5e01\u62ff,6\u6211\u8981\u62ff,7\u67e5\u770b\u8fdb\u5ea6,8\u9886\u53d6,9\u5df2\u9886\u53d6)',
  'code': '000000'
})
// 输出结果
console.log(JSON.stringify(produceNewsData, null, 4))
Mock.mock(api.list, 'post', produceNewsData)
