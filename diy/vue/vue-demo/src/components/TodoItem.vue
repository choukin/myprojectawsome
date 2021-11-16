<template>
    <li>
        <slot name="pre-icon" :value="value">😄</slot>
        <span v-if="!del" class="red">{{title}}</span>
        <span v-else style="text-decoration: line-through;">{{title}}</span>
        <slot name="suf-icon" :value="value">😄</slot>
        <button v-show="!del" @click.stop="handleClick(title)">删除</button>

    </li>
</template>
<script>
export default {
    name:"todoItem",
    props:{
        title:String,
        del:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {
            value:Math.random()
        }
    },
    methods:{
        handleClick(){
            console.log('点击删除按钮')
            this.$emit('delete',this.title);
        }
    }
}
</script>
<style scoped>
.red{
    color: red;
}
</style>