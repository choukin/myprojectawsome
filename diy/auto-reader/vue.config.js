const merge = require('webpack-merge')
const webpack = require('webpack')
const tsImportPluginFactory = require('ts-import-plugin')
const path = require('path')
const QiniuUploadPluginPro = require('qiniu-upload-plugin-pro')
function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log('process.env.', process.env)
// console.log('process.env.npm_config_mode', process.env.npm_config_mode)
module.exports = {
  parallel: false,
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    //生产环境启用哦sourceMap
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_HOST]: {
        target: process.env.VUE_APP_HOST_TARGET,
        ws: true,
        changeOrigin: true,
        headers: {
          refer: 'http://nbadh5.molin.work/',
          host: 'nbadapi.molin.work',
          origin: 'http://nbadh5.molin.work/'
        },
        pathRewrite: {
          ['^' + process.env.VUE_APP_HOST]: ''
          // 正确的接口路径里面去掉代理路径
        }
      }
    }
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
        modifyVars: {
          // // 直接覆盖变量
          // 'text-color': '#111',
          // 'border-color': '#eee',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "src/assets/style/var.less";`,
        },
      }
      },
      postcss: {
        plugins: [
          require('postcss-px2rem')({ remUnit: 100 }) // 换算的基数
        ]
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('~', resolve('src'))
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      introJs: ['intro.js', 'introJs']
    }])
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          appendTsxSuffixTo: [/\.vue$/],
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                 // 指定样式路径
                style: (name) => {
                return `${name}/style/less`
              },
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })

    config.when(process.env.VUE_APP_QINIU === 'upload', config =>
      config.plugin('qiniu-upload-plugin-pro').use(QiniuUploadPluginPro, [
        {
          excludeRegex: /.html$/, // 需要排除文件的正则
          publicPath: process.env.VUE_APP_CDNHOST, //'http://file.molin.work/', // 七牛云域名，自动替换 publicPath
          accessKey: 'y0hDmc8hH7WuKGmDBfecnULlWWkL2Y7D6mNDQ9ag', // 个人中心，秘钥管理，AK
          secretKey: 't3wm5cMCwgJLPRO3qZE-Px2pUpeTMA7yrYEQfEBv', // 个人中心，秘钥管理，SK
          bucket: 'readshare', // 存储空间名称
          zone: 'south-1', // 存储地区
          // 可选参数：
          cover: false, // 默认为 false，设置为 true 会覆盖掉已经保存在七牛云上的同名文件
          deleteBefore: true, // 是否在上传前删除指定前缀文件列表
          pathPrefix: `${process.env.VUE_APP_PATH}/upload/`, // 文件前缀，上传文件路径 test/upload/你的文件路径,
          mimeType: {
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.ttf': 'font/ttf',
            '.jpg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.bmp': 'image/bmp',
            '.txt': 'text/plain',
            '.doc': 'application/msword',
            '.xls': 'application/vnd.ms-excel',
            '.xml': 'text/xml',
            '.apk': 'application/vnd.android.package-archive',
            '.svg': 'image/svg+xml',
            '.map': 'application/x-navimap',
            '.ico': 'image/x-icon',
            '.woff': 'font/woff',
            '.eot': 'font/eot',
            '.webp': 'image/webp',
            '.icon': 'image/x-icon'
          } // 上面为内置的文件类型映射，如果你的文件类型不在此列，请自己添加，将会和默认的合并，如果在可以忽略此配置项
        }
      ])
    )
  }
  // configureWebpack: {
  //   plugins: [
  //     process.env.NODE_ENV === 'production'
  //       ? new QiniuUploadPluginPro({
  //           excludeRegex: /.html$/, // 需要排除文件的正则
  //           publicPath: 'http://file.molin.work', // 七牛云域名，自动替换 publicPath
  //           accessKey: 'y0hDmc8hH7WuKGmDBfecnULlWWkL2Y7D6mNDQ9ag', // 个人中心，秘钥管理，AK
  //           secretKey: 't3wm5cMCwgJLPRO3qZE-Px2pUpeTMA7yrYEQfEBv', // 个人中心，秘钥管理，SK
  //           bucket: 'readshare', // 存储空间名称
  //           zone: 'Zone_z2', // 存储地区
  //           // 可选参数：
  //           cover: false, // 默认为 false，设置为 true 会覆盖掉已经保存在七牛云上的同名文件
  //           deleteBefore: true, // 是否在上传前删除指定前缀文件列表
  //           pathPrefix: 'test/upload', // 文件前缀，上传文件路径 test/upload/你的文件路径,
  //           mimeType: {
  //             '.js': 'application/javascript',
  //             '.css': 'text/css',
  //             '.ttf': 'font/ttf',
  //             '.jpg': 'image/jpeg',
  //             '.png': 'image/png',
  //             '.gif': 'image/gif',
  //             '.bmp': 'image/bmp',
  //             '.txt': 'text/plain',
  //             '.doc': 'application/msword',
  //             '.xls': 'application/vnd.ms-excel',
  //             '.xml': 'text/xml',
  //             '.apk': 'application/vnd.android.package-archive',
  //             '.svg': 'image/svg+xml',
  //             '.map': 'application/x-navimap',
  //             '.ico': 'image/x-icon',
  //             '.woff': 'font/woff',
  //             '.eot': 'font/eot',
  //             '.webp': 'image/webp'
  //           } // 上面为内置的文件类型映射，如果你的文件类型不在此列，请自己添加，将会和默认的合并，如果在可以忽略此配置项
  //         })
  //       : null
  //   ]
  // }
}
