<template>
    <div>
        <h2>节流点击指令</h2>
        <button v-debounce-click:200="onClick">
            click on it many times quickly
        </button>
    </div>
</template>

<script setup lang="ts">
import { VNode, DirectiveBinding } from 'vue';
/**
 * 实现以下自定义指令
 * 确保一定时间内当快速点击按钮多次时只出发一次点击事件
 * 需要支持节流延迟时间选项，用法 `v-debounce-click:ms`
 */
const VDebounceClick = {
    mounted(el:HTMLElement, binding: DirectiveBinding, vnode: VNode,prevVnode: VNode){
        const debounce = (fn:Function, time:number=200, ...args: undefined[])=>{
            let _timer = 0
            return (...args: any) =>{
                if(_timer) clearTimeout(_timer)
                _timer = setTimeout(()=>{
                    fn.apply(this, ...args)
                },time)
            }
        }
        const {arg,value: callback}  = binding;
        el.addEventListener('click', debounce(callback, Number(arg)))

    }
}
function onClick(){
    console.log("Only triggerd once when clicked many times quicky");
}
</script>

<style scoped>

</style>