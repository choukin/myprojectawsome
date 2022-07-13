<template>
    <div>
        <p>
            <button @click="update(count-1)">-</button>
            {{count}}
            <button @click="update(count+1)">+</button>

        </p>
    </div>
</template>

<script setup lang="ts">
import {reactive, toRefs} from 'vue'
function useCount(){
    const state = reactive({
        count:0
    })

    function update(value:number){
        state.count = value
    }
    return {
        // 确保解构不丢失响应性
        state:toRefs(state),
        update
    }
}

    const {state:{count}, update} = useCount()

</script>

<style scoped>

</style>