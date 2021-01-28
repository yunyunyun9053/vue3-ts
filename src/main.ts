import './registerServiceWorker'
import './components/global.less'

import router from './router'
import store, { key } from './store'
import "@/peimission"
import { app } from './app'
import "@/core/antd"

 app
.use(store, key)
.use(router)
.mount('#app')
