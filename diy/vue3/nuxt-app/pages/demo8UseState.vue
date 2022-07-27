<template>
    <a-card>
        <div>counter:{{counter}}</div>
        <div>Same Counter{{sameCounter}}</div>
        <div>
            <a-button class="font-mono" @click="counter++">+</a-button>
            <a-button class="font-mono" @click="counter--">-</a-button>

        </div>
    </a-card>
</template>

<script setup lang="ts">
definePageMeta({
    layout:'custom'
})
const counter = useState('counter',()=>Math.round(Math.random()*1000))
const sameCounter = useState('counter')
</script>

<style scoped>

</style>