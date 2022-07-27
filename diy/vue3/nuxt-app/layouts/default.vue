<template>
    <div>
        <a-layout style="min-height:100vh;">
            <a-layout-sider>

            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                    <a-menu-item v-for="item in routers" :key="item.title" @click="handleItemClick(item)">
                    <user-outlined />
                    <span>{{item.title}}</span>
                    </a-menu-item>

                    <a-menu-item key="2">
                    <video-camera-outlined />
                    <span>nav 2</span>
                    </a-menu-item>
                    <a-menu-item key="3">
                    <upload-outlined />
                    <span>nav 3</span>
                    </a-menu-item>
                </a-menu>

            </a-layout-sider>
            <a-layout>
            <a-layout-header  style="background: #fff; padding: 0">Nuxt 3 demo</a-layout-header>
            <a-layout-content style="padding:15px;">
                <NuxtPage/>
            </a-layout-content>
            <a-layout-footer>Footer</a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const router = useRouter();
const selectedKeys = ref<string[]>(['4'])
const routers = [
    {
        name:'',
        path:'/',
        title:'Hello world'
    },
    {
        name:'error',
        path:'/error',
        title:'Hello error'
    },
    {
        name:'demo3',
        path:'/demo3',
        title:'demo3'
    },
    {
        name:'demo4Use',
        path:'/demo4Use',
        title:'demo4Use'
    } ,
    {
        name:'demo5AsyncData',
        path:'/demo5AsyncData',
        title:'demo5AsyncData'
    },
    
    {
        name:'demo6cookie',
        path:'/demo6cookie',
        title:'demo6cookie'        
    },
    {
        name:'demo7UseFetch',
        path:'/demo7UseFetch',
        title:'demo7UseFetch'        
    },  
    {
        name:'demo8UseState',
        path:'/demo8UseState',
        title:'demo8UseState'        
    },
    {
        name:'dynamic',
        path:'/dynamic',
        title:'dynamic'   
    }       


]
function handleItemClick(item){
    router.push(item.path)
}
</script>