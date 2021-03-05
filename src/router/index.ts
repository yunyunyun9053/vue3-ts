import { createRouter, createWebHistory, RouteRecordRaw, useRouter } from 'vue-router'
// import BasicLayout from '@/layouts/BasicLayout.vue'
import { BasicLayout, PageView } from '../layouts'
import { markRaw } from 'vue'

console.log('Router:　', useRouter)

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
		// component: () => import(/* webpackChunkName: 'BasicLayout' */ '@/layouts/BasicLayout.vue'),
		redirect: '/home',
		meta: { title: '首页' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/Home.vue'),
        meta: { title: '首页', icon: 'PieChartOutlined' }
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
				// component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
				component: markRaw(PageView),
				meta: { title: 'About', icon: 'AppstoreOutlined', permission: [1], hideChildrenInMenu: false },
				redirect: '/about/about1',
				children: [
					{
						path: 'about1',
						name: 'about1',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页', hidden: false }
					}
				]
      },
      {
        path: 'table',
        name: 'Table',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
				// component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
				component: markRaw(PageView),
				meta: { title: 'Table', icon: 'AppstoreOutlined', permission: [1], hideChildrenInMenu: false },
				redirect: '/table/test',
				children: [
					{
						path: 'test',
						name: 'test',
						component: () => import(/* webpackChunkName: 'test' */ '@/views/table/test.vue'),
						meta: { title: 'test', hidden: false }
					}
				]
      },
      {
        path: 'about2',
        name: 'About2',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
				// component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
				component: markRaw(PageView),
				meta: { title: 'About2', icon: 'AppstoreOutlined', permission: [1], hideChildrenInMenu: false },
				redirect: '/about2/about21',
				children: [
					{
						path: 'about21',
						name: 'about21',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					},
					{
						path: 'about22',
						name: 'about22',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					},
					{
						path: 'about23',
						name: 'about23',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					},
					{
						path: 'about24',
						name: 'about24',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					},
					{
						path: 'about25',
						name: 'about25',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					},
					{
						path: 'about26',
						name: 'about26',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					},
					{
						path: 'about27',
						name: 'about27',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					},
					{
						path: 'about28',
						name: 'about28',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					},
					{
						path: 'about29',
						name: 'about29',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					},
					{
						path: 'about210',
						name: 'about210',
						component: () => import(/* webpackChunkName: 'about' */ '@/views/About.vue'),
						meta: { title: '首页2', hidden: false }
					}
				]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

export function resetRouter() {
  const nameArr = ['Login']
  router.getRoutes().forEach((ele: any) => {
    if (!nameArr.includes(String(ele.name))) {
      router.removeRoute(ele.name)
    }
  })
}

export default router
