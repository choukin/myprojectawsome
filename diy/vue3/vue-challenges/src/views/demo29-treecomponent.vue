<template>
    <div>
        <h2>树组件</h2>
        <tree :data="data"></tree>
    </div>
</template>

<script setup lang="ts">
import { h } from 'vue';

interface TreeData{
    key:string
    title:string
    children:TreeData[]
}
const props = defineProps<{data:TreeData[]}>()
const {data} =  props

function tree(props,context){

    const {data:data1} = props

    const lis = data1.map((item:TreeData) => {
        let children = null
        if(item.children && item.children.length>0){
            children =  tree({data:item.children},context)
        }
        return h('li',{key: item.key},[item.title,children])
    })

    return h('ul', lis)
}
</script>

<style scoped>

</style>