<script setup lang="ts">
import { ref } from "vue"
const theme = ref("red")

const colors = ["blue", "yellow", "red", "green"]

setInterval(() => {
  theme.value = colors[Math.floor(Math.random() * 4)]
}, 1000)

</script>

<template>
  <p>hello</p>
</template>

<style scoped>
/* 修改以下代码绑定动态颜色 */
p {
    height: 100vh;
    width: 100vw;
    background-color: v-bind(theme);
  color: v-bind(theme)
}
</style>

