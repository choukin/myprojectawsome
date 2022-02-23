# vue-3-ts-demo

[Vue3 入门指南](https://vue3.chengpeiquan.com/component.html#%E4%BA%86%E8%A7%A3-setup)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


# 插件
- 插件是自包含的代码，通常向Vue添加全局级功能， 它可以是一个带公开install 方法的object 也可以是一个function
- 添加全局方法或者property
- 添加全局资源：指令过滤器/过渡
- 通过全局混入来添加组件选项
- 添加全局实例方法，通过把他们添加到 config.globalProperties 上
- 一个库，提供自己的API 同时提供一个或多个功能

## 单组件插件
## 通用js插件
## 本地工具插件

## 组件之间的通信

### 父子组件通信
｜方案｜父组件向子组件｜子组件向父组件｜
｜props/emits｜ props｜emits｜
｜v-model/emits｜v-model｜emits｜
｜ref/emits｜ref｜emits defineExpose｜
｜provide/inject｜provide｜inject｜
｜EventBus｜emit/on｜emit/on｜
｜Vuex｜｜｜
|Pinia|||

### props 支持的类型
- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Promise
- Symbol

### provide inject
- 父组件提供provide 
- 子组件通过inject

### script-setup 模式下 4个全局编译宏
可以在 .eslintrc.js 中配置
```js
module.export = {
    globals:{
        defineProps:'readonly',
        defineEmits:'readonly',
        defineExpose:'readonly',
        withDefaults:'readonly'
    }
}
```


