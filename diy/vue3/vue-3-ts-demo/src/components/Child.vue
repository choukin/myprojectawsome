<template>
  <div>child</div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
// 操作路由
const route = useRoute();
const router = useRouter();
router.beforeEach((to, from) => {
  console.log("to", to);
});
// 离开前判断拦截
onBeforeRouteLeave((to, from) => {
  console.log("onBeforeRouteLeave", to, from);
});
//组件被复用时执行
onBeforeRouteUpdate((to, from) => {
  console.log("onBeforeRouteUpdate", to, from);
});

watch(route, (to, from) => {
  console.log("watch", to, from);
});
watch(
  () => route.query.id,
  () => {
    console.log("query,change");
  }
);

// watchEffect 监听route里参数的变化
</script>

<style scoped></style>
