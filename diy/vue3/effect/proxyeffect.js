/**
 * https://juejin.cn/post/6992018709439053837?content_source_url=https%3A%2F%2Fgithub.com%2Fvue3%2Fvue3-News#heading-6
 * https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/vue3-overview/
 */
// 定义一个名为 activeEffect 的空变量，用于存放 watchEffect 传进来的函数
let activeEffect;

/**
 * 发布订阅模式中的发布者 dependence
 * 将会为每个响应式对象的每个键生成一个发布者实例
 */
class Dep{
    // 用 set 做换成列表以防止列表中添加多个完全相同的函数
    subscribers = new Set();
    // 构造函数接受一个初始化的值放在私有变量内
    constructor(value){
        this._value = value;
    }

    // 当使用 xxx.value 获取对象上的value值
    get value(){
        // 代理模式 当获取对象上的value属性值时触发depend 方法
        this.depend();
        // 然后返回私有变量内的值
        return this._value;
    }

    // 当使用 xxx.value = xxx 修改对象上的value 值时
    set value(value){
        // 先修改值，在触发，这样保证触发的时候用到的是一件修改后的新值
        this._value = value;
        this.notify();
    }
    // 依赖收集方法
    depend(){
        console.log('depend', activeEffect);
        if(activeEffect){
            this.subscribers.add(activeEffect);
        }
    }
    // 更新操作，通常在值被修改后调用
    notify(){
        // 遍历换成列表里存放的函数，并一次触发执行
        this.subscribers.forEach(effect=>{
            effect();
        });
    }
}

// 模仿Vue3 的 watchEffect
function watchEffect(effect){
    // 先把传进来的函数放到 activeEffect 这个变量中
    activeEffect = effect;
    // 执行watchEffect 里的函数
    effect();
    // 最后把activeEffect 值设置为空 订阅重复函数
    activeEffect = null;
}

// Proxy 处理的代理处理对象
const reactiveHandlers = {
    // 当触发get 操作时
    get(target, key){
        // 先调用 getDep 函数获取到里面存放到value值，
        const value = getDep(target, key).value
        // 如果value 是对象的话
        if(value && typeof value ==='object') {
            // 那就把 value 也变成一个响应式对象
            return reactive(value)
        }else{
            // 如果value 只是基本数据类型就直接返回
            return value
        }
    },
    // 当触发 set 操作时
    set(target, key, value){
        // 调用 getDep 函数并将里面存放的value 值重新复制成set操作的值
        getDep(target,key).value = value;
    }
}
// 定义一个 WeakMap 数据类型，用于存放 reactive 定义的对象以及他们的发布者对象集
const targetToHashMap = new WeakMap();

// 用于获取reactive 定义的对象所应对应的发布者对象集里的某个键对应的发布者对象
function getDep(target, key){
    // 获取reactive 定义的对象所对应的发布者对象集
  let depMap = targetToHashMap.get(target);
  // 如果没有获取到的话
  if(!depMap){
      // 就新建一个空的发布者对象集
      depMap = new Map();
      // 然后把发布者对象集合存进WeakMap里
      targetToHashMap.set(target, depMap);
  }
   // 获取这个发布者对象集合里的某个键所对应的发布者对象
  let dep = depMap.get(key);
  // 如果没有找到的话
  if(!dep) {
      // 就新建一个发布者对象并出示话赋值
      dep = new Dep(target[key]);
      // 然后将这个发布者对象放入到发布者对象集合里
      depMap.set(key, dep)
  }
  // 返回发布者对象

  return dep
}
// 模仿vue3的 reactive 
function reactive(obj){
    // 返回一个传进来的参数对象的代理对象，以便使用代理模式拦截对象上的操作并应用发布订阅模式
    return new Proxy(obj, reactiveHandlers)
}

const state = reactive({
    count:0
})

watchEffect(()=>{
    console.log(state.count);
})

state.count++;
state.count++;

