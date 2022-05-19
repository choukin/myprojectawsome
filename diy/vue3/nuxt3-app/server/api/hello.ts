// Nuxt 将自动读取~/server/api目录中的任何文件，以创建 API 端点。
export default (req,res)=> {
    console.log('api',req.someValue);
    
    return {
        data:[
            'vue',
            'nuxt',
            'vuepress'
        ]
    }
}