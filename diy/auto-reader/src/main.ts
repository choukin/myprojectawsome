import './assets/style/reset.css'
import './assets/style/font_1794850_f0sztejcd5m/iconfont.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/axios.tool'
// import 'lib-flexible'
import global,{isApp} from '@/plugins/global'
import FastClick from 'fastclick'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import {getUserInfo} from '@/utils/app'
import { UserModule } from '@/store/modules/user'
import {IUserState} from '@/utils/cookies'
// 全局
import canvasPoster from 'vue-canvas-poster-yufan'
Vue.use(canvasPoster)
 
// let options:Sentry.BrowserOptions = {
//   dsn: 'https://eb4e4339db544f3681f06a81231f5b58@sentry.io/1890532',
//   // logErrors: true  支持控制台打印
//   // integrations: [new Integrations.Vue({ Vue, attachProps: true, logErrors: true })]
// } 
// // 哨兵apk
// Sentry.init(options)
// "randomKey": "i4ne3k",
//  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyOTAiLCJuYmNobXlkcHQwMDMiOiJpNG5lM2siLCJleHAiOjE1ODg5OTAyMTMsImlhdCI6MTU4ODM4NTQxM30.5glAYpTViG1ZlBu4ErSL9dzNUHvWDu-TcQUp5IvBZBmKq9SF49s3RL7h1QPlyCYRhwDrxQBd_4finUejHmPLbg",
Vue.config.productionTip = true
Vue.use(global)
// console.log(process.env)

function main() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app")
}
if (process.env.NODE_ENV === 'development') {
  console.log(isApp+'isApp')
  const VConsole = require('vconsole')
  new VConsole()
}
  
if(isApp) {
  try{
    getUserInfo().then((userInfo:any)=>{
      console.log("userInfo.token ===" + isApp)
      console.log(userInfo?.token)
      console.log(userInfo)
      console.log("userInfo.token ===" + isApp)
      UserModule.setUserInfo(userInfo as IUserState)
      main()
    }).catch(e=>{
      console.error(e)
      main()
    })

  // 
  // UserModule.setUserInfo(userInfo)  
  // UserModule.setUserInfo(userInfo as IUserState)
  } catch(e) {
    main()
    console.error(e)
  }

} else {
  if (process.env.NODE_ENV === 'development') {
    let usertoken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0NDkzIiwibmJjaG15ZHB0MDAzIjoicW8yaXcxIiwiZXhwIjoxNTkxODczMDIxLCJpYXQiOjE1OTEyNjgyMjF9.FI89JqM-JZOKQz7rO4hU4Cl0zLhulfpv6BGzk0AQJa1PzMbhlVkWWgPUlxnl1BfoW4VljaP-IdjCMDDW5UHT9w'
    UserModule.setUserInfo({usertoken})  
  }
  main()
}


// 解决ios 微信返回不刷页面问题
var isPageHide = false
window.addEventListener('pageshow', function() {
  if (isPageHide) {
    window.location.reload()
  }
})
window.addEventListener('pagehide', function() {
  isPageHide = true
})

class Persion {
  name:string = ''
  constructor(name: string){
    this.name = name
  }
}
// // 上边是声明
// function add (arg1: string, arg2: string): string
// function add (arg1: number, arg2: number): number
// function add (p1:Persion,p2:Persion):string
// // 因为我们在下边有具体函数的实现，所以这里并不需要添加 declare 关键字

// // 下边是实现
// function add(arg1: string | number | Persion, arg2: string | number | Persion) {
//   // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
//   if (typeof arg1 === 'string' && typeof arg2 === 'string') {
//     return arg1 + arg2
//   } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
//     return arg1 + arg2
//   } 
//   else if (arg1 instanceof Persion &&  arg2 instanceof Persion ) {
//     return 'p1+p2'
//   }
// }
// let p1 = new Persion('p1')
// let p2 = new Persion('p2')
// debugger
// if( p1 instanceof Persion){
//   console.log('11')
// }

// console.log(add(p1,p2))
