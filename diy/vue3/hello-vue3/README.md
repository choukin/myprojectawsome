# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

- 组合式api setup
  - setup 选项在组件创建之前执行，一旦props 被解析 就将作为组合式API 的入口
  - 在 setup 中应该避免使用this 因为它不会找到组件的实例，setup的调用发生在 data property computed property 或 methods 被解析前，所以他们无法在setup中获取
- Teleport  

- 片段
  - Vue3 现在正式支持了多根节点的组件，就是片段

- 触发组件选项
  - 可以通过emits选项在组件上定义发出的事件

- 来自 @vue/runtime-core的 createRenderer API 用于创建自定义渲染器  
- [createRenderer]单文件组件组合式 API 语法糖 `<script setup>`
 - 更少的样板内容，更简洁的代码
 - 能够使用纯Typescript 声明props和抛出事件
 - 更好的运行时性能（其模版会被编译成与其同一作用域的渲染函数，没有任何中间代理）
 - 更好的IDE类型推断性能（减少语言服务器从代码中抽离的工作）

- 单文件组件状态驱动的CSS变量 `<style>`中的 b-bind
    - 单文件组件的`<style>` 标签可以通过 v-bind 这一CSS 函数将CSS 的值关联到动态的组件状态上,实际上值会编译成hash的css自定义property，通过内联样式的方式应用到组件的根元素上；、

- SFC`<style scoped>` 现在可以包含全局规则或只针对插槽内容的规则
 - ::v-deep(){} / :deep(){}
 - ::v-soltted(){} / :soltted(){}
 - ::v-global(){}/:global(){}


- 全新API createApp
```js
import {createAPP} from 'vue';
const app = createApp({});

```

|2.x全局API|3.x实例API|
|:--:|:--:|
|Vue.config|app.config|
|Vue.config.productionTip|移除|
|Vue.config.ignoredElements|app.config.compilerOptions.isCustomElement|
|Vue.component|app.component|
|Vue.directive|app.directive|
|Vue.mixin|app.mixin|
|Vue.use|app.use|
|Vue.prototype|app.config.globalProperties|
|Vue.extend|移除|

```js
app.provide('guide', 'vue 3 guide')
export default{
inject:{
    book:{
        from:'guide'
    }
},
template:`<div>{{book}}</div>`
}
```

```
import {nextTick} from 'vue
import {shalloMount} from '@vue/test/utils'
```

## 模版指令
 - 组件上 v-modal 用法已变更,以替换 v-bind.sync
   - 非兼容：用于自定义组件时，v-model prop 和事件默认名称已更改
     - prop value -> modelValue
     - 事件 input -> update:modelValue;
   - 非兼容 v-bind 的 .sync 修饰符和组件的model 选项已移除，可在 v-model 上加一个参数代替；
   - 新增 现在可以在同一个组件上使用多个 v-model绑定
   - 新增 现在可以自定义 v-model修饰符


 - `<template v-for>` 和 非 v-for 节点上的 `key`用法已变更
  - 新增 对于 v-if/v-else/v-else-if 的各个分支项 key 将不再是必须的，因为现在Vue 会自动生成唯一的key
    - 非兼容 如果你手动提供key 那么每个分支必须使用唯一的key，你将不能再通过故意使用相同的key来强制重用分支；
  - 非兼容 `<template v-for> ` 的key 应该设置在  `<template>` 标签上（而不是设置在它的子节点上）
 - 同一元素上使用v-if 和 v-for 优先级已变更
   - 两者作用于同一个元素上时，v-if 会拥有比 v-for 更高的优先级
 - v-bind=“object” 现在排序敏感
   - v-bind 的绑定顺序会影响渲染结果
 - v-on：event.native 修饰符已移除
 - v-for中 ref 不再注册ref数组


 ## 组件
- 只能使用普通函数创建函数式组件
  - 3.x 中，2.x带来的函数式组件的性能提升可以忽略不计，因此我们建议只使用有状态的组件
  - 函数式组件只能由接收 props 和 context （slots, attrs，emit）的普通函数创建
  - functional attribute 已从单文件组件的 template 中移除
  - `{functional:true}` 选项已从通过函数创建的组件中移除
