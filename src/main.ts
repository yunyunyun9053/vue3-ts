import { app } from './app'

import router from './router'
import store, { key } from './store'

import globalI18n from './utils/i18n'
import '@/peimission'
import '@/core/antd/index'

import './styles/global.less'

 app
.use(store, key)
.use(router)
.use(globalI18n)

app.mount('#app')
