# autoreader2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### 页面链接
我的链接： http://test.h5.youngbazaar.cn/index.html#/mine     
排行榜链接： http://test.h5.youngbazaar.cn/index.html#/ranking     
邀请链接： http://test.h5.youngbazaar.cn/index.html#/invite     
任务列表 ：  http://test.h5.youngbazaar.cn/index.html#/tasklist     
任务详情 http://test.h5.youngbazaar.cn/index.html#/taskdetail?id=4
常见问题： http://test.h5.youngbazaar.cn/index.html#/qa
协议 http://test.h5.youngbazaar.cn/index.html#/protocol?type=1
邀请活动 http://test.h5.youngbazaar.cn/index.html#/protocol?type=5
返回重新调整 http://test.h5.youngbazaar.cn/evil.html
签到页面 http://test.h5.youngbazaar.cn/index.html?router=attendance
web 签到
http://test.api.youngbazaar.cn/gunsApi/redirectIndexApi/redirect?router=attendance
任务赚测试环境H5入口：
http://test.api.youngbazaar.cn/gunsApi/redirectIndexApi/redirect
任务赚测试环境后台入口，接口域名：
http://test.api.youngbazaar.cn

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
[](https://github.com/adcentury/vue-weui)
[vant](https://youzan.github.io/vant/#/zh-CN/grid)
[apidoc](http://114.116.222.100/)

<!-- nbad123456
admin -->

[travis](https://travis-ci.org/)
[首页](http://nbad.molin.work/)
[微信支付api](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_4)
[唤起qq](http://shang.qq.com/v3/widget.html)
检测webpack配置
vue inspect > output.js
https://github.com/Armour/vue-typescript-admin-template


加密
1 AES128加密字符串生成字节数组
2 base64处理字节数组返回结果字符串
解密
1base64解密密文得到字节数组
2将字节数组进行解密获取原始明文

统一UTF8编码
密钥：password
加密前：{"name":"test","id":123456,"time":1576658737}
加密后：X54dE9CQaSW0xVzNbDEy/XokpPp6sLhRVCcUaiz4VQqQ60dKkILPPmBQp3Mxuhb3
你先试下这条数据   代码写好之后看能不能根据加密后的数据解析出加密前的数据

TODO:

- [ ]  [设置js优化](https://github.com/neutrinojs/webpack-chain)
- [X]  [添加七牛自动上传](https://www.npmjs.com/package/qiniu-upload-plugin)
- [doc](https://docs.qq.com/sheet/DTmlQV3NYZWR6a3JH?c=M72A0A0)

- [vue 2 + typescript 3.7 + eslint 6.0](https://www.jianshu.com/p/39261c02c6db)


- 1 /gunsApi/nbadApi/info 接口增加返回字段，返回字段内容仅包含全部地址，不包含参数。
beforeMonitorUrlPre（第一次检测链接前缀）
例：http://api.molin.work/gunsApi/moniApi/moni
monitorUrlPre（第二次检测链接前缀）
例：http://api.molin.work/gunsApi/moniApi/beforeMoni
- 2 接口变动：
/gunsApi/moniAuthApi/beforeMoniAuth
/gunsApi/moniAuthApi/moniAuth
/gunsApi/moniApi/beforeMoni
/gunsApi/moniApi/moni
四个接口均添加参数 (String)em,表示加密后的字符串,去掉之前oid以及channel参数
- 3 加密规则
带加密字符串：
{"channel":"WX","oid":1234,"time":1576735163}
偏移量：
nbk7kycoadocyk7k
密钥：
nbk7kycoadocyk7k
加密后:
g/sVWXaByBgvi8uXIuDAb9gXYLatDkb4wWjtfXNOUk4X4r0oIK+uGxNhHVWnwTX2

- 4 偏移量/密钥获取方式：
在auth接口中拿到返回参数randomKey的值
密钥=”nb”+randomKey的反转字符串+”ad”+randomKey
其中 nb   ad两个为固定的字符串
例：
randomKey = ocyk7k
密钥 = nb+k7kyco+ad+ocyk7k = nbk7kycoadocyk7k

- 5 注意
加密之后作为参数传递会有特殊字符串+，转义时会变成空格导致出现解密失败。
解决方案可以参考https://blog.csdn.net/shiyong1949/article/details/79654995


致富宝页面域名 http://wechat06.nblh.libcloud.cn

正式环境H5入口
http://nbchm.yuehaixinghui.club/gunsApi/redirectIndexApi/redirect  
正式环境后台入口：
http://manage.yuehaixinghui.club/login
正式环境api接口：
http://nbchm.yuehaixinghui.club

测试环境H5入口：
http://test.api.yuehaixinghui.club/gunsApi/redirectIndexApi/redirect
测试环境后台入口：
http://test.api.yuehaixinghui.club
正式环境api接口：
http://test.api.yuehaixinghui.club


任务赚测试环境H5入口：
http://test.api.youngbazaar.cn/gunsApi/redirectIndexApi/redirect
任务赚测试环境后台入口：
http://test.api.youngbazaar.cn
正式环境api接口：
http://test.api.youngbazaar.cn

# qq 群推广
https://qun.qq.com/join.html

# 自己的平台
[UI](https://lanhuapp.com/url/xq5gY-SAaTH)
