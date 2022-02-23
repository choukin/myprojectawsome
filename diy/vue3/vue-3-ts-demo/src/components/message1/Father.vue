<!-- props/emits 传递 -->
<template>
  <div>
    <Child
      title="用户信息"
      :index="1"
      :uid="userInfo.id"
      :user-name="userInfo.name"
      :user-age="userInfo.age"
      class="child"
      keys="aaa"
      data-hash="testhash"
      @update-age="updateAge"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
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
</script>

<style scoped></style>
