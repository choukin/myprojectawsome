<template>
    <div>

    </div>
</template>

<script lang="ts">
const types = ['link' , 'default' , 'primary' , 'ghost' , 'dashed' , 'text']
</script>
<script setup lang="ts">

type ButtonType = 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text';
// const props = withDefaults(defineProps<{
//     type: ButtonType,
// }>(),{
//     type: 'default'
// })

const props = defineProps({
    type:{ 
            type:String,
            default:'default',
            validator:(value: string)=>{
                return types.includes(value)
            }
        }
    })

</script>

<style scoped>

</style>