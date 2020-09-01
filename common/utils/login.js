import { encryption } from './utils.js'
import $http from '@/common/request/index'
export const signin = (userInfo) => {
	return new Promise((resolve, reject) => {
		const user = encryption({
			data: userInfo,
			key: 'gdscloudprisbest',
			param: ['password']
		})
		const grantType = 'password'
		$http.post(`/auth/oauth/token`, {}, {
			params: {
				username: user.username,
				password: user.password,
				code: user.code,
				grant_type: grantType,
				scope: 'server',
				randomStr: user.randomStr
			},
			header: {
				'isToken': 'false',
				'TENANT_ID': '1',
				'Authorization': 'Basic Z2RzOmdkcw=='
			}
		}).then(({ data }) => {
			resolve(data)
		}).catch(e => {
			reject(e)
		})
	})
}