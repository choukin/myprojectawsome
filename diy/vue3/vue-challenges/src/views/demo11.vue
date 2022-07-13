<template>
    <div>
        <h2>优化性能指令</h2>
        <span v-once>使它从不更新{{count}}</span>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const count = ref(0)
setInterval(()=>{
    count.value++
},1000)
</script>

<style scoped>

</style>