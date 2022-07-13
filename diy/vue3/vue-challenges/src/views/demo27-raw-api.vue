<template>
    <div>
        <h2>原始值APIs</h2>
        {{reactiveState.count}}
        {{state.count}}
    </div>
</template>

<script setup lang="ts">
import { reactive, isReactive, toRaw, markRaw } from 'vue';
const state = {count:1}
const reactiveState = reactive(state)
reactiveState.count = 2
// true

console.log(toRaw(reactiveState)===state)


// false
const info = markRaw({count:1})

const reactiveInfo = reactive(info)
console.log(isReactive(toRaw(reactiveInfo)));

</script>

<style scoped>

</style>