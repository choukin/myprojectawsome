<template>
    <div>
        Forbidden
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  // This is an example of inline middleware
  middleware: () => {
    console.log('Strictly forbidden.')
    return false
  }
})
// definePageMeta({
//     meddleware:()=>{
//         console.log('严格禁用');
//         return false
//     }
// })
</script>

<style scoped>

</style>