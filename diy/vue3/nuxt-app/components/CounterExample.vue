<template>
    <div>
       {{data}}
        <div>
            <a-button @click="ctr++">+</a-button>
            <a-button @click="ctr--">-</a-button>
            <!-- <a-button @click="refresh">refresh</a-button> -->


        </div>
    </div>
</template>

<script setup lang="ts">
const ctr = ref(0)
const {data, pending, refresh} = await useAsyncData( 'mountains',()=> $fetch(`/api/hello?ctr=${ctr.value}`),{watch:[ctr]})
</script>

<style scoped>

</style>