import { Module } from 'vuex'
import { State } from '@/store'
import { login, getUserInfo } from '@/api/user'
import { User } from '@/utils/user'

import { ACCESS_TOKEN } from '@/store/mutation-types'

export interface UserState {
  token: string;
  name: string;
  roles: number[];
}
const user: Module<UserState, State> = {
	state: {
		token: '',
		name: 'cora',
		roles: []
	},
	mutations: {
		SET_ROLES (state: UserState, roles: Array<number>) {
			state.roles = roles
		},
		SET_TOKEN (state: UserState, token: string) {
			state.token = token
		},
		SET_NAME (state: UserState, name: string) {
			state.name = name
		}
  },
  actions: {
    GetUserInfo (context: any) {
			return new Promise((resolve, reject) => {
				getUserInfo().then((res: any) => {
					const { roles, name, token } = res
					context.commit('SET_TOKEN', token)
					context.commit('SET_NAME', name)
					context.commit('SET_ROLES', roles)
					resolve(res)
				}).catch((error) => {
					reject(error)
				})
			})
		},
		Login (context: any, loginForm: User) {
			context.commit('SET_TOKEN', '')
			context.commit('SET_NAME', '')
			context.commit('SET_ROLES', [])
			return new Promise((resolve, reject) => {
				login(loginForm).then((res: any) => {
					console.log(res)
					const { token } = res
					context.commit('SET_TOKEN', token)
					localStorage.setItem(ACCESS_TOKEN, token)
					resolve()
				}).catch((error) => {
					reject(error)
				})
			})
		},
		Logout (context: any) {
			return new Promise((resolve) => {
				context.commit('SET_TOKEN', '')
				context.commit('SET_NAME', '')
				context.commit('SET_ROLES', [])
				localStorage.removeItem(ACCESS_TOKEN)
				resolve()
			})
		},
		changeName (context: any, name: string) {
			console.log('changeName ', name)
			context.commit('SET_NAME', name)
		}
  },
  getters: {
    userName (state: UserState) {
      return state.name
		},
		roles (state: UserState) {
			return state.roles
		},
		token (state: UserState) {
			return state.token
		}
  }
}
export default user
