import VueRouter from 'vue-router'
import Vue from 'vue'
import demo from '../11/index.vue'
Vue.use(VueRouter)
const routes = [
    {path:'demo1',component:demo,name:'demo1'},
    {
        path: '*',
        redirect: {
          name: 'demo1'
        }
      }
]


const router = new VueRouter({
    mode:'hash',
    routes,
})
export default router