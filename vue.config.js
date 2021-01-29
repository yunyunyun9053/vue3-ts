const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
	lintOnSave: false,
	chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
	},
	
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          'btn-primary-bg': '#e61536',
          'btn-primary-color': '#ffffff',
          'btn-danger-bg': '#333333',
          'btn-danger-color': '#FFFFFF',
          'btn-danger-border': '#333333',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px',
          'link-color': '#e61536',
          'link-hover-color': '#f23d52'
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
        target: `http://172.31.3.206:8087`,
        changeOrigin: true,
        pathRewrite: {
          "/api": "/"
        }
      }
    }
  }
};
