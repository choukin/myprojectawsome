import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "cur cur0",
  linkExactActiveClass: "cur1",
  routes,
});

// 导航守卫
// 全局前置守卫 路由渲染前拦截
router.beforeEach((to, from) => {
  // if (to.meta && !to.meta.isNoLogin) {
  //   return "/login";
  // }
  // // 没有匹配任何路由
  // if (to.matched.length === 0) {
  //   return "/";
  // }
  const title: string = to.meta.title as string;
  document.title = title || "title";
});

// beforeResolve 导航被确认前，同时组件内守卫和异步组件被解析后

// router.beforeResolve(async (to) => {
//   // 如果路由配置了必须调用相机全新
//   if (to.meta.requiresCamera) {
//     try {
//       //正常流程允许使用照相机
//       await askForCameraPermission();
//     } catch (error) {
//       if (error instanceof NotAllowedErrror) {
//         // 处理错误 取消导航
//         return false;
//       } else {
//         // 抛出错误
//         throw error;
//       }
//     }
//   }
// });

// afterEach 全局后置守卫， 上报PV

router.afterEach((to, from) => {});

export default router;
