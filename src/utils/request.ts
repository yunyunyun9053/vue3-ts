import axios from 'axios'
import store from '@/store'
// import notification from 'ant-design-vue/es/notification'
import { notification, message } from 'ant-design-vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { message } from 'ant-design-vue/es'

// const isProd = process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error: any) => {
  if (error.response) {
    const data = error.response.data
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  } else {
    message.error('系统连接超时')
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use((config: any) => {
  // console.log('config interceptors', config)
	if (config.url.indexOf('/api') === 0) {
		config.baseURL = ''
	}
  const token = localStorage.getItem(ACCESS_TOKEN)
  if (token) {
    config.headers.Authorization = token
    // config.headers['Authorization'] = 'Bearer ' + token
    // config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  console.log('response: ', response)
  const res = response.data
  const token = localStorage.getItem(ACCESS_TOKEN)
  if (res.code === '0000' || res.code === 'AMS0000') {
    return response.data
  } else if (res.code === '9995' || res.code === '9996') {
    message.error(res.message)
    if (token) {
      // store.dispatch('Logout').then(() => {
      //   setTimeout(() => {
      //     window.location.reload()
      //   }, 1500)
      // })
    }
    return Promise.reject(res)
  } else {
    message.error(res.message)
    return Promise.reject(res)
  }
}, err)
export {
  service as axios
}
