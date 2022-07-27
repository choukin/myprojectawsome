<template>
    <div>
        <h1 class="text-xl opacity-50">
            当前时间
        </h1>
        <p class="text-4xl">{{date}}</p>
        <div class="mt-4"></div>
        <label for="locale-chooser">选择一个不同的locale</label>
        <select v-model="locale" id="locale-chooser" class="m-auto w-50 border n-border-base rounded p-1">
            <option v-for="l of locales" :key="l" :value="l">{{l}}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
const locales = useLocales()
const locale = useLocale()
const date = useLocalDate(new Date())
</script>

<style scoped>

</style>