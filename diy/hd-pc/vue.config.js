'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const QiniuUploadPluginPro = require('qiniu-upload-plugin-pro')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '春雨互动' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

console.log(process.env.VUE_APP_HOST_TARGET, 'process.env.VUE_APP_HOST_TARGET')
console.log(process.env.VUE_APP_publicPath, process.env.NODE_ENV)
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
      // // 当使用 title 选项时，
      // // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // // 在这个页面中包含的块，默认情况下会包含
      // // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    mobile: {
      entry: 'src/mobile/main.js',
      template: 'public/mobile.html',
      filename: 'mobile.html'
    }
  },
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // TODO:
  publicPath: process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_publicPath,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js')
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_HOST_TARGET,
        ws: true,
        changeOrigin: true,
        headers: {

        },
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
          // 正确的接口路径里面去掉代理路径
        }
      }
    }
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // '@dialog-width': '640px',
            // // // 直接覆盖变量
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "./src/assets/style/var.less";`
          }
        }
      },
      // less: {
      //   lessOptions: {
      //     modifyVars: {
      //     // // 直接覆盖变量
      //       'dialog-width': '640px'
      //     // 'text-color': '#111',
      //     // 'border-color': '#eee',
      //     // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      //       // hack: `true; @import "src/mobile/assets/style/var.less";`
      //     }
      //   }
      // },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 100,
            propList: ['*'],
            exclude: function(file) {
              if (file.indexOf('node_modules/vant') === -1 && file.indexOf('src/mobile') === -1) {
                // console.log('======')
                // console.log(file)
                return true
              } else {
                return false
              }
            }
          }) // 换算的基数
        ]
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // config.plugin('preload').tap(() => [
    //   {
    //     rel: 'preload',
    //     // to ignore runtime.js
    //     // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: 'initial'
    //   }
    // ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.VUE_APP_QINIU === 'upload', config =>
      config.plugin('qiniu-upload-plugin-pro').use(QiniuUploadPluginPro, [
        {
          excludeRegex: /.html$/, // 需要排除文件的正则
          publicPath: process.env.VUE_APP_CDNHOST, // 'http://file.molin.work/', // 七牛云域名，自动替换 publicPath
          accessKey: 'ngszNQhJQtjLm4g7l3o0vxDeG2yURoZKYR9TXHu7', // 个人中心，秘钥管理，AK
          secretKey: '9unXcWprpCoqpZLe8DM8q3jKJakW2xkssMDjOOd-', // 个人中心，秘钥管理，SK
          bucket: 'static-hudong', // 存储空间名称
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
    // config
    //   .when(process.env.NODE_ENV !== 'development',
    //     config => {
    //       config
    //         .plugin('ScriptExtHtmlWebpackPlugin')
    //         .after('html')
    //         .use('script-ext-html-webpack-plugin', [{
    //         // `runtime` must same as runtimeChunk name. default is `runtime`
    //           inline: /runtime\..*\.js$/
    //         }])
    //         .end()
    //       config
    //         .optimization.splitChunks({
    //           chunks: 'all',
    //           cacheGroups: {
    //             libs: {
    //               name: 'chunk-libs',
    //               test: /[\\/]node_modules[\\/]/,
    //               priority: 10,
    //               chunks: 'initial' // only package third parties that are initially dependent
    //             },
    //             elementUI: {
    //               name: 'chunk-elementUI', // split elementUI into a single package
    //               priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
    //               test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
    //             },
    //             commons: {
    //               name: 'chunk-commons',
    //               test: resolve('src/components'), // can customize your rules
    //               minChunks: 3, //  minimum common number
    //               priority: 5,
    //               reuseExistingChunk: true
    //             }
    //           }
    //         })
    //       // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
    //       config.optimization.runtimeChunk('single')
    //     }
    //   )
  }
}
