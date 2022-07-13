<template>
    <div>
        <h2>简易版v-model</h2>
        {{value}}
        <input type="text" v-oh-model="value">
    </div>
</template>

<script setup lang="ts">
import { customRef, ref } from "vue";

/**
 * 
 */
const VOhModel = {
    mounted(el,binding){
        const {value:v} = binding
        el.value = v
        el.addEventListener('input',e=>{
            value.value = el.value
        })
    }
}

const value = ref("hello vue.js")
</script>

<style scoped>

</style>