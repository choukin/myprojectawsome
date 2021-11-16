<template>
    <div>
        <p>
            <button @click="handleNameChange">change this.name</button>
            <button @click="handleInfoChange">change this.info</button>
            <button @click="handleListChange">change this.list</button>

        </p>
        <PropsAndData :names="name" :list="list" :info="info"/>
        {{count}}
        <br>
        {{$store.getters.doubleCount}}
        <button @click="$store.commit('increment',2)">count++</button>
        <button @click="$store.dispatch('increment',2)">count++</button>
    </div>
</template>
<script>
import PropsAndData from "./PropsAndData.vue"
let name = 'vue'
export default {
    components:{
        PropsAndData
    },
    data(){
        return {
            name:name,
            info:{number:''},
            list:[]
        }
    },
    computed:{
        count(){
            return this.$store.state.count
        }
    },
    methods:{
        handleNameChange(){
            name = 'vue' + Date.now()
            console.log(name);
            console.log('this.name change 没有出发子组件更新');
        },
        handleInfoChange(){
            this.info.number = '1' 
            console.log('this.info change 没有出发子组件更新');
        },
        handleListChange(){
            this.list.push('1')
            console.log('this.list change 没有出发子组件更新');
        }
        
    }
}
</script>