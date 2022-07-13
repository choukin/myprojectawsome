<template>
    <input type="text" :value="modelValue" @input="emitValue">
</template>

<script setup lang="ts">
// interface Props{
//     modelValue?:string,
//     modelModifiers?:{
//         capitalize:Boolean
//     }
// }
const props = defineProps({
    modelValue: String,
    modelModifiers:{
        default:()=>({capitalize:false})
    }
})
const emit = defineEmits(['update:modelValue'])
 function emitValue(e: Event){
    let value =  (<HTMLInputElement>e.target).value
    if(props?.modelModifiers?.capitalize){
        value = value.charAt(0).toUpperCase()+value.slice(1)
    }
    emit('update:modelValue', value)
 }
</script>

<style scoped>

</style>