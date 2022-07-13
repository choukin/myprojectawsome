<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
// import dynamicVue from './views/dynamic.vue';
import { provide,ref } from 'vue'
import demo3 from './views/demo3ref.vue'
// import demo4 from './views/demostop.vue'
import demo4 from './views/demo4.vue'
import demo5 from './views/demo5.vue'
import demo6 from './views/demo6.vue'
import demo7 from './views/demo7.vue'
import demo8 from './views/demo8watch.vue'
import demo9 from './views/demo9ref.vue'
import demo10 from './views/demo10.vue'
import demo11 from './views/demo11.vue'
import demo12 from './views/demo12.vue'
import demo13 from './views/demo13.vue'
import demo14 from './views/demo14.vue'
import demo15 from './views/demo15.vue'
import demo19 from './views/demo19.vue'
import demo20 from './views/demo20.vue'
import demo21 from './views/demo21.vue'
import demo22 from './views/demo22.vue'
import demo23 from './views/demo23.vue'
import demo25 from './views/demo25-usemouse.vue'
import demo26 from './views/demo26-global-css.vue'
import demo27 from './views/demo27-raw-api.vue'
import demo28 from './views/demo28-effect-scope.vue'
import demo29 from './views/demo29-treecomponent.vue'
import demo30 from './views/demo30-custom-element.vue'
import demo31 from "./views/demo31-custom-ref.vue";
import demo32 from "./views/demo32-active-style.vue";
import demo33 from './views/demo33-v-model.vue'
interface TreeData{
    key:string
    title:string
    children:TreeData[]
}
const count = ref(3)
provide('count', count)

const data:TreeData[] = [
  {
    key:'1',
    title:'23',
    children:[{
      key:'11',
      title:'231',
      children:[{
                key:'12',
                title:'232',
                children:[]
      }]
      }]
  },
  {
    key:'2',
    title:'23',
    children:[{
      key:'11',
      title:'231',
      children:[{
                key:'112',
                title:'232',
                children:[]
      },
      {
                key:'113',
                title:'233',
                children:[]
      }      
      ]
      }]
  }  
]
</script>

<template>
<!-- DOM 传送 -->
  <teleport to="body">
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <demo3/>
  <demo4/>
  <demo5/>
  <demo6/>
  <demo7/>  
    <demo8/> 
    <demo9/>   
    <demo10/> 
    <demo11/> 
    <demo12/>  
    <demo13/>  
    <demo14/>        
    <demo15/>
    <demo19/>
    <demo20/>
    <demo21/> 
    <demo22/>  
    <demo23/>   
    <demo25/>
    <demo26/>          
    <demo27/> 
    <demo28/>
    <demo29 :data="data"/>
    <demo30/>
    <demo31/>
    <demo32/>
    <demo33/>          
  </teleport>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
