import cache from '@/common/utils/cache'
import $http from '@/common/request/index'
import { TOKEN } from '@/common/config/index.js'

const getCode = () => {
	let code = '';
	try {
		code = cache.get('code')
	} catch (e) {}
	return code
}
const login = (cb) => {
	let params = {}
	params = {
		mobile: 'MINI@' + getCode(),
		grant_type: 'mobile'
	}
	return $http
		.post(
			'auth/mobile/token/social', {}, {
				params: params,
				header: {
					isToken: 'false',
					TENANT_ID: 1,
					'Authorization': "Basic Z2RzOmdkcw==",
					'Accept-Language':'zh-CN',//不要删除，后端框架限制必传字段
				}
			}
		)
		.then(res => {
			cache.set(TOKEN, res['access_token'])
			cache.set('refresh_token', res['refresh_token'])
			cb(true)
		})
}

export default {
	/**
	 * 查看授权信息
	 */
	onGetSetting () {
		return new Promise ((resolve, reject) => {
			uni.getSetting({
				success(res) {
					console.log('res', res)
					if (res.authSetting['scope.userInfo']) {
						// 用户信息已授权，获取用户信息
						uni.getUserInfo({
							success (res) {
								resolve(res)
							},
							fail () {
								reject('获取用户信息失败')
							}
						})
					} else if (!res.authSetting['scope.userInfo']) {
						reject('需要点击按钮手动授权')
					}
				},
				fail () {
					reject('获取已授权选项失败')
				}
			})
		})
	},
	/**
	 * 手动授权方法
	 */
	onGetUserInfo () {
		// 获取用户信息
		return new Promise((resolve, reject) => {
			uni.getUserInfo({
				provider: 'weixin',
				// 获取信息成功
				success (res) {
					resolve(res)
				},
				fail () {
					reject('获取用户信息失败')
				}
			})
		})
	},
	// 微信登录
	// 微信登录
	onLogin () {
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log('微信登录login', loginRes)
					uni.setStorageSync('code', loginRes.code);
					// 获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: function (infoRes) {
							console.log('获取用户信息', infoRes)
							let url = '/admin/social/get_mini_user_exist'
							$http
								.post(
									url, {}, {
										params: {
											encryptedData: infoRes.encryptedData,
											iv: infoRes.iv,
											code: getCode()
										},
										header: {
											isToken: 'false',
											TENANT_ID: 1,
											Authorization: 'Basic Z2RzOmdkcw=='
										}
									}
								)
								.then((res) => {
									if (res.data === true) {
										login(resolve)
									} else {
										resolve(false)
									}
									
								})
						},
						fail: (e) => {
							console.log('获取用户信息失败', e)
						}
					})
				},
				fail: function(res) {
					console.log('失败', res)
				}
			})
		})
	},

	// 获取手机号
	onGetPhoneNumber (e) {
		return new Promise((resolve) => {
			resolve(e)
		})
	},
	
	// 获取手机号
	getPhoneNumber (userInfo) {
		return new Promise((resolve) => {
			$http
				.post(
					'admin/social/get_mini_mobile', {}, {
						params: {
							encryptedData: userInfo.detail.encryptedData,
							iv: userInfo.detail.iv,
							code: getCode()
						},
						header: {
							isToken: 'false',
							TENANT_ID: 1,
							Authorization: 'Basic Z2RzOmdkcw=='
						}
					}
				)
				.then(res => {
					if (res.code == 0) {
						login(resolve)
					} else {
						console.log('登录失败')
					}
				})
		})
	}
}