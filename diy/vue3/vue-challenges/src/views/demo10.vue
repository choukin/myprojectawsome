<template>
    <div>
        <h2>依赖注入</h2>
        {{count1}}
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

    const count1 = inject('count')
</script>

<style scoped>

</style>