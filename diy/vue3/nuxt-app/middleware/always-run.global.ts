export default defineNuxtRouteMiddleware((to)=>{
    const {$config} = useNuxtApp()
    if($config){
        console.log('在中间件中访问运行时配置', toRaw($config))
    }
    console.log('跳转到 ', to.path, '可能要跳转到其他地方');
    // return '/demo9middleware/secret'
    
})