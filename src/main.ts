import { app } from './app'

import router from './router'
import store, { key } from './store'
import "@/peimission"
import "@/core/antd/index"

import './styles/global.less'

 app
.use(store, key)
.use(router)
.mount('#app')
