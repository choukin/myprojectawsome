<template>
  <ul>
    <li
      class="item"
      :class="{ cur: index === curIndex }"
      v-for="(item, index) in 5"
      :key="index"
      @click="curIndex = index"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
const curIndex = ref<number>(0);
</script>

<style scoped>
.cur {
  color: red;
  text-align: center;
}
</style>