- functional attribute 在单文件组件的 template 和 functional 组件选项中被废弃
- 异步组件现在需要使用 defineAsyncComponent 方法来创建
- 组件事件现在需要在 emits 选项中声明


## 渲染函数
- 渲染函数API更改
  - h 现在是全局导入，而不是作为参数传递给渲染函数
  - 更改渲染函数参数，使其在有状态组件和函数组件的表现更加一致
  - VNode 现在有一个扁平的prop结果
    ```js
    // 3.x 语法
    {
      class: ['button', { 'is-outlined': isOutlined }],
      style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
      id: 'submit',
      innerHTML: '',
      onClick: submitForm,
      key: 'submit-button'
    }
    ```
  - 注册组件
   ```js
    import {h, resolveComponent} from 'vue'
    export default{
      setup(){
        const ButtonCounter = resolveCOmponent('button-counter')
        return ()=>h(ButtonCounter)
      }
    }
   ```
- `$scopedSlots` property 已移除，所有插槽都通过`$slots` 作为函数暴漏
  - `this.$slots` 现在将插槽作为函数公开
  - 非兼容 移除 `this.$scopedSlots`
- `$listeners` 本移除或整合到$attrs
   ```js
    {
      text:'这是一个 attribute',
      onCose:()=>{console.log('close 事件被触发')}
    }
   ```
   ```html
    <input type="text" v-bind="$attrs">
   ```
- `$attrs` 现在包含 `class` 和 `style` attribute


## 自定义元素
- 自定义元素检测现在在模版编译时被执行
  - 非兼容： 检测并确定哪些标签应被视为自定义元素的过程，现在会在模版编译期间执行，且应该通过编译器选项而不是运行时配置来配置
  - 非兼容： 特殊的 `is`
- 特殊的`is` attribute 的使用被严格限制在被保留的`<component>` 标签中
  - 在保留的`<component>` 标签上使用时，它的行为将于2.选中完全相同
  - 在普通组件上时，他的行为将类似于普通的attribute
  - 在普通元素上使用时，它将作为 is attribute 传递给 createElement 调用，并作为原生attribute 渲染，这支持了自定义元素的用法。


  ## 其他小改变
   - `destoryed` 生命周期选项被重命名为 `unmounted`
   - `beforeDestory` 声明周期选项被重命名为`beforeUnmount`
   - default prop 工厂函数不再可以访问 this 上下文
      - 组件接收到的原始prop 将作为参数传递给默认函数
      - inject API 可以在默认函数中使用
   - 自定义指令的API已经更改为与组件生命周期一致，且 `binding.expression`已迁移
      - 指令的钩子函数已经被重命名，以更好地与组件的生命周期保持一致
      - 额外地，expression 字符串不再作为 binding 对象的一部分被传入；
      - 语法
        - created 在元素的attribute 或事件监听器被应用之前调用
        - bind => beforeMount 指令绑定到元素后调用，只执行一次
        - inserted => mounted 元素插入父DOM 后调用
        - beforeUpdate 在元素本身被更新之前调用，与组件的生命周期钩子十分相似
        - update 移除 使用 updated
        - componentUpdated -》 updated 一旦组件和子级被更新，就会调用这个钩子
        - unbind -》 unmounted 一旦指令被移除，就会调用这个钩子，也只调用一次

       ```js
          const MyDirective = {
            created(el, binding, vnode, preVnode){}, 
            beforeMount(){},
            mounted(el, binding, vnode){
              // 获取实例
              const vm = binding.instance
            },
            beforeUpdate(){},
            updated(){},
            beforeUnmount(){},
            unmounted(){}
          }
       ``` 
   - data 选项应始终被声明为一个函数
      - 非兼容 组件选项 data 的声明 不在接收纯JavaScript object 而是接收一个 function
      - 非兼容 当合并来自 mixin 或 extend 的多个 data 返回值时，合并操作现在是浅层次的而非深层次的
   - 来自mixin 的data 选项现在为浅合并
   - Attribute 强制策略已更改
      - 移除枚举 attribute 的内部概念，并将这些 attribute 视为普通的非布尔 attribute
      - 非兼容 如果值为 布尔值 false, 则不再移除 attribute ，取而代之的是，它将被设置为 attr="false".若要移除 atrtrbute 应该使用 null 或者 undefined
   - 一些过渡的class被重命名
      - 过渡类名 v-enter 修改为 v-enter-from 、过渡类名 v-leave 修改为 v-leave-from
      ```css
      .v-enter-from,
        .v-leave-to {
          opacity: 0;
        }

        .v-leave-from,
        .v-enter-to {
          opacity: 1;
        }
      ```
   - `<TransitionGroup>` 不再默认渲染包裹元素
      - `<transition-group>` 不再默认渲染根元素，但仍然可以用tag atribute 创建根元素
      ```html
        <transition-group tag="span">

        </transition-group>  
      ```
   - 当监听一个数组时，只有当数组被替换时，回调才被触发，如果需要在变更时触发，则必须指定deep 选项
    ```js
     watch:{
       bookList:{
         handler(val, oldVal) {
           console.log('book list changed')
         },
         deep: true,
       }
     }
    ```
   - 没有特殊指令的标记（v-if/else-if/else、v-for 或 v-slot）的`<template>`现在被视为普通元素，并将渲染为原声的`<template>` 元素，而不是渲染其内部内容
   - 已挂载的应用不会取代它所挂载的元素
   - 声明周期的 hook 事件前缀改为 vnode-
    - Vue2
    ```html
      <template>
        <child-component @hook:updated="onUpdated">
      </template>  
    ```

    - vue3
     ```html
      <template>
        <child-component @vnode-updated="onUpdated">
      </template>  
     ```
     或驼峰命名

     ```html
      <template>
         <child-component @vnodeUpdate="onUpdated"> 
      </template>  
     ```


