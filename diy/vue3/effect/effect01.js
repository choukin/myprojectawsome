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