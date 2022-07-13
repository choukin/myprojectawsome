<template>
    <div>
        <h2>浅层ref</h2>
        {{state.count}}
    </div>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const state = shallowRef({count:1})

watch(state,()=>{
    console.log("state.count updated");
    
},{
    deep: true,
})

state.value = {count:2}
</script>

<style scoped>

</style>