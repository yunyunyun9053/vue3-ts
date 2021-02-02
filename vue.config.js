const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
console.log('VUE_APP_TITLE: ', process.env.VUE_APP_TITLE, process.env.NODE_ENV)
module.exports = {
	lintOnSave: false,
	chainWebpack: (config) => {
    config.resolve.alias
			.set('@$', resolve('src'))
			.set('@ant-design/icons/lib/dist$',resolve("src/icons.js"))
		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule
			.use('vue-loader')
			.loader('vue-loader') // or `vue-loader-v16` if you are using a preview support of Vue 3 in Vue CLI
			.end()
			.use('vue-svg-loader')
			.loader('vue-svg-loader')

		config
		.plugin('html')
		.tap(args => {
			args[0].title = process.env.VUE_APP_TITLE
			return args
		})
	},
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'btn-primary-bg': '#e61536',
          // 'btn-primary-color': '#ffffff',
          // 'btn-danger-bg': '#333333',
          // 'btn-danger-color': '#FFFFFF',
          // 'btn-danger-border': '#333333',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '2px',
          // 'link-color': '#e61536',
          // 'link-hover-color': '#f23d52'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8081,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      "/api": {
        target: `http://172.31.3.206:8088/`,
        changeOrigin: true,
        pathRewrite: {
          "/api": "/"
        }
      }
    }
  }
};
