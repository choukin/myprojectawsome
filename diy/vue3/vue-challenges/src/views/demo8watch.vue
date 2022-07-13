<template>
    <div>
        <h2>watch 全家桶</h2>
            {{count}}
            <p :ref="el => eleRef = el">
                {{age}}
            </p>
    </div>
</template>

<script setup lang="ts">
  import {ref, watch} from 'vue'
  const count = ref(0)

// 1: 确保函数只执行一次
  const unwatch = watch(count,()=>{
    console.log("Only triggered once");
  })


  count.value = 1

  setTimeout(()=>{
    
    count.value = 2
      unwatch()
  })

// 确保函数本正确执行
  const state = ref({
    count:0
  })

  watch(()=>state.value.count ,()=>{
    console.log("the state.count updated");
  })

  state.value.count = 2

// 确保正确访问到更新后的eleRefs
// 函数型ref
  const eleRef = ref()
  const age = ref(2)
  watch(age,()=>{
    console.log(eleRef.value);
  })

  age.value = 18
</script>

<style scoped>

</style>