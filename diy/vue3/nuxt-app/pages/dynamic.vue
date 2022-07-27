<template>
    <div class="p-4">
        通过 <code>NuxtLayout</code> 使用动态layout
        <!-- <NuxtLayout :name="layout">
            Default slot
            <a-buttton class="border p-1 rounded" @click="layout?layout=null:layout='custom'">切换布局</a-buttton>
            <template #header>Header slot</template>
        </NuxtLayout> -->
        <!-- <NuxtLink to="/">Back to home</NuxtLink> -->

    </div>
</template>

<script setup lang="ts">
// definePageMeta({
//     layout: false,
// })
const layout = 'custom'
</script>

<style scoped>

</style>