import Vue from 'vue'
import Vuex from 'vuex'
// import Vuex from './mini-vuex'
// import App from './11/index.vue'
import App from './App.vue'

import TodoList from './components/TodoList'
import router from './router'
Vue.component('todo-list', TodoList)
Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    count:0,
  },
  mutations:{
    increment(state,n){
      state.count+=n
    }
  },
  actions:{
    increment({state},n) {
      console.log(arguments);
      setTimeout(()=>{
        state.count+=n
      },1000)
    }
  },
  getters:{
    doubleCount(state){
      return state.count*2
    }
  }

})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
