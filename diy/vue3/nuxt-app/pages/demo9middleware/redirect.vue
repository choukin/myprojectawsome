<template>
    <div>
        you should never see this page
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        middleware:'redirect-me'
    })
</script>

<style scoped>

</style>