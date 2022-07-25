import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
/**
 * 引入Ant组件库
 */
export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.vueApp.use(Antd)
})