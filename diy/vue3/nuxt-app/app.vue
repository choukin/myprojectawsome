<template>
  <div>
    <Html :lang="String(dynamic)">
      <Head>
        <Title>Luck number:{{dynamic}}</Title>
        <Meta name="description" :content="`页面的描述：${dynamic}`"></Meta>
        <Link rel="preload" href="test.txt" as="script"></Link>
      </Head>
    </Html>
     <div class="mt-5">
      <NButton @click="dynamic = Math.round(Math.random() * 100)">
        Click me and see the dynamic title
      </NButton>
    </div>
    <!--  -->
     <a-buttton class="border p-1 rounded" @click="layout = 'custom'">切换布局</a-buttton>{{layout}}
      <a-buttton class="border p-1 rounded" @click="layout==='default'?layout='custom':layout='default'">切换布局</a-buttton>
    <NuxtLayout :name="layout"/>
  </div>
</template>
<script setup lang="ts">

useHead({
  titleTemplate:`%s - useHead 示例`,
  bodyAttrs:{
    class:'test'
  }
})
const dynamic = ref(49)

const switchFn = ()=>{
  layout.value = 'custom'
}

const layout = ref('default')
</script>