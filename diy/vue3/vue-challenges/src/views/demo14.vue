<template>
    <div>
            <h2>计数器</h2>
            {{count}}
            <button @click="inc">+</button>
            <button @click="dec">-</button>
            <button @click="reset">重置</button>
    </div>
</template>

<script setup lang="ts">
import {ref, toRefs} from 'vue'
interface UseConterOptions{
    min?:number,
    max?:number
}

function useCounter(initialValue = 0, opitons:UseConterOptions={}){
    const count = ref(initialValue)
    function inc(){
        const next = count.value+1
        if(opitons.max&& next> opitons.max){
            count.value = opitons.max
        } else {
            count.value++
        }
       
    }
    function dec(){
        const next = count.value-1
        if((opitons.min||opitons.min===0)&&next< opitons?.min){
            count.value = opitons.min
        } else{
        count.value--
        }
    }

    function reset(){
        count.value = initialValue
    }

    return {
        count: count,
        inc,
        dec,
        reset

    }

}

const {count, inc, dec, reset} = useCounter(0,{min:0,max:20})
</script>

<style scoped>

</style>