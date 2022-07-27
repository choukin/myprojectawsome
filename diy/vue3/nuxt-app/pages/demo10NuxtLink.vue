<template>
    <div>
        <NuxtLink to="/">首页</NuxtLink> <br>
        <NuxtLink v-slot="{navigate}" to="/" custom>
            <a-button @click="navigate">自定义跳转</a-button>
        </NuxtLink><br>
        <NuxtLink to="https://nuxtjs.org">外部链接</NuxtLink><br>
 

        <NuxtLink to="https://www.baidu.com" target="_blank"> 通过 blank 方式打开</NuxtLink><br>

        <NuxtLink to="https://www.baidu.com" target="_blank" rel="noopener">新窗口打开 自定义 rel</NuxtLink><br>
        <NuxtLink to="https://www.baidu.com" no-rel>不带rel</NuxtLink><br>
        <MyNuxtLink to="https://nuxtjs.org"> 自定义link组件</MyNuxtLink> <br>
        <MyNuxtLink to="/">激活方式打开首页</MyNuxtLink><br>
        <NuxtLink>没有link和to</NuxtLink><br>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>