import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { UserState } from './modules/user'
import { PermissionState } from './modules/permission'
import { AppState } from './modules/app'

import user from './modules/user'
import permission from './modules/permission'
import app from './modules/app'

export interface State {
  test: string
}
export interface AllState extends State {
	user: UserState
	permission: PermissionState,
	app: AppState
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
		test: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
		user,
		permission,
		app
	},
	getters: {
	}
})

export function useStore<T = AllState> () {
	return baseUseStore<T>(key)
}