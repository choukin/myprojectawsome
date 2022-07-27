export default defineNuxtPlugin(()=>{
    addRouteMiddleware('global-test',()=>{
        console.log('这是一个通过插件添加的全局中间件 ')
    },{global:true})

    addRouteMiddleware('named-test', ()=>{
        console.log('named-test 具名中间件通过插件添加')
    })
})