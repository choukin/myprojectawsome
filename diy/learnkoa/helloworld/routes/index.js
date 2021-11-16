const router = require('koa-router')()
const multer = require('koa-multer')
const upload = multer({ dest: 'uploads/' })
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/actover', upload.any(), ctx => {
  console.log(ctx.req.files)
  ctx.body = {
    status: {
      code: 0,
      msg: 'upload success'
    },
    data: {
      body: ctx.req.body,
      files: ctx.req.files
    }
  }
})

module.exports = router
