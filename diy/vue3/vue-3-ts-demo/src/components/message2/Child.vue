<template>
  <div v-bind="attrs">
    <div>title:{{ title }}</div>
    <div>index:{{ index }}</div>
    <div>uid:{{ uid }}</div>
    <div>userName:{{ userName }}</div>
    <div>userAge:{{ userAge }}</div>
  </div>
  <div v-bind="attrs"></div>
</template>
<script lang="ts"></script>
<script setup lang="ts">
import {
  useAttrs,
  defineProps,
  defineEmits,
  ref,
  watch,
  defineExpose,
} from "vue";
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "默认标题",
  },
  index: Number,
  userAge: Number,
  uid: [Number, String],
  userName: {
    type: String,
    validator: (v) => v.length >= 3,
  },
});

const emit = defineEmits(["update:userName", "update:userAge"]);
// 添加校验
// const emit = defineEmits({
//   "update-age": (age: number) => {
//     if (age < 18) {
//       console.log("未成年不允许参与");
//       return false;
//     }
//     return true;
//   },
// });

const attrs = useAttrs();
// 2s 后更新年龄
setTimeout(() => {
  emit("update:userAge", 22);
  emit("update:userName", "我们的");
}, 2000);
const isShowDialog: boolean = ref<boolean>(true);
watch(isShowDialog, (newvalue, oldvalue) => {
  console.log("watch showdialog", newvalue, oldvalue);
});

const show = () => {
  console.log("show");
};
// isShowDialog.value = false;
console.log("attrs.class", attrs.class, isShowDialog);
defineExpose({
  isShowDialog,
  show,
});
</script>

<style scoped></style>
