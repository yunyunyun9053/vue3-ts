import router, { routes, asyncRoutes } from './router'
import store from './store'

import { RouteRecordRaw } from 'vue-router'
import { ACCESS_TOKEN } from '@/store/mutation-types'

import NProgress from 'nprogress'
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

const whiteList = ["/login"]
const defaultRoutePath = '/home'

router.beforeEach(async (to, from, next: any) => {
	const token = localStorage.getItem(ACCESS_TOKEN)
  // Start progress bar
	NProgress.start()
	if (token) {
		if (to.path === '/login') {
			// next({ path: defaultRoutePath })
			next()
      NProgress.done()
    } else {
			console.log('to.path !== login : ', store.getters)
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetUserInfo')
          .then(res => {
            const roles = res && res.roles
            store.dispatch('GenerateRoutes', roles).then(() => {
              // 根据roles权限生成可访问的路由表
							// 动态添加可访问路由表
							store.getters.addRouters.forEach((route: RouteRecordRaw) => {
								router.addRoute(route)
							})
							// 请求带有 redirect 重定向时，登录自动重定向到该地址
							// const redirect = decodeURIComponent(from.query.redirect as string || to.path)
							// if (to.path === redirect) {
								// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
								// next({ ...to, replace: true })
							// } else {
								// 跳转到目的路由
								// next({ path: redirect })
							// }
            })
          })
          .catch((error) => {
            store.dispatch('Logout').then(() => {
              next({ path: '/login', query: { redirect: to.fullPath } })
            })
					})
				const redirect = decodeURIComponent(from.query.redirect as string || to.path)
				if (to.path === redirect) {
					// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
					next({ ...to, replace: true })
					// to['replace'] = true
				} else {
					// 跳转到目的路由
					next({ path: redirect })
				}
				// next({ ...to })
      } else {
        next()
      }
    }
	}	else {
		if (whiteList.includes(to.path)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
	}
	NProgress.done()
})

router.afterEach((to) => {
  // Finish progress bar
  NProgress.done();

	// set page title
	console.log('process.env.VUE_TITLE: ', process.env.VUE_APP_TITLE)
  document.title = `${process.env.VUE_APP_TITLE} ${to.meta.title}`
});