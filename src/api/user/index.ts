
export function getUserInfo () {
	return new Promise((resolve, reject) => {
		resolve({
			name: 'userInfo cora',
			token: 'token',
			roles: [1, 2, 3]
		})
	})
}
export function login (params: any) {
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