import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store, { key } from './store'
import "@/peimission"

import { Button } from 'ant-design-vue'

createApp(App)
.use(store, key)
.use(router)
.use(Button)
.mount('#app')
