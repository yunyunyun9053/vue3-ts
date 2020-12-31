import router from './router'

import { RouteRecordRaw } from 'vue-router'

import NProgress from 'nprogress'
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

const whiteList = ["/login"];

router.beforeEach(async (to, from, next: any) => {
  // Start progress bar
	NProgress.start()
	console.log('to: ', to)
	next()
	NProgress.done()
})

router.afterEach((to) => {
  // Finish progress bar
  NProgress.done();

  // set page title
  document.title = to.meta.title;
});