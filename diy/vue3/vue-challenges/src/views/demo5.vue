<template>
    <div>
        <input type="text" v-model="value">
        <CustomInput v-model.capitalize="value"/>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import CustomInput from '../components/CustomInput.vue'
    const value = ref("")
</script>

<style scoped>

</style>