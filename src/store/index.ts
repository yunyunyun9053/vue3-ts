import { createStore, Store, useStore as baseUseStore } from 'vuex'
import user from './modules/user'
import { InjectionKey } from 'vue'
import { UserState } from './modules/user'

export interface State {
  test: string
}
export interface AllState extends State {
  user: UserState
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
		user
  }
})

export function useStore<T = AllState> () {
	return baseUseStore<T>(key)
}