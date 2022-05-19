import {defineNuxtPlugin} from "#app"
import {Button} from "vant"
// 目前在 nuxt 中无法按需引入样式，因此采用手动引入的方式
import 'vant/lib/index.css';
export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.vueApp.use(Button)
})