## 被移除的API

- keyCode 作为 v-on 修饰符的支持
    - 非兼容 不再支持使用数字（即键码）作为v-on 的支持
    - 非兼容 不再支持 config.keyCodes
    - vue2
    ```html
      <input v-on:keyup.13="submit"/>

      <input v-on:keyup.enter="submit"/>
    ```
     ```js
      // 定义别名
      Vue.config.KeyCodes={
        f1:112
      }
     ```
     ```html
      <input v-on:keyup.112="showHelpText"/>
      <input v-on:keyup.f1="showHelpText">
     ```

     - vue3.x 建议对任何要用做修饰符的键使用 kebab-cased(短横线)
      ```html
        <input v-on:keyup.page-down="nextPage">

        <!-- 同时匹配q 和 Q -->
        <input v-on:keypress.q="quit">
      ```


- $on $off 和$once实例方法
  - 根组件事件
    静态的事件监听器可以通过prop的形式传递给 createApp 以添加到根组件中 
      ```js
        createApp(App,{
          onExpand(){
            console.log('expand')
          }
        })
      ```
  - 事件总线 可以使用外部是现实了触发器接口的库，例如 mitt 或 tiny-emitter
    ```js
    // eventBus.js
    import emitter from 'tiny-emitter/instance'

    export default{
      $on:(...args)=> emitter.on(...args),
      $once:(...args) => emitter.once(...args),
      $off:(...args)=> emitter.off(...args),
      $emit:(...args)=> emitter.emit(...args),
    }
    ```
  - prop 和事件 应该是父子组件之间沟通的首选，
  - 重构插槽
  - 全局状态管理  




- 过滤器 filter
  - 建议使用计算属性来替换 过滤器
  - 全局属性替代全局过滤器
  ```js
      const app = createApp(app);

      app.config.globalProperties.$filters = {
        currencyUSD(value){
          return '$'+value
        }
      }
  ```

  ```html
    <template>
      <h1>Bank account Balance</h1>
      <p>{{$filters.currencyUSD(accountBalance)}}
    </template>  
  ```
- 内联模版 attribute
- $children 实例 property
    - vue3 建议使用 $refs 访问子组件
- propsData 选项
  - propsData 选项之前用户在创建 Vue实例的过程中传入 prop ,现在被移除了，如果想为vue3应用的根组件传入prop,请使用 createApp 的第二个参数
  ```js
    const app = createApp(
      {
        props:['username'],
        template:'<div>{{username}}</div>',
      },
      {username:'Evan}
    )
  ```
- $destroy 实例方法。用户不应再动手管理单个 Vue组件的生命周期
- 全局函数 set 和 delete 以及实例方法 $set和¥delete,基于代理的变化监测以及不需要他们了；



