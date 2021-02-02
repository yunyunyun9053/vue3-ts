import { axios } from '@/utils/request'

import { User } from '@/utils/user'

/**
 * login func
 * parameter: User
 * @param parameter
 * @returns {*}
 */
export function loginR (parameter: User) {
  return axios({
    url: '/ams/ssoLogin',
    method: 'post',
    data: parameter
  })
}


export function getUserInfo () {
	return new Promise((resolve, reject) => {
		resolve({
			name: 'userInfo cora',
			token: 'token',
			roles: [1, 2, 3]
		})
	})
}
export function login (params: User) {
	return new Promise((resolve, reject) => {
		if (params.name && params.password) {
			resolve({
				name: 'is cora',
				token: 'token',
				roles: [1, 2, 3]
			})
		} else {
			reject()
		}
	})
}