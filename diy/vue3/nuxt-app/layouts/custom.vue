<template>
    <div>
        <strong>Custom Layout</strong>
        Header slot:
        <slot name="header">
            Default slot content for <code>Custom</code> layout
         </slot>   
         <slot>
            <NuxtPage/>
           </slot> 
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>