<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <input type="text" v-model="message">
    <input type="text" :value="message" @input="handleChange">
    {{message}}
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <todo-list>
       <todo-item v-for="item in list" :title="item.title" :del="item.del" :key="item.title" @delete="handleDelete">
         <template  v-slot>
           前置图
         </template>
       </todo-item>
    </todo-list> 
    <router-view></router-view>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TodoItem from './components/TodoItem.vue'
// import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    // TodoList,
    TodoItem,
  },
  data(){
    return {
      message:'hello Vue',
      list:[
                {
                    title:'课程1',
                    del:true,
                },
                {
                    title:'课程2',
                    del:true,
                },
                {
                    title:'课程3',
                    del:false,
                }
                ]
    }
  },
  methods:{
    handleChange(e){
      this.message = e.target.value
    },
    handleDelete(title){
      console.log(title,'handleDelete');
    }
  }
}
</script>

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
