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
