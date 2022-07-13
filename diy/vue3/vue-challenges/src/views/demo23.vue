<template>
    <div>
        <h2>按键修饰符</h2>
        <!-- alt 或 shift 被一同按下时触发 -->
        <button @click.alt="onCLick1" @click.shift="onCLick1">ALT + shift</button>
        <!-- shift 被按下时触发 -->
        <button @click.shift.exact="SHIFTCLick1">shift</button>
        <!-- 添加按键修饰符没有任何系统修饰被按下时才触发 -->
        <button @click.exact="noCltrlCLick1">nocltrl</button>
    </div>
</template>

<script setup lang="ts">

function onCLick1 (){
    console.log('alt+shit');
}
function SHIFTCLick1 (){
    console.log('shit');
}

function noCltrlCLick1 (){
    console.log('shit');
}

</script>

<style scoped>

</style>