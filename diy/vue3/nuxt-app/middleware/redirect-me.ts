export default defineNuxtRouteMiddleware((to)=>{
    const {$config} = useNuxtApp()
    if($config){
        console.log(`中间件中访问运行时配置`,$config);
        
    }else{
        console.log('跳转到 ', to.path, '可能要先跳转到其他位置');
        
    }
})