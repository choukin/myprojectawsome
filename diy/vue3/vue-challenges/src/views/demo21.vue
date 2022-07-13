<template>
    <div>
        <h2>函数组件</h2>
        <list-component
            :list="list"
            :active-index="activeIndex"
            @toggle="toggle"
        />
    </div>
</template>

<script setup lang="ts">
import {ref, h} from "vue"

const ListComponent = (props, context)=>{
    const {list} = props
    const activeIndex = props['active-index']
    const {emit} = context
    const lis = list.map((item:{name:string}, index:number)=>{
        return h('li',{
                style:{
                    color: activeIndex===index?'red':''
                },
                onClick:()=>{
                    emit('toggle', index)
                }
        },item.name)
    })
    return h('ul',lis)
}

const list = [{
    name:"JSON"
},{
    name:"Doe"
},
{
    name:"smith"
}]
const activeIndex = ref(0)
function toggle (index:number){
    activeIndex.value = index
}
</script>

<style scoped>

</style>