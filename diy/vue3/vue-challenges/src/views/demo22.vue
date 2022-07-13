<template>
    <div>
        <h2>渲染函数</h2>
        <MyButton :disabled="false" @custom-click="onClick">mybutton</MyButton>
    </div>
</template>

<script setup lang="ts">
import MyButton from '../components/MyButtton'
const onClick = ()=>{
    debugger
    console.log('onClick');
}
</script>

<style scoped>

</style>