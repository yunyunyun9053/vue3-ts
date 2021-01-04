import { Module } from 'vuex'
import { State } from '@/store'
import { RouteRecordRaw } from 'vue-router'
import { routes, asyncRoutes } from '@/router'

export interface PermissionState {
	routers: Array<RouteRecordRaw>;
	addRouters: Array<RouteRecordRaw>;
}

function hasPermission (roles: Array<number>, route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta?.permission.includes(role))
  } else {
    return true
  }
}

function filterAsyncRouter (routes: Array<RouteRecordRaw>, roles: Array<number>) {
  const res: Array<RouteRecordRaw> = []
  routes.forEach(route => {
    const tmp = { ...route }
    // console.log('storepermissiontmp=====', tmp)
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const permission: Module<PermissionState, State> = {
	state: {
		routers: routes,
		addRouters: []
	},
	mutations: {
		SET_ROUTERS (state: PermissionState, routers: Array<RouteRecordRaw>) {
			state.addRouters = routers
		}
  },
  actions: {
		GenerateRoutes (context: any, roles) {
      return new Promise(resolve => {
				console.log('GenerateRoutes: ', roles)
        const accessedRouters = filterAsyncRouter(asyncRoutes, roles)
        context.commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  },
  getters: {
		addRouters(state: PermissionState) {
			return state.addRouters
		}
  }
}
export default permission