import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import BasicLayout from '@/layouts/BasicLayout.vue'
import { BasicLayout, PageView } from '../layouts'
import { markRaw } from "vue"

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login.vue'),
    meta: { title: '登录' }
  }
]
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
		component: markRaw(BasicLayout),
		// component: () => import(/* webpackChunkName: "BasicLayout" */ '@/layouts/BasicLayout.vue'),
		redirect: '/home',
		meta: { title: '首页' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: { title: '首页', icon: 'PieChartOutlined' }
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
				// component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
				component: markRaw(PageView),
				meta: { title: 'About', icon: 'AppstoreOutlined' , permission: [1], hideChildrenInMenu: false },
				redirect: '/about/about1',
				children: [
					{
						path: 'about1',
						name: 'about1',
						component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
						meta: { title: '首页', hidden: false }
					},
				]
      },
      {
        path: 'about2',
        name: 'About2',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
				// component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
				component: markRaw(PageView),
				meta: { title: 'About2', icon: 'AppstoreOutlined' , permission: [1], hideChildrenInMenu: false },
				redirect: '/about2/about21',
				children: [
					{
						path: 'about21',
						name: 'about21',
						component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					},
				]
      }
    ]
  }
]






const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

export default router
