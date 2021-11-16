import Vue from 'vue'
const Store = function Store(options={}){
    const {state={},mutations={},getters={},actions={}} = options
    this._vm = new Vue({
        data:{
            $$state:state
        }
    })
    this._mutations = mutations
    this._actions = actions
    let _getters = {}
    for(let p in getters) {
        Object.defineProperty(_getters,p,{
            get(){
                return getters[p](state)
            }
        })
    }

    this.getters = _getters

}

Store.prototype.commit = function(type, payload) {
    if(this._mutations[type]) {
        this._mutations[type](this.state, payload)
    }
}

Store.prototype.dispatch = function(type,payload) {
    if(this._actions[type]) {
        let args = [{state:this.state},payload]
        this._actions[type].apply(this, args)
    }
}

Object.defineProperties(Store.prototype,{
    state:{
        get:function(){
            return this._vm._data.$$state
        }
    }
})

function init(){
    let options = this.$options
    if(options.store) {
        this.$store = options.store
    }else if(options.parent && options.parent.$store) {
        this.$store = options.parent.$store
    }

}

function install(Vue) {
    Vue.mixin({
        beforeCreate:init
    })
}

export default {Store,install}