const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const defaultSettings = require('./src/config/app.ts')

const title = 'Vue3'
const meta = {}

const isProd = process.env.NODE_ENV === 'production'
const isAnalyze = process.env.VUE_APP_ANALYZE === 'true'

const assetsCDN = {
  // webpack build externals
  externals: { // webpack打包时，将以下模块不打包到bundle中，减少包的大小
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.global.prod.js',
    '//cdn.jsdelivr.net/npm/vue-router@4.0.3/dist/vue-router.global.prod.js',
    '//cdn.jsdelivr.net/npm/vuex@4.0.0-rc.2/dist/vuex.global.prod.js',
    '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
  ]
}

module.exports = {
  // axios域代理，解决axios跨域问题
  // baseUrl: '/', // vue-cli.3.3 版本后已废除 使用publicPath代替 默认： '/'
  publicPath: '/',
  outputDir: 'dist', // 设置项目打包生成的文件的存储目录，可以是静态路径也可以是相对路径。相对路径是相对于项目文件当前的根路径。
  assetsDir: '', // 设置放置打包生成的静态资源 (js、css、img、fonts) 的目录 该目录是相对于 outputDir
  indexPath: 'index.html', // 用于设定打包生成的 index.html 文件的存储位置 该路径若是相对路径，则相对于 outputDir；当然，也可以是一个绝对路径 路径一定要以文件名+后缀结尾，最好以index,html结尾
  filenameHashing: true, // 置打包生成的的静态资源的文件名中是否加入hash以便控制浏览器缓存问题
  pages: undefined, // 多页面的vue项目搭建
  lintOnSave: true, // 设置是否在开发环境下每次保存代码时都启用 eslint验证
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  crossorigin: undefined, //
  configureWebpack: config => {
    if (isProd) {
      Object.assign(config, {
        externals: assetsCDN.externals
      })
    }
    if (isAnalyze) {
      config.plugins.push(
        new BundleAnalyzerPlugin()
      )
    }
    config.plugins.push(
      new AntdDayjsWebpackPlugin({
        preset: 'antdv3'
      })
    )
  },
  chainWebpack: config => {
    if (isProd) {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          common: {
            name: 'chunk-common',
            chunks: 'all',
            minSize: 0,
            minChunks: 2,
            maxInitialRequests: 5,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            minSize: 20000,
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          antDesignVue: {
            name: 'chunk-ant-design-vue',
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
            chunks: 'all',
            minSize: 20000,
            priority: 3,
            reuseExistingChunk: true
          },
          default: { // 默认打包模块
            priority: -20,
            minSize: 20000,
            reuseExistingChunk: true // 模块嵌套引入时，判断是否复用已经被打包的模块
          }
        }
      })
    }
    config
      .plugin('html')
      .tap(args => {
        args[0].title = title // 修改打包出来的index.html的title
        args[0].meta = meta
        if (isProd) {
          args[0].cdn = assetsCDN
        }
        return args
      })
  },
  devServer: { // 设置api访问代理
    open: false,
    port: 8080,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://100.0.01.101:8080/', // 代理服务器  devServer会自动对path的 /api 开头的api做代理转发
        changeOrigin: true, // 是否允许跨域
        ws: true, // 是否代理websocket
        pathRewrite: { // 重写 url 的 path 部分。
          '/api': '/'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'btn-primary-bg': '#e61536',
          'btn-primary-color': '#ffffff',
          'btn-danger-bg': '#333333',
          'btn-danger-color': '#FFFFFF',
          'btn-danger-border': '#333333',
          'link-color': '#1DA57A',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  }
}
