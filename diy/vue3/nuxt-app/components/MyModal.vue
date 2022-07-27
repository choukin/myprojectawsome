<template>
    <NButton @click="open=true">
        打开弹框
    </NButton>
    <Teleport to="body">
        <Ncard v-if="open" class="modal p4"> 
            <p>hello from the modal!</p>
            <NButton @click="open = false">关闭</NButton>
        </Ncard>
     </Teleport>   
</template>

<script setup lang="ts">
import {ref} from 'vue'
const open = ref(false)
</script>

<style scoped>
.modal{
    position:fixed;
    z-index: 999;
    top:20%;
    left:50%;
    width:300px;
    margin-left: -150px;
}

</style>