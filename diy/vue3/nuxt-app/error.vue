<template>
  <a-result status="warning" :title="error.message">
    <template #extra>
      <a-button key="console" type="primary" @click="handleError">Go Home</a-button>
    </template>
  </a-result>
  </template>

<script setup lang="ts">
const props = defineProps({
    error:Object
})
console.log(props.error);

const handleError = ()=> clearError({redirect:'/'})
</script>

<style scoped>

</style>