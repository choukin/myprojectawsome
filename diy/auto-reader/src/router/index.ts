import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { isWeChat, isMobile, isAndroid, isIOS } from '../plugins/global'
import {setTitle} from '@/utils/app.ts'
Vue.use(VueRouter)
NProgress.configure({ showSpinner: false })
const routes = [
  {
    path: '/contact',
    name: 'contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Contact" */ '../views/wechat/Contact.vue')
  },
  {
    path: '/',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "index" */ '../views/wechat/Index.vue')
  },
  {
    // 系统升级
    path: '/maintenace',
    name: 'maintenace',
    component: () => import(/* webpackChunkName: "read" */ '../views/wechat/Maintenance.vue')
  },
  {
    path: '/read',
    name: 'read',
    component: () => import(/* webpackChunkName: "read" */ '../views/wechat/Read.vue')
  },
  {
    path: '/wechatTips',
    name: 'wechatTips',
    component: () => import(/* webpackChunkName: "wechatTips" */ '../views/wechat/WechatTips.vue')
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    meta:{
      title: '',
      inapp: true
    },
    component: () => import(/* webpackChunkName: "withdraw" */ '../views/wechat/Withdraw.vue')
  },
  {
    path: '/recording',
    name: 'recording',
    component: () => import(/* webpackChunkName: "withdraw" */ '../views/wechat/Recording.vue')
  },
  {
    path: '/userCenter',
    name: 'userCenter',
    component: () => import(/* webpackChunkName: "withdraw" */ '../views/wechat/UserCenter.vue')
  },
  {
    path: '/friends',
    name: 'friends',
    component: () => import(/* webpackChunkName: "withdraw" */ '../views/wechat/Friends.vue')
  },
  {
    path: '/downloadold',
    name: 'downloadold',
    component: () => import(/* webpackChunkName: "download" */ '../views/wechat/Download.vue')
  },
  {
    path: '/download',
    name: 'download',
    meta:{
      title: '',
      inapp: true
    },
    component: () => import(/* webpackChunkName: "download" */ '../views/wechat/newDownload.vue')
  },
  {
    path: '/qa',
    name: 'qa',
    meta:{
      title: '常见问题',
      inapp: true
    },
    component: () => import(/* webpackChunkName: "qa" */ '../views/wechat/Q&A.vue')
  },
  {
    path: '/share',
    name: 'share',
    component: () => import(/* webpackChunkName: "share" */ '../views/wechat/Share.vue')
  },  
  {
    path: '/bindUser',
    name: 'bindUser',
    component: () => import(/* webpackChunkName: "download" */ '../views/wechat/BindUser.vue')
  },
  {
    path: '/ranking',
    name: 'ranking',
    meta:{
      title: '龙虎榜',
      inapp: true
    },
    component: () => import(/* webpackChunkName: "ranking" */ '../views/app/ranking/index.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    meta:{
      title: '我的',
      inapp: true
    },    
    component: () => import(/* webpackChunkName: "mine" */ '../views/app/mine/index.vue')
  }, 
  {
    path: '/invite',
    name: 'invite',
    meta:{
      title: '邀请',
      inapp: true
    },    
    component: () => import(/* webpackChunkName: "mine" */ '../views/app/invite/index.vue')
  },   
  {
    path: '/today',
    name: 'today',
    meta:{
      title: '今日收益',
      inapp: true
    },    
    component: () => import(/* webpackChunkName: "todayEarnings" */ '../views/app/todayEarnings/index.vue')
  }, 
  {
    path: '/apprentice',
    name: 'apprentice',
    meta:{
      title: '我的徒弟',
      inapp: true
    },    
    component: () => import(/* webpackChunkName: "apprentice" */ '../views/app/apprentice/index.vue')
  }, 
  {
    path: '/appFriends',
    name: 'appFriends',
    meta:{
      title: '昨日贡献',
      inapp: true
    },    
    component: () => import(/* webpackChunkName: "friends" */ '../views/app/friends/index.vue')
  },
  {
    path: '/apprecording',
    name: 'apprecording',
    meta:{
      title: '提现记录',
      inapp: true
    },    
    component: () => import(/* webpackChunkName: "apprecording" */ '../views/app/recording/index.vue')
  }, 
  {
    path: '/apphistory',
    name: 'apphistory',
    meta:{
      title: '累计收益',
      inapp: true
    },    
    component: () => import(/* webpackChunkName: "history-earning" */ '../views/app/history-earning/index.vue')
  },  
  {
    path: '/tasklist',
    name: 'tasklist',
    meta:{
      title: '高拥任务列表',
      inapp: true
    },    
    component: () => import(/* webpackChunkName: "tasklist" */ '../views/app/task/tasklist/index.vue')
  }, 
  {
    path: '/taskdetail',
    name: 'taskdetail',
    meta:{
      title: '任务详情',
      inapp: true
    },    
    component: () => import(/* webpackChunkName: "taskdetail" */ '../views/app/task/taskdetail/index.vue')
  }, 
  {
    path: '/protocol',
    name: 'protocol',
    meta:{
      title: '',
      inapp: true
    },    
    component: () => import(/* webpackChunkName: "taskdetail" */ '../views/app/protocol/index.vue')
  },  
  {
    path:'/attendance',
    name:'attendance',
    meta:{
      title:'签到',
      inapp: true
    },
    component:()=>import(/* webpackChunkName: "attendance" */ '../views/app/attendance/index.vue')
  },
  // {
  //   path:'/poster',
  //   name:'poster',
  //   meta:{
  //     title:'海报',
  //     inapp: true
  //   },
  //   component:()=>import(/* webpackChunkName: "poster" */ '../views/app/poster/index.vue')
  // },
  {
    path:'/pointexchange',
    name:'pointexchange',
    meta:{
      title:'积分兑换',
      inapp: true
    },
    component:()=>import(/* webpackChunkName: "pointexchange" */ '../views/app/pointexchange/index.vue')
  },
  {
    path: '*',
    redirect: {
      name: 'index'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to: Route, _: Route, next: any) => {
  const title = to.meta?.title || ''
  title && setTitle(title)
  // Start progress bar
  NProgress.start()
  if (process.env.NODE_ENV === 'development') {
    next()
  } else {
    if(to.meta?.inapp){
      next()
    } else{
      // 微信客户端并且是ios或者andorid 放行
      if (isWeChat && (isIOS || isAndroid)) {
        next()
      } else {
        // 下载页面或者提示页面放行 to.path === '/wechatTips' || 
        if (to.path === '/share'  || to.path === '/download' || to.path == '/maintenace') {
          next()
        } else {
          // 非微信环境 Android 跳到到下载 ios到提示

          // let nextpath = '/download'
          // if (isIOS) {
          //   nextpath = '/wechatTips'
          // }
          // 非微信环境其他页面跳转到 share
          next({ path: '/download', replace: true })
        }
      }
      NProgress.done()
      return false
    }
  }
  // Determine whether the user has logged in
  // if (!isWeChat && !isMobile && process.env.NODE_ENV !== 'development') {
  //   // If is logged in, redirect to the home page
  //   if (to.path !== '/wechatTips' && to.path !== '/download') {
  //     let nextpath = '/download'
  //     if (/iphone/i.test(window.navigator.userAgent)) {
  //       nextpath = '/wechatTips'
  //     }
  //     next({ path: nextpath, replace: true })
  //     NProgress.done()
  //     return false
  //   }
  // }
})

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done()

  // set page title
  // document.title = to.meta.title
})
export default router
