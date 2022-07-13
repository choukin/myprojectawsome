<template>
    <div>
        <h2>until</h2>
    </div>
</template>

<script setup lang="ts">
import {ref, Ref} from 'vue'
const count = ref(0)


function until(initial:Ref<number>){
    function toBe(value:number){
        return new Promise((resolve,reject)=>{
            initial.value = value
            resolve(value)
        })
    }
    return {
        toBe
    }
}

async function increase(){
    count.value = 0
    setInterval(()=>{
        count.value++
    }, 1000)
    await until(count).toBe(3)
    console.log(count.value===3);
    
}
increase()
</script>

<style scoped>

</style>