<template>
  <div>
    {{ msg }}
    <Father />
  </div>
</template>

<script setup lang="ts">
import Father from "./Father.vue";
import { provide, ref } from "vue";
const msg = ref<string>("helloworld");
provide("msg", msg);
setTimeout(() => {
  msg.value = "hello provide";
}, 2000);
</script>

<style lang="scss" scoped></style>
