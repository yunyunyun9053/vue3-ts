
export function getUserInfo (params: any) {
	return new Promise((resolve, rejects) => {
		resolve({
			name: 'is cora',
			token: 'token',
			roles: [1, 2, 3]
		})
	})
}