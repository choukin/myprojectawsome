/**
 * 解决问题 
 * 1. 定义数据时手写 getter setter
 * 2.手动的执行一下依赖收集函数以及出发的函数
 */
let activEeffect;

class Dep{
    subscribers = new Set();
    depend(){
        if(activEeffect) {
            this.subscribers.add(activeEffect)
        }
    }
    notify(){
        this.subscribers.forEach(effect=> effect())
    }
}

function watchEffect(effect) {
    activeEffect = effect;
    effect()
    activeEffect = null
}


function reactive(raw) {
    // 使用Object.defineProperty
    // 1.便利对象上存在的Key
    Object.keys(raw).forEach(key=>{
        //2 为每个key都创建一个一览对象
        const dep = new Dep()
        //3 用 getter 和 setter 重写原对象属性
        let realValue = raw[key]
        Object.defineProperty(raw, key,{
            get(){
                // 4 在 getter 和 setter 里调用依赖对象的应对方法
                dep.depend()
                return realValue
            },
            set(newValue){
                realValue = newValue;
                dep.notify();
            }
        })

    })

    return raw;
}


// 使用
const dep = new Dep()

let actualCount = 0;
const state = {
    get count(){
        dep.depend();
        return actualCount;
    },
    set count(newCount) {
        actualCOunt = newCount;
        dep.notify();
    }
}

watchEffect(()=>{
    console.log(state.count);
})

state.count++;
state.count++;