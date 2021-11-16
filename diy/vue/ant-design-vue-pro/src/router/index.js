import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import {findLast} from 'loadsh'
import {check, isLogin} from '../utils/auth'
import "nprogress/nprogress.css"
import {notification} from 'ant-design-vue'
// import Home from "../views/Home.vue";
// import RenderRouterView from "../components/RenderRouterView.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    name: "user",
    hideInMenu:true,
    // component:()=>import(/*webpackChunkNume:"routerview" */"../components/RenderRouterView.vue"),
    // component:{render:h=>h("router-view")},
    component: () =>
      import(/*webpackChunkName: "layout"*/ "@/layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () => 
          import(/*webpackChunkName:"user" */ "../views/user/Login.vue"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () => 
          import(/*webpackChunkName:"user" */ "../views/user/Register.vue"),
      },
    ],
  },
  {
    path: "/",
    meta:{authority:['user','admin']},
    component: () => 
      import(/* webpackChunkName: "layout" */ "@/layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "dashboard/anaysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        hideChildrenInMenu:false,
        meta:{icon:"dashboard",title:"仪表盘"},
        component: {render: h => h("router-view")},
        children: [
          {
            path: "/dashboard/anaysis",
            name: "anaysis",
            meta:{icon:"dashboard",title:"仪表盘"},
            component: () =>
              import(/*webpackChunkName: "dashboard" */ "@/views/Dashboard/Anaysis.vue")
          }
        ]
      },  //form
      {
        path: "/form",
        name: "form",
        meta:{icon:"form", title:"表单", authority:'admin'},
        component: { render: h => h("router-view")},
        children: [
          {
            path: "/form/basic-form",
            name:"basicform",
            meta:{title:"基础表单"},
            component: () => 
              import(/* webpackChunkName: "form"*/ "@/views/Forms/BasicForm.vue")
          },
          {
            path: "/form/step-form",
            name:"stepform",
            meta:{title:"分步表单"},
            hideChildrenInMenu:true,
            component: () => 
              import(/* webpackChunkName: "form"*/ "@/views/Forms/StepForm/index.vue"),
              children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () => 
                  import(/* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step1.vue"),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () => 
                  import(/* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step2.vue")
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () => 
                  import(/* webpackChunkName: "form" */ "@/views/Forms/StepForm/Step3.vue")
              },          
            ]  
          }      
        ]
      }
    ]
  },

  {
    path: "/403", 
    name: "403",
    hideInMenu:true,
    component:() => import(/*webpackChunkName: "404"*/ "@/views/403.vue")
  },
  {
    path: "*", 
    name: "404",
    hideInMenu:true,
    component:() => import(/*webpackChunkName: "404"*/ "@/views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  if(to.from !== from.path) {
  NProgress.start()
  }

 const record = findLast(to.matched, record => record.meta.authority)
 if(record && !check(record.meta.authority)){
   if(!isLogin() && to.path !== '/user/login'){
     next({
       path:'/user/login'
     })
   } else if (to.path !== '/403') {
     notification.error({
       message: '403',
       description: '暂无权限，请联系管理员'
     });
     next({
       path:"/403"
     })
   }
 }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
export default router;
