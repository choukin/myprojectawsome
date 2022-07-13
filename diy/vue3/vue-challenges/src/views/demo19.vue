<template>
    <div>
        <h2>切换焦点指令</h2>
        <input type="text" v-focus="state">
        <button @click="state= !state">toggle focus</button>
    </div>
</template>

<script setup lang="ts">
    import {ref, watchEffect} from 'vue'

    const state = ref(false)
    const VFocus = {
        mounted:(el:HTMLInputElement)=>{
            watchEffect(()=>{
                if(state.value){
                    el.focus()
                }else {
                    el.blur()
                }
            })
        }
    }

    // setInterval(()=>{
    //     state.value = !state.value
    // })
</script>

<style scoped>

</style>