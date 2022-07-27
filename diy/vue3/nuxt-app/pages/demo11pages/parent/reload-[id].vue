<template>
    <div>
        子页面重新加载{{reloads}}
    </div>
</template>

<script setup lang="ts">
    const reloads = useState('reload',()=>0)
    onMounted(()=>{reloads.value++})
</script>

<style scoped>

</style>