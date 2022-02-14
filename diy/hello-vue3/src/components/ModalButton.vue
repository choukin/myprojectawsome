<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>
<template>
    <button @click="modalOpen=true">
</template>