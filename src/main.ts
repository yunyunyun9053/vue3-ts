import './registerServiceWorker'
import './styles/global.less'

import router from './router'
import store, { key } from './store'
import "@/peimission"
import { app } from './app'
import "@/core/antd/index"

 app
.use(store, key)
.use(router)
.mount('#app')
