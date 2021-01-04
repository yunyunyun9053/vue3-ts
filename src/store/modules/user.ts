import { Module } from 'vuex'
import { State } from '@/store'
import { login, getUserInfo } from '@/api/user'
import { User } from '@/utils/user'

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
				console.log('state: ', this.state.test)
				getUserInfo().then((res: any) => {
					const { roles, name, token } = res
					context.commit("SET_TOKEN", token)
					context.commit("SET_NAME", name)
					context.commit("SET_ROLES", roles)
					resolve()
				})
			})
		},
		Login (context: any, loginForm: User) {
			return new Promise((resolve, reject) => {
				login(loginForm).then((res: any) => {
					console.log(res)
					const { roles, name, token } = res
					context.commit("SET_TOKEN", token)
					context.commit("SET_NAME", name)
					context.commit("SET_ROLES", roles)
					resolve()
				})
			})
		},
		Logout (context: any, loginForm: User) {
			return new Promise((resolve, reject) => {
				context.commit("SET_TOKEN", '')
				context.commit("SET_NAME", '')
				context.commit("SET_ROLES", [])
				resolve()
			})
		}
  },
  getters: {
    userInfoGetter (state: UserState) {
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