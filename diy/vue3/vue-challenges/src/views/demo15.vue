<template>
    <div>
        <h2>实现本地存储函数</h2>
        {{counter}}
        <button @click="counter++">inc</button>
    </div>
</template>

<script setup lang="ts">
import {ref, computed, customRef} from "vue"
function useLocalStorage(key:string, initialValue: any){
    const value = ref(initialValue)
    const count = computed(
        {
            get(){
                const counter = localStorage.getItem(key)
                if(!counter){
                    localStorage.setItem(key, value.value)
                }
                return value.value
            },
            set(newValue){
                value.value = newValue
                window.localStorage.setItem(key, newValue)
            }
        }
    )
    return count
}

function useLocalStorage2(key:string, initialValue:any){
    return customRef((track, trigger) => {
        return {
            get(){
                track()
                return window.localStorage.getItem(key)||initialValue
            },
            set(newValue){
                window.localStorage.setItem(key, newValue)
                trigger()
            }
        }
    })
}


// const counter = useLocalStorage("counter", 0)
const counter = useLocalStorage2("counter", 0)

console.log(counter.value);

// counter.value = 1

</script>

<style scoped>

</style>