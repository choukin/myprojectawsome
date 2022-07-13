<template>
    <div>
        <h2>Effect 作用域API</h2>
        {{doubled}}
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, watchEffect, effectScope } from "vue";

const counter = ref(1)
const doubled = computed(()=>counter.value*2)

// 使用effectScope API 使这些Effect效果在触发一次后停止
const scoped = effectScope()


scoped.run(()=>{
    console.log('effectscope');
    watch(doubled,()=>console.log('doubled: ',doubled.value))
    watchEffect(()=> console.log("count:", doubled.value))
})

scoped.stop()
counter.value = 2

setTimeout(()=>{
    
    counter.value = 4
})
</script>

<style scoped>

</style>