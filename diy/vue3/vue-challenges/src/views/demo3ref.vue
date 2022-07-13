<template>
    <div>
{{fooRef}}
{{state}}
{{count}}
<p>
    <span @click="update(count-1)">-</span>
    <span @click="update(count+1)">+</span>
</p>
    </div>
</template>

<script setup lang="ts">
import {ref, isRef, toRef, Ref,reactive, unref} from "vue"

const initial = ref(10)
const count = ref(0)

function update(value:number){
    count.value = value
}

console.log(isRef(count)?1:0)

function initialCount(value:number|Ref<number>){
    value = unref(value)
    console.log(value===10);
    
}

initialCount(initial)

const state = reactive({
    foo:1,
    bar:2
})

const fooRef = toRef(state,'foo')

fooRef.value++

console.log(state.foo === 2);

state.foo++
console.log(fooRef.value === 3);






</script>

<style scoped>

</style>