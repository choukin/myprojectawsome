<template>
<div class="text-xl opacity-50">
    index page <br>
     {{ config }}<br>
    <NuxtLink to="detail">detail</NuxtLink><br>
    <NuxtLink to="/users-admins/111">管理员123</NuxtLink><br>
    <NuxtLink to="/parent/child">parent</NuxtLink><br>
    <NuxtLink to="/hello">costom layout</NuxtLink><br>
    {{show}}<br>
    <!-- 那么组件名称将会基于路径和文件名连起来，比如上面的base/foo/Button.vue注册名称将会是BaseFooButton，将来用起来会像下面这样： -->
    <BaseFooButton @click="show=!show" > basefoobutton</BaseFooButton><br>
    <!-- 如果在组件名前面加上Lazy前缀，则可以按需懒加载该组件，可用于优化打包尺寸。 -->
    <LazyBaseFooButton v-if="show">lazybase</LazyBaseFooButton>
    <!-- 带办列表 -->
    <div>
        {{color}}
        <div v-for="todo in todos" :key="todo.id">
            <label :for="todo.id">
            <input :id="todo.id" type="checkbox" v-model="todo.completed">
            <strong>{{todo.title}}</strong></label>
        </div>
    </div>
    <!-- {{counters}} -->
    <van-button type="primary">主要按钮</van-button>
    <button @click="plus">+</button>{{store.count}}
    <button @click="plus">-</button>
</div>    
</template>
<script setup lang="ts">
    import {ref} from 'vue'
    import {useStore} from '~~/stores/counterstore'
    import {storeToRefs} from 'pinia'
    const store = useStore()
    const config = useRuntimeConfig()
    const count = storeToRefs(store)
    const show = ref(false)
    // const {data: todos} = await useAsyncData('count', ()=>{$fetch('api/todos')})
    const {data:todos} = await useFetch('https://0bfd85ed-ecc5-4032-80f6-7e6f3ef5ecaf.mock.pstmn.io/api/todo',{
        // pick:['data'],
        transform(input: any){
            return input.data
        },
        headers: {'content-type': 'application/json; charset=utf-8'},
    })

    const {$hello}  = useNuxtApp()

    console.log($hello());

    const plus = ()=>{
        console.log('plus', count);
        
        store.$patch({count: store.count + 1})
    }

    const color = useColor();
    
    // console.log(data)
    // const todos = JSON.parse(data)
    // console.log(todos);
    
    // console.log(JSON.stringify(todos));

    
</script>
