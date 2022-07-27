<template>
    <div>
        <pre>{{mountains}}</pre>
    </div>
</template>

<script setup lang="ts">
const {data:mountains} = await useFetch('https://api.nuxtjs.dev/mountains/mount-everest')
</script>

<style scoped>

</style>