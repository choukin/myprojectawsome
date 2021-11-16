import router from '@/router/index';
import request from '@/utils/request';
const state = {
 step:{
     payAccount:'123456',
     recevierAccount:{
         type:'ali',
         number:''
     }
 }
}

const actions = {
    async submitStepForm({commit}, payload){
       const data =  await request({
            url:'/api/form',
            method:'post',
            data:payload,
        })
        commit('saveStepFormData',data.data)
        router.push({path:'/form/step-form/result'})
    }
}

const mutations = {
    saveStepFormData(state,{payload}){
        state.step = {
            ...state.step,
            ...payload
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}