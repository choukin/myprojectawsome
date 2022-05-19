import { defineStore } from "pinia";
import { ref } from "vue";

// export const useCounterStore = defineStore("counter", {
//   state: () => {
//     return { count: 0 };
//   },
//   actions: {
//     incement() {
//       this.count++;
//     },
//   },
// });

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  function incement() {
    count.value++;
  }
  function $reset() {
    count.value = 0;
  }
  return { count, incement, $reset };
});
