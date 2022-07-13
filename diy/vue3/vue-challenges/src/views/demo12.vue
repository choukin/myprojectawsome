<template>
    <div>
        <h2>切换器</h2>
        <p>State :{{state?'ON':'OFF'}}</p>
        <p @click="toggle">Toggle state</p>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref, toRefs } from 'vue';

function useToggle(flag: Boolean):[state:Ref, toogle:()=>void]{
    const state = ref(flag)
    function toggle(){
        state.value = !state.value
    }
    return [
         state,
         toggle
        ]
}

const [state, toggle] = useToggle(false)
</script>

<style scoped>

</style>