<template>
    <div>
        Fetch Result: {{sameCounter}}来自sameCounter
        <pre class="text-left"><code>{{data}}</code></pre>
        <a-button @click="count++">+</a-button>
        
    </div>
</template>

<script setup lang="ts">
const count = ref(1)
const {data} = await useFetch(()=>`/api/demo/${count.value}`,{params:{token:123}})
const sameCounter = useState('counter')

</script>

<style scoped>

</style>