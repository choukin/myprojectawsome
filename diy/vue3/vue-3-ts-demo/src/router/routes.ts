import { RouteRecordRaw } from "vue-router";

import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    alias: "/index", // 路由别名
    component: HomeView,
    meta: {
      title: "首页",
      icon: "admin",
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/demo1",
    name: "demo1",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/demo",
    name: "demo",
    component: () =>
      import(/* webpackChunkName: "demo" */ "../views/DemoView.vue"),
    children: [
      {
        path: "about1",
        name: "about1",
        beforeEnter: (to, from) => {
          console.log("beforeEnter", to, from);
        },
        component: () =>
          import(
            /* webpackChunkName: "about1" */ "../views/DemoChildrenView.vue"
          ),
      },
    ],
  },
  {
    path: "",
    // redirect: {
    //   name: "home",
    //   query: {
    //     from: "redirect",
    //   },
    // },
    redirect: () => {
      const GROUP_ID: number = Math.random() * 10;
      switch (GROUP_ID) {
        case 1:
          return "/dashboard";
        case 2:
          return "/home";
        default:
          return "/home";
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import(/* webpackChunkName:"404" */ "@views/404.vue"),
  },
];

export default routes;
