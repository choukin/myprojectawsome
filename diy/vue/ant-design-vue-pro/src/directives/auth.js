import {check} from '@/utils/auth'
/**
 * 不适合动态权限
 * @param {*} Vue 
 * @param {*} options 
 */
function install(Vue, options={}){
    Vue.directive(options.name||'auth',{
        inserted(el, binding) {
            if(!check(binding.value)) {
               el.parentNode && el.parentNode.removeChild(el)
            }
        }
    })

}

export default {install}