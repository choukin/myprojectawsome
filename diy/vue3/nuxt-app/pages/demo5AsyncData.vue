<template>
    <div>
        {{showMountain}}
        <a-button @click="showMountain=!showMountain">{{showMountain?'隐藏':'显示'}}Mountain</a-button>
        <a-button :disabled="refreshing" @click="refreshAll">刷新所有数据</a-button>
        <div>
            <CounterExample/>
             <!-- <MyModal/> -->
             <MountainExample v-if="showMountain"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const showMountain = ref(false)

const refreshing = ref(false)

const refreshAll = async ()=>{
    refreshing.value = true
    try{
        refreshNuxtData()
    }finally{
        refreshing.value = false
    }
}
</script>

<style scoped>

</style>