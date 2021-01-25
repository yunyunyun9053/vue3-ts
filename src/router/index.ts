import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
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
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
				meta: { title: 'About', icon: 'AppstoreOutlined' , permission: [1], hideChildrenInMenu: false },
				redirect: '/about/about1',
				children: [
					{
						path: 'about1',
						name: 'about1',
						component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
						meta: { title: '首页', hidden: false }
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
