<template>
<h2>自定义组件</h2>
    <div id="customapp"></div>
</template>

<script setup lang="ts">
import { defineCustomElement, h, onMounted, render } from 'vue';

/**
 * 自定义组件
 */

const VueJs = defineCustomElement({
    props:{
        message:String,
    },
    // template:'<span>{{message}}</span>'
    // setup:(props)=>()=>h('span',null,props.message)
    render(){
      return  h('span',null,this.message)
    }

})

customElements.define('vue-js', VueJs)

onMounted(()=>{
    document.getElementById("customapp")!.innerHTML = "<vue-js message=\"Hello Vue.js\"></vue-js>"
})
</script>

<style scoped>

</style>