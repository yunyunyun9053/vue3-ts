import { Module } from 'vuex'
import { State } from '@/store'
import { getUserInfo } from '@/api/user'
import { any } from 'vue-types';

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
    getUserInfo (state: UserState, name: string) {
      state.name = name
		},
		SET_ROLES (state: UserState, roles: Array<number>) {
			state.roles = roles
		}
  },
  actions: {
    asyncGetUserInfo (context: any) {
      setTimeout(() => {
        context.commit("getUserInfo", + new Date() + 'action')
			},2000)
			getUserInfo({ token: '' }).then((res) => {
				// const { roles } = res
				// context.commit("SET_ROLES", roles)
			})
		}
  },
  getters: {
    userInfoGetter (state: UserState) {
      return state.name
    }
  }
}
export default user