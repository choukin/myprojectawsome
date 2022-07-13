<template>
    <div>
        <h2>自定义指令</h2>
        {{activeTab}}
        <ul>
            <li
                v-for="(item, index) in list"
                :key="index"
                v-active-style="[{'color':'red'},()=> activeTab === index]"
                @click="toggleTab(index)"
              > 
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, VNode,DirectiveBinding, watchEffect } from "vue";

const VActiveStyle = {
    mounted(el:HTMLElement,  binding:DirectiveBinding, vnode:VNode){
        const [styles, callback] = binding.value
        watchEffect(()=>{
            const newValue = callback()
            for(let key in styles ){
                el.style[key] = newValue?styles[key]:''
            }
        })
    },    

}

const list = [1,2,3,4,5,6,7,8]

const activeTab = ref(0)

function toggleTab(index: number) {
    activeTab.value = index
}
</script>

<style scoped>

</style>