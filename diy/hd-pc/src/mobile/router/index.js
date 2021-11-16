import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import { toLogin, setTitle } from '@/mobile/utils/app'
Vue.use(Router)

const router = new Router({
  routes: [
    // 默认重定向
    {
      path: '',
      redirect: '/scratch-off'
    },
    // TODO: big-turntable 大转盘
    {
      path: '/scratch-off',
      name: 'scratch-off',
      meta: {
        title: ''
      },
      component: () => import('../views/scratch-off/index.vue')
    },
    {
      path: '/redenveloperain',
      name: 'redenveloperain',
      meta: {
        title: '红包雨'
      },
      component: () => import('../views/redenveloperain/index.vue')
    },
    {
      path: '/lottery',
      name: 'lottery',
      meta: {
        title: '全民大转盘'
      },
      component: () => import('../views/lottery/index.vue')
    },
    {
      path: '/prizeList',
      name: 'prizeList',
      meta: {
        title: '奖励列表'
      },
      component: () => import('../views/myprize/prizeList.vue')
    },
    {
      path: '/myprize',
      name: 'myprize',
      meta: {
        title: '奖励兑换'
      },
      component: () => import('../views/myprize/index.vue')
    }
    // {
    //   path: '/ranking',
    //   name: 'Ranking',
    //   meta: {
    //     title: '你最“粽”要'
    //   },
    //   component: () => import('../views/duanwu/yesranking/index.vue')
    // },
    // {
    //   path: '/rewardList',
    //   name: 'RewardList',
    //   meta: {
    //     title: '你最“粽”要'
    //   },
    //   component: () => import('../views/duanwu/rewardList/index.vue')
    // }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
    // setTitle(to.meta.title)
  }
  // 判断是否登陆 如果没有登陆跳转到登陆页面
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const userInfo = store.state.userInfo
    if (!userInfo.token) {
      // toLogin()
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
