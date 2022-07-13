<template>
    <div>
        <h3>可写的计算属性</h3>
        {{count}}
        {{plusOne}}
        <button @click="plusOnePLus">plusOne</button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const count = ref(1)
const plusOne= computed({
    get:()=> count.value +1,
    set:(value:number) => value
})


plusOne.value = 5

function plusOnePLus(){
    debugger
    count.value = 5;
}
</script>

<style scoped>

</style>