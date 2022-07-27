<template>
    <div>
        子页面重新加载{{reloads}}
    </div>
</template>

<script setup lang="ts">
    const reloads = useState('static',()=>0)
    onMounted(()=>reloads.value++)
    definePageMeta({
        key:'static'
    })
</script>

<style scoped>

</style>