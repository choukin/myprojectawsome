<template>
    <div>
        <h2>自定义Ref</h2>
        <input type="text" v-model="text">
    </div>
</template>

<script setup lang="ts">
import { customRef, watch } from "vue";

/**
 * 防抖Ref
 */
function useDebounceRef(value, delay=2000){
    let timer = 0
 return customRef((track,trigger)=>{
    return {
    set:(newValue)=>{
        timer && clearTimeout(timer)
        timer = setTimeout(()=>{
            value = newValue
            trigger()
        },delay)
        
    },
    get:()=>{
        track()
        return value
    }
    }
 })
}

const text = useDebounceRef("hello")

watch(text,(value)=>{
    console.log('watchtext: ',value);
    
})
</script>

<style scoped>

</style>