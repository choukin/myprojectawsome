<template>
    <div>
        <pre>/api/mountain</pre>:{{mountain}}
    </div>
</template>

<script setup lang="ts">
const {data: mountain} = await useFetch('/api/mountain')
</script>

<style scoped>

</style>