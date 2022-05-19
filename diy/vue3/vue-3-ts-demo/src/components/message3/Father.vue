<!-- v-model/emits 传递 -->
<template>
  <div>
    <Child
      title="用户信息"
      ref="childinit"
      :index="1"
      :uid="userInfo.id"
      v-model:user-name="userInfo.name"
      v-model:user-age="userInfo.age"
      class="child"
      keys="aaa"
      data-hash="testhash"
      @update-age="updateAge"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, unref } from "vue";
import Child from "./Child.vue";
interface Member {
  id: number;
  name: string;
  age: number;
}

const userInfo: Member = reactive({ id: 1, name: "jack", age: 2 });

const updateAge = (age: number): void => {
  userInfo.age = age;
};

const childinit = ref<typeof Child | null>(null);
onMounted(() => {
  setTimeout(() => {
    childinit.value.isShowDialog = false;
    childinit.value.show();
  }, 4000);
});
</script>

<style scoped></style>
