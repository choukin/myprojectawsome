<template>
    <div>
        <h2>鼠标坐标</h2>
        Mouse position is at {{x}} {{y}}
    </div>
</template>

<script setup lang="ts">
import { toRefs,ref,Ref, onMounted, onUnmounted } from "vue";
    function useEventListener(target:HTMLElement|Window, event:string, callback:Function) {
        const back = (e):void=>{
            callback(e)
        }
        onMounted(()=>{
            target.addEventListener(event,back)
        })
        onUnmounted(()=>{
            target.removeEventListener(event, back)
        })
    }

     function useMouse(){
        const x = ref(0)
        const y = ref(0)
            useEventListener(window, "mousemove", (e)=>{
                const {clientX, clientY} = e
                x.value = clientX
                y.value = clientY
                
            })
        return {x,y}
    }

    const {x, y} = useMouse()
    console.log('=====');
    
    console.log(x,y);
    
</script>

<style scoped>

</style>