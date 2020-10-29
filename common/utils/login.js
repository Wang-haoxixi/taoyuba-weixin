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
		}).catch(data => {
			uni.showToast({
				icon: 'none',
				title: data.data.msg || '登录失败'
			})
			reject(data)
		})
	})
}
// 验证手机号
export const validatePhone = (phone) => {
	return new Promise((resolve, reject) => {
		$http.get(`/admin/user/repeatPhone/${phone}`).then(({ data }) => {
			if (data.code === 0 && data.data === true) {
				resolve(data.msg)
			} else {
				reject(data.msg)
			}
		})
	})
}
// 获取手机验证码
export const getMobileCode = (phone) => {
	return new Promise((resolve, reject) => {
		$http.get(`/admin/mobile/${phone}`).then(({ data }) => {
			resolve(data)
		}).catch((e) => {
			// uni.showToast({
			// 	icon: 'none',
			// 	title: data.msg || '注册失败'
			// })
			reject(e)
		})
	})
}

// 注册
export const onRegister = (form) => {
	return new Promise((resolve, reject) => {
		$http.post('/admin/user/register', form).then(({ data }) => {
			resolve(data)
		}).catch((e) => {
			// uni.showToast({
			// 	icon: 'none',
			// 	title: data.msg || '注册失败'
			// })
			reject(e)
		})
	})
}
// 获取忘记密码验证码
export const getForgetCode = (phone) => {
	return new Promise((resolve, reject) => {
		$http.get(`/admin/mobile/edit/${phone}`).then(({ data }) => {
			resolve(data)
		}).catch(e => {
			reject(e)
		})
	})
}

// 提交修改密码
export const forgetForm = (form) => {
	return new Promise((resolve, reject) => {
		$http.post('/admin/user/forgetPassword', {}, {
			params: form
		}).then(({ data }) => {
			resolve(data)
		}).catch(e => {
			reject(e)
		})
	})
}

// 退出
export const logout = () => {
	return new Promise((resolve, reject) => {
		$http.delete('/auth/token/logout').then(({ data }) => {
			resolve(data)
		}).catch((e) => {
			reject(e)
		})
	})
}
