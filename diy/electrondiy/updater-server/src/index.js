const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const server = require('koa-static-server')
const multer = require('koa-multer')



const compareVersions = require('compare-versions')

const uploadCrash = multer({dest:'crash/'})

function getNewVersion(version) {
  if(!version) return null
  let maxVersion = {
      name:'1.0.1',
      pub_date:'2020-02-01T12:26:53+1:00',
      notes:'新增功能',
      url:'http://127.0.0.1:33855/public/walle-2.0.0-mac.zip'
  }
  if(compareVersions.compare(maxVersion.name,version,">")) {
      return maxVersion
  } 
  return null
}


router.post('/crash', uploadCrash.single('upload_file_minidump'),(ctx,next)=>{
    console.log('crash: ',ctx.req.body);
    // 存DB
    
})
router.get('/darwin',(ctx,next)=>{
    // 处理mac 更新 ？ version。0.0&uid=3123
    const {version} = ctx.query
    let newVersion = getNewVersion(version)
    
    if(newVersion) {
        ctx.body = newVersion
    } else {
        ctx.status = 204 // 思等同于请求执行成功，但是没有数据，浏览器不用刷新页面.也不用导向新的页面
    }
    
})

router.get('win32/RELEASESS',(ctx, next)=>{
     let newVersion = getNewVersion(ctx.query,version)
     if(newVersion) {
         ctx.body = 'BBCXXXX walle-1.0.1.nupkg 62177782' // 客户端获取到后请求nupkg
     } else {
         ctx.status = 204
     }
})
// router.get('win32/*.nupkg',(ctx, next)=>{
//     ctx.redirect(`/public/${ctx.params[0]}.nupkg`)
// })
// router.get('/win32/*.nupkg', (ctx, next) => {
//     // redirect s3 静态文件服务
//     ctx.redirect(`/public/${ctx.params[0]}.nupkg`)
// })
app.use(server({rootDir:'public',rootPath:'/public'}))

app.use(router.routes()).use(router.allowedMethods());
app.listen(33855)
